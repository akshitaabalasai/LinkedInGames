import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  Brain, 
  Zap, 
  Target, 
  Award,
  Users,
  Trophy
} from 'lucide-react';
import { CognitiveBadge } from './CognitiveBadge';
import { SkillTrack } from './SkillTrack';
import { TeamModeCard } from './TeamModeCard';

interface CognitiveInsightDashboardProps {
  userStats?: {
    badgesEarned: number;
    dayStreak: number;
    networkRank: string;
  } | null;
}

export function CognitiveInsightDashboard({ userStats }: CognitiveInsightDashboardProps) {
  const badges = [
    {
      icon: Brain,
      title: 'Pattern Recognition',
      level: 'Advanced',
      description: 'Excels at identifying trends and connections',
      color: 'from-purple-500 to-purple-700',
      earned: '3 weeks ago'
    },
    {
      icon: Zap,
      title: 'Verbal Agility',
      level: 'Expert',
      description: 'Strong language processing and quick thinking',
      color: 'from-blue-500 to-blue-700',
      earned: '1 week ago'
    },
    {
      icon: Target,
      title: 'Strategic Planning',
      level: 'Intermediate',
      description: 'Demonstrates long-term thinking',
      color: 'from-green-500 to-green-700',
      earned: '2 days ago'
    }
  ];

  const skillTracks = [
    {
      name: 'Analytical Thinking',
      progress: 75,
      gamesCompleted: 15,
      totalGames: 20,
      nextChallenge: 'Queens puzzle - Hard mode'
    },
    {
      name: 'Problem Solving',
      progress: 60,
      gamesCompleted: 12,
      totalGames: 20,
      nextChallenge: 'Crossword streak challenge'
    }
  ];

  // Use userStats if available, otherwise use defaults
  const displayStats = userStats || {
    badgesEarned: 12,
    dayStreak: 47,
    networkRank: 'Top 15%'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#0a66c2] to-[#004182] flex items-center justify-center">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl flex items-center gap-2">
              Cognitive Insight Dashboard
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                New
              </Badge>
            </h2>
            <p className="text-sm text-gray-600">
              Showcasing professional strengths through gameplay behavior
            </p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-100">
        <div className="text-center">
          <div className="text-2xl text-[#0a66c2] mb-1">
            <span>{displayStats.badgesEarned}</span>
          </div>
          <p className="text-xs text-gray-600">Badges Earned</p>
        </div>
        <div className="text-center">
          <div className="text-2xl text-[#0a66c2] mb-1">
            <span>{displayStats.dayStreak}</span>
          </div>
          <p className="text-xs text-gray-600">Day Streak</p>
        </div>
        <div className="text-center">
          <div className="text-2xl text-[#0a66c2] mb-1">
            <span>{displayStats.networkRank}</span>
          </div>
          <p className="text-xs text-gray-600">In Network</p>
        </div>
      </div>

      {/* Cognitive Strength Badges */}
      <div className="mb-6">
        <h3 className="text-lg mb-3">
          Cognitive Strength Badges
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {badges.map((badge, index) => (
            <CognitiveBadge key={index} {...badge} />
          ))}
        </div>
      </div>

      {/* Skill Tracks */}
      <div className="mb-4">
        <h3 className="text-lg mb-3">
          Skill Tracks
        </h3>
        <div className="space-y-3">
          {skillTracks.map((track, index) => (
            <SkillTrack key={index} {...track} />
          ))}
        </div>
      </div>

      {/* Team Mode */}
      <TeamModeCard />

      {/* Footer CTA */}
      <div className="mt-4 pt-4 border-t">
        <p className="text-sm text-gray-600 text-center">
          Cognitive insights help showcase soft skills to recruiters
        </p>
      </div>
    </div>
  );
}