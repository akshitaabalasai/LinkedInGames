import { Briefcase } from 'lucide-react';

export function ExperienceSection() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl mb-4">Experience</h2>
      <div className="space-y-6">
        <div className="flex gap-3">
          <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
            <Briefcase className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <h3>Senior Product Manager</h3>
            <p className="text-gray-700">TechCorp Inc.</p>
            <p className="text-sm text-gray-600">Jan 2022 - Present · 2 yrs 10 mos</p>
            <p className="text-sm text-gray-600 mt-2">San Francisco, CA</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
            <Briefcase className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <h3>Product Manager</h3>
            <p className="text-gray-700">StartupXYZ</p>
            <p className="text-sm text-gray-600">Mar 2020 - Dec 2021 · 1 yr 10 mos</p>
            <p className="text-sm text-gray-600 mt-2">Remote</p>
          </div>
        </div>
      </div>
    </div>
  );
}
