import { Users, Trophy } from 'lucide-react';

export function TeamModeCard() {
  return (
    <div className="p-4 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-amber-200 flex items-center justify-center">
            <Users className="h-5 w-5 text-amber-700" />
          </div>
          <div>
            <h3>Team Mode</h3>
            <p className="text-sm text-gray-700">
              Ranked #3 in Product Managers Network
            </p>
          </div>
        </div>
        <Trophy className="h-5 w-5 text-amber-600" />
      </div>
    </div>
  );
}
