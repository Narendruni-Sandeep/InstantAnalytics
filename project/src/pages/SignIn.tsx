import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { supabase } from '../lib/supabase';

export function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const message = params.get('message');
    if (message) {
      setMessage(message);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to your account to continue"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}
        
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />

        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-primary hover:text-primary/90 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" isLoading={isLoading}>
          Sign In
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-primary hover:text-primary/90 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}