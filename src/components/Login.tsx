import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Brain, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { createClient } from '../utils/supabase/client';

export function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    // Check if user is already logged in
    checkSession();
    
    // Show success message if coming from signup
    if (searchParams.get('signup') === 'success') {
      setSuccessMessage('Account created successfully! Please log in.');
    }
  }, [searchParams]);

  const checkSession = async () => {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      navigate('/dashboard');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (signInError) {
        throw signInError;
      }

      if (data?.session?.access_token) {
        // Store access token in localStorage for convenience
        localStorage.setItem('access_token', data.session.access_token);
        navigate('/dashboard');
      } else {
        throw new Error('Failed to get session');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-[#0a66c2] to-[#004182] flex items-center justify-center">
            <Brain className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl mb-2">Welcome Back</h1>
          <p className="text-sm text-gray-600">
            Sign in to view your cognitive insights
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {successMessage && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-800">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-800">
              {error}
            </div>
          )}

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-[#0a66c2] hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}
