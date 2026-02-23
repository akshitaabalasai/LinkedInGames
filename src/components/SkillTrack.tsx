import { Progress } from './ui/progress';
import { ChevronRight } from 'lucide-react';

interface SkillTrackProps {
  name: string;
  progress: number;
  gamesCompleted: number;
  totalGames: number;
  nextChallenge: string;
}

export function SkillTrack({ 
  name, 
  progress, 
  gamesCompleted, 
  totalGames, 
  nextChallenge 
}: SkillTrackProps) {
  return (
    <div className="p-4 rounded-lg border border-gray-200 hover:border-[#0a66c2] transition-colors">
      <div className="flex items-center justify-between mb-2">
        <h4>{name}</h4>
        <span className="text-sm text-gray-600">
          {gamesCompleted}/{totalGames} challenges
        </span>
      </div>
      <Progress value={progress} className="h-2 mb-2" />
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Next: {nextChallenge}</span>
        <ChevronRight className="h-4 w-4 text-[#0a66c2]" />
      </div>
    </div>
  );
}
