import { ReactNode } from 'react';

interface TVScreenProps {
  children: ReactNode;
  className?: string;
}

const TVScreen = ({ children, className = '' }: TVScreenProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* Outer TV Frame (Yellow/Golden) */}
      <div className="bg-retro-yellow rounded-3xl border-4 border-gray-900 p-8 shadow-2xl">
        {/* Middle Frame (Brown/Dark outline) */}
        <div className="bg-retro-brown-dark rounded-2xl border-4 border-gray-900 p-6">
          {/* Inner Screen (Cream background) */}
          <div className="bg-cream-100 rounded-xl border-3 border-gray-900 p-8 min-h-[400px]">
            {/* Content Area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {children}
            </div>
          </div>
        </div>

        {/* Power Button */}
        <div className="absolute bottom-8 right-12 flex items-center justify-center">
          <div className="w-16 h-10 bg-retro-teal-light rounded-lg border-4 border-gray-900 shadow-lg">
            <div className="w-full h-full bg-retro-teal rounded-md border-2 border-gray-800 transform translate-y-0.5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVScreen;
