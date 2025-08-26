import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Coins, 
  Gift, 
  Target, 
  Flame, 
  Star,
  TrendingUp,
  Zap,
  Award,
  ChevronRight,
  Users
} from 'lucide-react';

// Mock data - replace with API calls later
const mockUserData = {
  username: "Gamer123",
  balance: 1250,
  todayEarnings: 45,
  level: 12,
  xp: 2400,
  xpToNext: 600,
  streak: 7,
  referrals: 3
};

const bannerData = [
  {
    title: "🎯 Daily Bonus Available!",
    subtitle: "Complete today's tasks",
    gradient: "bg-gradient-primary"
  },
  {
    title: "💎 Free Fire Event",
    subtitle: "Win exclusive diamonds",
    gradient: "bg-gradient-gold"
  },
  {
    title: "🔥 Double XP Weekend",
    subtitle: "Earn 2x rewards now",
    gradient: "bg-gradient-rainbow"
  }
];

export default function Dashboard() {
  const [currentBanner, setCurrentBanner] = useState(0);

  // Auto-rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {mockUserData.username}!
          </h1>
          <p className="text-muted-foreground">Ready to earn today?</p>
        </div>
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center animate-glow">
            <span className="text-white font-bold text-lg">
              {mockUserData.level}
            </span>
          </div>
        </div>
      </div>

      {/* Rolling Banner */}
      <Card className="relative overflow-hidden bg-gradient-card border-card-border">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-secondary">
                {bannerData[currentBanner].title}
              </h2>
              <p className="text-muted-foreground">
                {bannerData[currentBanner].subtitle}
              </p>
            </div>
            <ChevronRight className="w-6 h-6 text-primary animate-bounce-gentle" />
          </div>
        </div>
        
        {/* Banner Indicators */}
        <div className="absolute bottom-4 left-6 flex space-x-2">
          {bannerData.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentBanner ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-card border-card-border p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
              <Coins className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Balance</p>
              <p className="text-lg font-bold text-secondary">
                {mockUserData.balance.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card border-card-border p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Today's Earning</p>
              <p className="text-lg font-bold text-success">
                +{mockUserData.todayEarnings}
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card border-card-border p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
              <Flame className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Daily Streak</p>
              <p className="text-lg font-bold text-warning">
                {mockUserData.streak} days
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card border-card-border p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Referrals</p>
              <p className="text-lg font-bold text-primary">
                {mockUserData.referrals}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Level Progress */}
      <Card className="bg-gradient-card border-card-border p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-secondary" />
            <span className="font-semibold">Level {mockUserData.level}</span>
          </div>
          <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
            {mockUserData.xp}/{mockUserData.xp + mockUserData.xpToNext} XP
          </Badge>
        </div>
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-primary transition-all duration-500 rounded-full"
            style={{ 
              width: `${(mockUserData.xp / (mockUserData.xp + mockUserData.xpToNext)) * 100}%` 
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {mockUserData.xpToNext} XP to next level
        </p>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button className="h-16 bg-gradient-primary hover:opacity-90 border-0 rounded-2xl flex-col space-y-1">
          <Gift className="w-6 h-6" />
          <span className="text-sm font-medium">Scratch Cards</span>
        </Button>
        
        <Button className="h-16 bg-gradient-gold hover:opacity-90 border-0 rounded-2xl flex-col space-y-1">
          <Target className="w-6 h-6" />
          <span className="text-sm font-medium">Spin Wheel</span>
        </Button>
        
        <Button className="h-16 bg-gradient-rainbow hover:opacity-90 border-0 rounded-2xl flex-col space-y-1">
          <Zap className="w-6 h-6" />
          <span className="text-sm font-medium">Watch Ads</span>
        </Button>
        
        <Button className="h-16 bg-card hover:bg-accent border border-card-border rounded-2xl flex-col space-y-1">
          <Award className="w-6 h-6 text-primary" />
          <span className="text-sm font-medium text-card-foreground">Redeem</span>
        </Button>
      </div>
    </div>
  );
}