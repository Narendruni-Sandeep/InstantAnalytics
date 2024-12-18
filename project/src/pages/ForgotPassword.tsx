import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { supabase } from '../lib/supabase';

export function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset your password"
      description="Enter your email to receive a password reset link"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            Check your email for a password reset link
          </div>
        )}

        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button type="submit" isLoading={isLoading}>
          Send Reset Link
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Remember your password?{' '}
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