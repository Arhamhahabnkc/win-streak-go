import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  User, 
  Coins, 
  Gift, 
  Star, 
  Users, 
  History, 
  Share,
  Edit,
  Trophy,
  TrendingUp,
  Calendar
} from 'lucide-react';

interface ProfileProps {
  onBack: () => void;
}

// Mock data - replace with API calls
const mockProfile = {
  username: "Gamer123",
  email: "gamer123@email.com",
  joinDate: "Dec 2023",
  avatar: "/api/placeholder/150/150",
  totalEarnings: 5680,
  currentBalance: 1250,
  totalWithdrawn: 4430,
  level: 12,
  xp: 2400,
  totalReferrals: 15,
  activeReferrals: 8,
  referralCode: "GAM123",
  achievements: [
    { name: "First Withdrawal", icon: Trophy, earned: true },
    { name: "Level 10", icon: Star, earned: true },
    { name: "Refer 10 Friends", icon: Users, earned: true },
    { name: "1000 Coins", icon: Coins, earned: true },
    { name: "Weekly Streaker", icon: Calendar, earned: false },
    { name: "Diamond Hunter", icon: Gift, earned: false },
  ]
};

const recentTransactions = [
  { type: 'earned', amount: 45, desc: 'Daily bonus', date: '2h ago' },
  { type: 'earned', amount: 25, desc: 'Scratch card', date: '1d ago' },
  { type: 'withdraw', amount: -500, desc: 'Free Fire Diamonds', date: '2d ago' },
  { type: 'earned', amount: 100, desc: 'Spin wheel', date: '3d ago' },
];

export default function Profile({ onBack }: ProfileProps) {
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
          <h1 className="text-xl font-bold">Profile</h1>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent">
          <Edit className="w-5 h-5" />
        </Button>
      </div>

      {/* Profile Header */}
      <Card className="bg-gradient-card border-card-border p-6 mb-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20 border-4 border-primary">
            <AvatarImage src={mockProfile.avatar} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
              {mockProfile.username.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-card-foreground">
              {mockProfile.username}
            </h2>
            <p className="text-muted-foreground mb-2">{mockProfile.email}</p>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                Level {mockProfile.level}
              </Badge>
              <Badge variant="outline" className="border-card-border">
                Joined {mockProfile.joinDate}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="bg-gradient-card border-card-border p-4">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-success" />
            <div>
              <p className="text-2xl font-bold text-success">
                ₹{mockProfile.totalEarnings.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Total Earned</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card border-card-border p-4">
          <div className="flex items-center space-x-3">
            <Coins className="w-8 h-8 text-secondary" />
            <div>
              <p className="text-2xl font-bold text-secondary">
                {mockProfile.currentBalance}
              </p>
              <p className="text-xs text-muted-foreground">Current Balance</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card border-card-border p-4">
          <div className="flex items-center space-x-3">
            <Gift className="w-8 h-8 text-primary" />
            <div>
              <p className="text-2xl font-bold text-primary">
                ₹{mockProfile.totalWithdrawn.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Withdrawn</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card border-card-border p-4">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-warning" />
            <div>
              <p className="text-2xl font-bold text-warning">
                {mockProfile.totalReferrals}
              </p>
              <p className="text-xs text-muted-foreground">Referrals</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Referral Section */}
      <Card className="bg-gradient-card border-card-border p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-card-foreground">Referral Program</h3>
          <Button size="sm" className="bg-primary/20 text-primary hover:bg-primary/30">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-3 mb-3">
          <p className="text-sm text-muted-foreground">Your referral code</p>
          <p className="text-lg font-bold text-primary">{mockProfile.referralCode}</p>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Active referrals: {mockProfile.activeReferrals}</span>
          <span className="text-success font-semibold">+10 coins per referral</span>
        </div>
      </Card>

      {/* Achievements */}
      <Card className="bg-gradient-card border-card-border p-4 mb-6">
        <h3 className="font-semibold text-card-foreground mb-4 flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-secondary" />
          Achievements
        </h3>
        
        <div className="grid grid-cols-3 gap-3">
          {mockProfile.achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <div
                key={index}
                className={`text-center p-3 rounded-lg transition-all ${
                  achievement.earned 
                    ? 'bg-success/20 border border-success/30' 
                    : 'bg-muted/30 border border-muted'
                }`}
              >
                <IconComponent 
                  className={`w-6 h-6 mx-auto mb-2 ${
                    achievement.earned ? 'text-success' : 'text-muted-foreground'
                  }`} 
                />
                <p className={`text-xs font-medium ${
                  achievement.earned ? 'text-success' : 'text-muted-foreground'
                }`}>
                  {achievement.name}
                </p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="bg-gradient-card border-card-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-card-foreground flex items-center">
            <History className="w-5 h-5 mr-2 text-primary" />
            Recent Activity
          </h3>
          <Button variant="ghost" size="sm" className="text-primary">
            View All
          </Button>
        </div>
        
        <div className="space-y-3">
          {recentTransactions.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  transaction.type === 'earned' ? 'bg-success/20' : 'bg-danger/20'
                }`}>
                  {transaction.type === 'earned' ? (
                    <TrendingUp className="w-4 h-4 text-success" />
                  ) : (
                    <Gift className="w-4 h-4 text-danger" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">
                    {transaction.desc}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.date}
                  </p>
                </div>
              </div>
              <p className={`font-semibold ${
                transaction.type === 'earned' ? 'text-success' : 'text-danger'
              }`}>
                {transaction.type === 'earned' ? '+' : ''}{transaction.amount}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}