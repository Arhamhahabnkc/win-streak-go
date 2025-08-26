import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, User, Gift, Target, Award } from 'lucide-react';
import Dashboard from '@/components/Dashboard';
import ScratchCard from '@/components/ScratchCard';
import SpinWheel from '@/components/SpinWheel';
import Profile from '@/components/Profile';
import RedeemRewards from '@/components/RedeemRewards';

type Screen = 'dashboard' | 'scratch' | 'spin' | 'profile' | 'redeem';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'scratch':
        return <ScratchCard onBack={() => setCurrentScreen('dashboard')} />;
      case 'spin':
        return <SpinWheel onBack={() => setCurrentScreen('dashboard')} />;
      case 'profile':
        return <Profile onBack={() => setCurrentScreen('dashboard')} />;
      case 'redeem':
        return <RedeemRewards onBack={() => setCurrentScreen('dashboard')} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      {renderScreen()}
      
      {/* Bottom Navigation */}
      {currentScreen === 'dashboard' && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-card-border p-4">
          <div className="flex justify-around items-center max-w-md mx-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentScreen('dashboard')}
              className="flex-col space-y-1 h-auto py-2"
            >
              <Home className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentScreen('scratch')}
              className="flex-col space-y-1 h-auto py-2"
            >
              <Gift className="w-5 h-5" />
              <span className="text-xs">Scratch</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentScreen('spin')}
              className="flex-col space-y-1 h-auto py-2"
            >
              <Target className="w-5 h-5" />
              <span className="text-xs">Spin</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentScreen('redeem')}
              className="flex-col space-y-1 h-auto py-2"
            >
              <Award className="w-5 h-5" />
              <span className="text-xs">Redeem</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentScreen('profile')}
              className="flex-col space-y-1 h-auto py-2"
            >
              <User className="w-5 h-5" />
              <span className="text-xs">Profile</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;