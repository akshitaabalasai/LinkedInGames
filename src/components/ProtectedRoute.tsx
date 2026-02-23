import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router';
import { createClient } from '../utils/supabase/client';
import { Loader2 } from 'lucide-react';

export function ProtectedRoute() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.access_token) {
        localStorage.setItem('access_token', session.access_token);
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f2ef] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0a66c2]" />
      </div>
    );
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
