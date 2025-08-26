import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, RotateCcw, Gift, Coins, Zap, Star } from 'lucide-react';

interface SpinWheelProps {
  onBack: () => void;
}

const wheelSegments = [
  { label: '10 Coins', value: 10, type: 'coins', color: 'text-secondary', bgColor: 'bg-secondary/20' },
  { label: '25 Coins', value: 25, type: 'coins', color: 'text-secondary', bgColor: 'bg-secondary/30' },
  { label: '50 Coins', value: 50, type: 'coins', color: 'text-warning', bgColor: 'bg-warning/20' },
  { label: '1 Diamond', value: 1, type: 'diamonds', color: 'text-primary', bgColor: 'bg-primary/20' },
  { label: '100 Coins', value: 100, type: 'coins', color: 'text-success', bgColor: 'bg-success/20' },
  { label: '5 Diamonds', value: 5, type: 'diamonds', color: 'text-primary', bgColor: 'bg-primary/30' },
  { label: '75 Coins', value: 75, type: 'coins', color: 'text-warning', bgColor: 'bg-warning/30' },
  { label: 'Better Luck', value: 0, type: 'none', color: 'text-muted-foreground', bgColor: 'bg-muted' },
];

export default function SpinWheel({ onBack }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [dailySpins, setDailySpins] = useState(2); // API: Get remaining spins
  const [lastReward, setLastReward] = useState<any>(null);
  const [wheelRotation, setWheelRotation] = useState(0);

  const handleSpin = async () => {
    if (dailySpins <= 0 || isSpinning) return;
    
    setIsSpinning(true);
    setLastReward(null);
    
    // Random reward selection
    const randomSegment = wheelSegments[Math.floor(Math.random() * wheelSegments.length)];
    
    // Calculate rotation (multiple full rotations + segment position)
    const segmentAngle = 360 / wheelSegments.length;
    const segmentIndex = wheelSegments.findIndex(s => s.label === randomSegment.label);
    const targetRotation = wheelRotation + 1440 + (segmentIndex * segmentAngle); // 4 full rotations + target
    
    setWheelRotation(targetRotation);
    
    // Simulate spin duration
    setTimeout(() => {
      setIsSpinning(false);
      setDailySpins(prev => prev - 1);
      setLastReward(randomSegment);
      
      // TODO: API call to award reward
      // await awardReward(randomSegment);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="rounded-full hover:bg-accent"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Lucky Spin</h1>
        </div>
        <Badge variant="secondary" className="bg-secondary/20 text-secondary">
          {dailySpins} spins left
        </Badge>
      </div>

      {/* Spin Info */}
      <Card className="bg-gradient-card border-card-border p-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <RotateCcw className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">Daily Lucky Spin</h3>
            <p className="text-sm text-muted-foreground">
              Spin the wheel to win amazing rewards!
            </p>
          </div>
        </div>
      </Card>

      {/* Spin Wheel */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          {/* Wheel */}
          <div 
            className={`w-80 h-80 rounded-full border-4 border-card-border relative overflow-hidden transition-transform duration-3000 ease-out ${isSpinning ? 'animate-spin-slow' : ''}`}
            style={{ transform: `rotate(${wheelRotation}deg)` }}
          >
            {wheelSegments.map((segment, index) => {
              const segmentAngle = 360 / wheelSegments.length;
              const rotation = index * segmentAngle;
              
              return (
                <div
                  key={index}
                  className={`absolute w-full h-full ${segment.bgColor}`}
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((segmentAngle * Math.PI) / 180)}% ${50 - 50 * Math.sin((segmentAngle * Math.PI) / 180)}%)`
                  }}
                >
                  <div 
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center"
                    style={{ transform: 'translateX(-50%) rotate(22.5deg)' }}
                  >
                    <p className={`text-xs font-semibold ${segment.color}`}>
                      {segment.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Center Hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-primary rounded-full border-4 border-background flex items-center justify-center">
            <Star className="w-8 h-8 text-white" />
          </div>
          
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-primary drop-shadow-lg"></div>
          </div>
        </div>

        {/* Spin Button */}
        <Button
          onClick={handleSpin}
          disabled={dailySpins <= 0 || isSpinning}
          className={`mt-8 h-16 px-8 rounded-2xl text-lg font-semibold ${
            dailySpins > 0 && !isSpinning
              ? 'bg-gradient-primary hover:opacity-90 animate-glow'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          {isSpinning ? (
            <div className="flex items-center space-x-2">
              <RotateCcw className="w-5 h-5 animate-spin" />
              <span>Spinning...</span>
            </div>
          ) : dailySpins > 0 ? (
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>SPIN NOW!</span>
            </div>
          ) : (
            <span>No spins left</span>
          )}
        </Button>
      </div>

      {/* Last Reward */}
      {lastReward && (
        <Card className="bg-gradient-card border-card-border p-6 text-center mb-6 animate-scale-in">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
              {lastReward.type === 'coins' ? (
                <Coins className="w-8 h-8 text-secondary" />
              ) : lastReward.type === 'diamonds' ? (
                <Gift className="w-8 h-8 text-primary" />
              ) : (
                <Star className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-card-foreground">
                {lastReward.value > 0 ? 'Congratulations!' : 'Better luck next time!'}
              </h3>
              <p className={`text-xl font-bold ${lastReward.color}`}>
                {lastReward.label}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* No Spins Left */}
      {dailySpins <= 0 && (
        <Card className="bg-card border-card-border p-6 text-center">
          <RotateCcw className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-semibold text-card-foreground mb-2">
            No spins left today!
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Come back tomorrow for more lucky spins
          </p>
          <Button 
            variant="outline" 
            onClick={onBack}
            className="border-card-border hover:bg-accent"
          >
            Back to Dashboard
          </Button>
        </Card>
      )}
    </div>
  );
}