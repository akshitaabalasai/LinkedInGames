import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { MapPin, Briefcase } from 'lucide-react';
import profileImage from 'figma:asset/eed7b74c393da82c682a2df91fcfc2a21db2a707.png';

interface ProfileHeaderProps {
  userName?: string;
}

export function ProfileHeader({ userName }: ProfileHeaderProps) {
  const displayName = userName || 'Aisha Rahman';
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Cover Photo */}
      <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-800" />
      
      {/* Profile Info */}
      <div className="px-6 pb-4">
        <div className="flex justify-between items-start -mt-16 mb-4">
          <Avatar className="h-32 w-32 border-4 border-white">
            <AvatarImage src={profileImage} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="mt-20 flex gap-2">
            <Button variant="outline" className="rounded-full">
              Add profile section
            </Button>
            <Button variant="default" className="rounded-full bg-[#0a66c2] hover:bg-[#004182]">
              Open to
            </Button>
          </div>
        </div>
        
        <div className="space-y-1">
          <h1 className="text-2xl">{displayName}</h1>
          <p className="text-gray-700">Product Manager | Actively Seeking Opportunities | Problem Solver</p>
          <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              San Francisco, CA
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              Open to work
            </div>
          </div>
          <p className="text-sm text-[#0a66c2] mt-2">500+ connections</p>
        </div>
      </div>
    </div>
  );
}