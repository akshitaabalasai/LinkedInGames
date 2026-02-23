import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ProfileHeader } from './ProfileHeader';
import { CognitiveInsightDashboard } from './CognitiveInsightDashboard';
import { AboutSection } from './AboutSection';
import { ExperienceSection } from './ExperienceSection';
import { Button } from './ui/button';
import { LogOut, Loader2 } from 'lucide-react';
import { createClient } from '../utils/supabase/client';
import { projectId } from '../utils/supabase/info';

export function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userStats, setUserStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user?.user_metadata?.name) {
        setUserName(user.user_metadata.name);
      }

      // Fetch user stats from server
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-01bd36f5/profile`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserStats(data.stats);
        } else {
          console.error('Failed to fetch user stats:', await response.text());
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      localStorage.removeItem('access_token');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f2ef] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0a66c2]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f2ef]">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg">LinkedIn Cognitive Insight Dashboard</h1>
          <div className="flex items-center gap-4">
            {userName && (
              <span className="text-sm text-gray-600">Welcome, {userName}</span>
            )}
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-6 px-4">
        {/* LinkedIn Profile Layout */}
        <div className="space-y-2">
          {/* Profile Header Card */}
          <ProfileHeader userName={userName} />
          
          {/* Cognitive Insight Dashboard - NEW FEATURE */}
          <CognitiveInsightDashboard userStats={userStats} />
          
          {/* Traditional LinkedIn Sections */}
          <AboutSection />
          <ExperienceSection />
        </div>
      </div>
    </div>
  );
}