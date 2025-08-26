import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, RefreshCw, Gift, Coins } from 'lucide-react';

interface ScratchCardProps {
  onBack: () => void;
}

const rewards = [
  { type: 'coins', value: 10, color: 'text-secondary', icon: Coins },
  { type: 'coins', value: 25, color: 'text-secondary', icon: Coins },
  { type: 'coins', value: 50, color: 'text-warning', icon: Coins },
  { type: 'coins', value: 100, color: 'text-success', icon: Coins },
  { type: 'diamonds', value: 1, color: 'text-primary', icon: Gift },
  { type: 'diamonds', value: 5, color: 'text-primary', icon: Gift },
];

export default function ScratchCard({ onBack }: ScratchCardProps) {
  const [scratchedCards, setScratchedCards] = useState<number[]>([]);
  const [dailyScratches, setDailyScratches] = useState(3); // API: Get remaining scratches
  const [isScratching, setIsScratching] = useState<number | null>(null);

  const handleScratch = async (cardIndex: number) => {
    if (dailyScratches <= 0 || scratchedCards.includes(cardIndex)) return;
    
    setIsScratching(cardIndex);
    
    // Simulate scratching animation
    setTimeout(() => {
      setScratchedCards(prev => [...prev, cardIndex]);
      setDailyScratches(prev => prev - 1);
      setIsScratching(null);
      
      // TODO: API call to award reward and update user balance
      // const reward = rewards[Math.floor(Math.random() * rewards.length)];
      // await awardReward(reward);
    }, 1500);
  };

  const getRandomReward = () => {
    return rewards[Math.floor(Math.random() * rewards.length)];
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
          <h1 className="text-xl font-bold">Scratch Cards</h1>
        </div>
        <Badge variant="secondary" className="bg-secondary/20 text-secondary">
          {dailyScratches} left today
        </Badge>
      </div>

      {/* Daily Limit Info */}
      <Card className="bg-gradient-card border-card-border p-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Gift className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">Daily Scratch Cards</h3>
            <p className="text-sm text-muted-foreground">
              Scratch to win coins and diamonds! Resets at midnight.
            </p>
          </div>
        </div>
      </Card>

      {/* Scratch Cards Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {Array.from({ length: 6 }, (_, index) => {
          const isScratched = scratchedCards.includes(index);
          const isCurrentlyScratching = isScratching === index;
          const reward = getRandomReward();
          const RewardIcon = reward.icon;

          return (
            <Card
              key={index}
              className={`
                relative aspect-square border-2 overflow-hidden cursor-pointer
                transition-all duration-300 transform
                ${isScratched 
                  ? 'border-success bg-gradient-card' 
                  : dailyScratches > 0 
                    ? 'border-card-border bg-gradient-primary hover:scale-105' 
                    : 'border-muted bg-muted cursor-not-allowed opacity-50'
                }
                ${isCurrentlyScratching ? 'animate-pulse scale-95' : ''}
              `}
              onClick={() => handleScratch(index)}
            >
              {!isScratched && !isCurrentlyScratching && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Gift className="w-8 h-8 text-white mx-auto mb-2 animate-bounce-gentle" />
                    <p className="text-white font-semibold text-sm">Scratch Me!</p>
                  </div>
                </div>
              )}

              {isCurrentlyScratching && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-primary">
                  <RefreshCw className="w-8 h-8 text-white animate-spin" />
                </div>
              )}

              {isScratched && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-card">
                  <div className="text-center">
                    <RewardIcon className={`w-8 h-8 mx-auto mb-2 ${reward.color}`} />
                    <p className={`font-bold text-lg ${reward.color}`}>
                      +{reward.value}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {reward.type}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Reset Timer */}
      <Card className="bg-muted/50 border-border p-4 text-center">
        <p className="text-sm text-muted-foreground">
          Next reset in: <span className="font-semibold text-foreground">12h 34m</span>
        </p>
      </Card>

      {/* No Scratches Left */}
      {dailyScratches <= 0 && (
        <Card className="bg-card border-card-border p-6 text-center mt-6">
          <Gift className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-semibold text-card-foreground mb-2">
            No scratches left today!
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Come back tomorrow for more scratch cards
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