import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          }
        }
      });

      if (authError) throw authError;

      if (authData?.user) {
        // Create user record
        const { error: insertError } = await supabase
          .from('instantly_user')
          .insert({
            id: authData.user.id,
            email: formData.email,
            first_name: formData.firstName,
            last_name: formData.lastName,
            verified: false,
            "Plan": 'free',
            credit: 0,
            total_client: 0
          });

        if (insertError) throw insertError;

        setSuccess(true);
        
        // Wait for 3 seconds before redirecting
        setTimeout(() => {
          navigate('/signin', { 
            state: { message: 'Please check your email to verify your account before signing in.' }
          });
        }, 3000);
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      description="Get started with InstantAnalytics"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="error-message"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="success-message"
            >
              Account created successfully! Please check your email to verify your account.
              Redirecting you to sign in...
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />

          <Input
            label="Last Name"
            type="text"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
        </div>

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
        />

        <Button type="submit" isLoading={isLoading}>
          Create Account
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            to="/signin"
            className="text-primary hover:text-primary/90 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}