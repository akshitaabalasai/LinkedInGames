import { LucideIcon } from 'lucide-react';
import { Badge } from './ui/badge';

interface CognitiveBadgeProps {
  icon: LucideIcon;
  title: string;
  level: string;
  description: string;
  color: string;
  earned: string;
}

export function CognitiveBadge({ 
  icon: Icon, 
  title, 
  level, 
  description, 
  color, 
  earned 
}: CognitiveBadgeProps) {
  return (
    <div className="group relative p-3 rounded-lg border border-gray-200 hover:border-[#0a66c2] transition-all cursor-pointer">
      <div className="flex flex-col items-center text-center gap-2">
        <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <h4 className="text-sm mb-1">{title}</h4>
          <Badge variant="secondary" className="text-xs">
            {level}
          </Badge>
        </div>
      </div>
    </div>
  );
}
