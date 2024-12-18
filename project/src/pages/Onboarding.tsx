import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingLayout } from '../components/OnboardingLayout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { validateInstantlyCredentials, getInstantlyOrganizations, getOrganizationToken, validateInstantlyApiKey } from '../lib/instantly';
import { createDefaultClient } from '../lib/onboarding';
import { supabase } from '../lib/supabase';

interface Organization {
  id: string;
  name: string;
}

export function Onboarding() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrg, setSelectedOrg] = useState('');
  const [sessionToken, setSessionToken] = useState('');
  const [orgToken, setOrgToken] = useState('');
  const [formData, setFormData] = useState({
    instantly_user: '',
    instantly_password: '',
    instantly_api_key: ''
  });

  const handleCredentialsSubmit = async () => {
    if (!formData.instantly_user || !formData.instantly_password) {
      setError('Please enter your credentials');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Validate credentials
      const { valid, token } = await validateInstantlyCredentials({
        username: formData.instantly_user,
        password: formData.instantly_password
      });

      if (!valid || !token) {
        throw new Error('Invalid credentials');
      }

      // Store session token
      setSessionToken(token);

      // Get organizations
      const orgs = await getInstantlyOrganizations(token);
      setOrganizations(orgs);

      // Move to next step
      setCurrentStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrgSelect = async () => {
    if (!selectedOrg) {
      setError('Please select an organization');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Get organization token
      const token = await getOrganizationToken(sessionToken, selectedOrg);
      setOrgToken(token);

      // Move to next step
      setCurrentStep(3);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeySubmit = async () => {
    if (!formData.instantly_api_key) {
      setError('Please enter your API key');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const isValid = await validateInstantlyApiKey(formData.instantly_api_key);
      
      if (!isValid) {
        throw new Error('Invalid API key');
      }

      if (!user?.id) throw new Error('User not found');

      // Update user data in Supabase
      const { error: updateError } = await supabase
        .from('instantly_user')
        .update({
          instantly_user: formData.instantly_user,
          instantly_password: formData.instantly_password,
          instantly_token: sessionToken,
          org_id: selectedOrg,
          org_token: orgToken,
          instantly_api_key: formData.instantly_api_key,
          verified: true
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Create default client using user's first name
      const firstName = user.user_metadata?.first_name || 'Default';
      await createDefaultClient(user.id, firstName);

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OnboardingLayout currentStep={currentStep} totalSteps={3}>
      {currentStep === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Connect your Instantly account
            </h2>
            <p className="text-muted-foreground">
              Enter your Instantly credentials to get started
            </p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <Input
            label="Instantly Username"
            value={formData.instantly_user}
            onChange={(e) => setFormData({ ...formData, instantly_user: e.target.value })}
            required
          />

          <Input
            label="Instantly Password"
            type="password"
            value={formData.instantly_password}
            onChange={(e) => setFormData({ ...formData, instantly_password: e.target.value })}
            required
          />

          <Button onClick={handleCredentialsSubmit} isLoading={isLoading}>
            Continue
          </Button>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Select your organization
            </h2>
            <p className="text-muted-foreground">
              Choose the organization you want to connect
            </p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {organizations.map((org) => (
              <button
                key={org.id}
                onClick={() => setSelectedOrg(org.id)}
                className={`w-full p-4 rounded-lg border text-left transition-colors ${
                  selectedOrg === org.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <h3 className="font-medium text-foreground">{org.name}</h3>
              </button>
            ))}
          </div>

          <Button onClick={handleOrgSelect} isLoading={isLoading}>
            Continue
          </Button>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Enter your API key
            </h2>
            <p className="text-muted-foreground">
              Provide your Instantly API key to complete the setup
            </p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <Input
            label="API Key"
            value={formData.instantly_api_key}
            onChange={(e) => setFormData({ ...formData, instantly_api_key: e.target.value })}
            required
          />

          <Button onClick={handleApiKeySubmit} isLoading={isLoading}>
            Complete Setup
          </Button>
        </div>
      )}
    </OnboardingLayout>
  );
}