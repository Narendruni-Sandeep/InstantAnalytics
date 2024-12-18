import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { validateInstantlyApiKey } from '../../lib/instantly';

export function Profile() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    instantly_user: '',
    instantly_password: '',
    instantly_api_key: '',
    first_name: '',
    last_name: '',
    email: '',
  });

  useEffect(() => {
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('instantly_user')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      setFormData({
        instantly_user: data.instantly_user || '',
        instantly_password: data.instantly_password || '',
        instantly_api_key: data.instantly_api_key || '',
        first_name: user.user_metadata.first_name || '',
        last_name: user.user_metadata.last_name || '',
        email: user.email || '',
      });
    } catch (err) {
      console.error('Error loading user data:', err);
      setError('Failed to load user data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      if (formData.instantly_api_key) {
        const isValid = await validateInstantlyApiKey(formData.instantly_api_key);
        if (!isValid) {
          throw new Error('Invalid API key');
        }
      }

      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          first_name: formData.first_name,
          last_name: formData.last_name,
        }
      });

      if (updateError) throw updateError;

      const { error: dbError } = await supabase
        .from('instantly_user')
        .update({
          instantly_user: formData.instantly_user,
          instantly_password: formData.instantly_password,
          instantly_api_key: formData.instantly_api_key,
        })
        .eq('id', user?.id);

      if (dbError) throw dbError;

      setSuccess('Profile updated successfully');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">
          Profile Settings
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {success && (
            <div className="success-message">
              {success}
            </div>
          )}

          <div className="p-6 rounded-xl bg-card border border-border backdrop-blur-xl space-y-6">
            <h2 className="text-xl font-display font-semibold text-foreground">
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              />
              <Input
                label="Last Name"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              />
            </div>

            <Input
              label="Email"
              type="email"
              value={formData.email}
              disabled
            />
          </div>

          <div className="p-6 rounded-xl bg-card border border-border backdrop-blur-xl space-y-6">
            <h2 className="text-xl font-display font-semibold text-foreground">
              Instantly Settings
            </h2>

            <Input
              label="Instantly Username"
              value={formData.instantly_user}
              onChange={(e) => setFormData({ ...formData, instantly_user: e.target.value })}
            />

            <Input
              label="Instantly Password"
              type="password"
              value={formData.instantly_password}
              onChange={(e) => setFormData({ ...formData, instantly_password: e.target.value })}
            />

            <Input
              label="API Key"
              value={formData.instantly_api_key}
              onChange={(e) => setFormData({ ...formData, instantly_api_key: e.target.value })}
            />
          </div>

          <Button type="submit" isLoading={isSaving}>
            Save Changes
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}