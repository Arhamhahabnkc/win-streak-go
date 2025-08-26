import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  Gift, 
  Smartphone, 
  CreditCard, 
  Coins,
  CheckCircle,
  Clock,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

interface RedeemRewardsProps {
  onBack: () => void;
}

const redeemOptions = [
  {
    id: 'freefire',
    title: 'Free Fire Diamonds',
    description: 'Direct UID transfer',
    minAmount: 100,
    rate: '1 coin = 1 diamond',
    icon: Gift,
    color: 'text-primary',
    bgColor: 'bg-primary/20',
    processing: '1-24 hours'
  },
  {
    id: 'paytm',
    title: 'Paytm Wallet',
    description: 'Direct wallet transfer',
    minAmount: 500,
    rate: '100 coins = ₹1',
    icon: Smartphone,
    color: 'text-secondary',
    bgColor: 'bg-secondary/20',
    processing: '2-4 hours'
  },
  {
    id: 'upi',
    title: 'UPI Transfer',
    description: 'Bank account transfer',
    minAmount: 1000,
    rate: '100 coins = ₹1',
    icon: CreditCard,
    color: 'text-success',
    bgColor: 'bg-success/20',
    processing: '24-48 hours'
  },
  {
    id: 'giftcard',
    title: 'Gift Cards',
    description: 'Amazon, Google Play, etc.',
    minAmount: 2000,
    rate: '100 coins = ₹1',
    icon: Gift,
    color: 'text-warning',
    bgColor: 'bg-warning/20',
    processing: '1-3 days'
  }
];

const recentRedeems = [
  { type: 'Free Fire Diamonds', amount: 500, status: 'completed', date: '2 days ago' },
  { type: 'Paytm Wallet', amount: 250, status: 'processing', date: '1 day ago' },
  { type: 'UPI Transfer', amount: 1000, status: 'pending', date: '3 hours ago' },
];

export default function RedeemRewards({ onBack }: RedeemRewardsProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [redeemAmount, setRedeemAmount] = useState('');
  const [userDetails, setUserDetails] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const userBalance = 1250; // API: Get user balance

  const handleRedeem = async () => {
    if (!selectedOption || !redeemAmount || !userDetails) return;
    
    setIsProcessing(true);
    
    // TODO: API call to process redemption
    // await processRedemption({
    //   type: selectedOption,
    //   amount: parseInt(redeemAmount),
    //   details: userDetails
    // });
    
    setTimeout(() => {
      setIsProcessing(false);
      setSelectedOption(null);
      setRedeemAmount('');
      setUserDetails('');
      // Show success message
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  if (selectedOption) {
    const option = redeemOptions.find(opt => opt.id === selectedOption);
    if (!option) return null;

    return (
      <div className="min-h-screen bg-background p-4">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSelectedOption(null)}
            className="rounded-full hover:bg-accent"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Redeem {option.title}</h1>
        </div>

        {/* Redeem Form */}
        <Card className="bg-gradient-card border-card-border p-6 mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className={`w-12 h-12 rounded-full ${option.bgColor} flex items-center justify-center`}>
              <option.icon className={`w-6 h-6 ${option.color}`} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-card-foreground">{option.title}</h2>
              <p className="text-sm text-muted-foreground">{option.description}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-card-foreground mb-2 block">
                Amount to Redeem
              </label>
              <Input
                type="number"
                placeholder={`Min: ${option.minAmount} coins`}
                value={redeemAmount}
                onChange={(e) => setRedeemAmount(e.target.value)}
                className="bg-background border-card-border"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Available: {userBalance} coins • {option.rate}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-card-foreground mb-2 block">
                {option.id === 'freefire' ? 'Free Fire UID' : 
                 option.id === 'paytm' ? 'Paytm Mobile Number' :
                 option.id === 'upi' ? 'UPI ID' : 'Email Address'}
              </label>
              <Input
                placeholder={
                  option.id === 'freefire' ? 'Enter your Free Fire UID' :
                  option.id === 'paytm' ? 'Enter mobile number' :
                  option.id === 'upi' ? 'yourname@paytm' :
                  'Enter email address'
                }
                value={userDetails}
                onChange={(e) => setUserDetails(e.target.value)}
                className="bg-background border-card-border"
              />
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium text-card-foreground mb-2">Processing Details</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Minimum amount: {option.minAmount} coins</p>
                <p>• Processing time: {option.processing}</p>
                <p>• Rate: {option.rate}</p>
                {parseInt(redeemAmount) > 0 && (
                  <p className="text-card-foreground font-medium">
                    You will receive: {
                      option.id === 'freefire' 
                        ? `${redeemAmount} diamonds`
                        : `₹${Math.floor(parseInt(redeemAmount) / 100)}`
                    }
                  </p>
                )}
              </div>
            </div>

            <Button
              onClick={handleRedeem}
              disabled={
                !redeemAmount || 
                !userDetails || 
                parseInt(redeemAmount) < option.minAmount ||
                parseInt(redeemAmount) > userBalance ||
                isProcessing
              }
              className="w-full h-12 bg-gradient-primary hover:opacity-90 disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                `Redeem ${redeemAmount || '0'} Coins`
              )}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onBack}
          className="rounded-full hover:bg-accent"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold">Redeem Rewards</h1>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-card border-card-border p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Available Balance</p>
            <p className="text-3xl font-bold text-secondary">{userBalance.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">coins</p>
          </div>
          <Coins className="w-12 h-12 text-secondary" />
        </div>
      </Card>

      {/* Redeem Options */}
      <div className="space-y-4 mb-6">
        <h2 className="text-lg font-semibold text-card-foreground">Choose Redemption Method</h2>
        {redeemOptions.map((option) => {
          const canRedeem = userBalance >= option.minAmount;
          return (
            <Card
              key={option.id}
              className={`border-card-border cursor-pointer transition-all ${
                canRedeem 
                  ? 'hover:border-primary/50 hover:bg-gradient-card' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
              onClick={() => canRedeem && setSelectedOption(option.id)}
            >
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full ${option.bgColor} flex items-center justify-center`}>
                    <option.icon className={`w-6 h-6 ${option.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                    <p className="text-xs text-muted-foreground">Min: {option.minAmount} coins</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={canRedeem ? "secondary" : "outline"} className="mb-1">
                    {option.rate}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{option.processing}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Redemptions */}
      <Card className="bg-gradient-card border-card-border p-4">
        <h3 className="font-semibold text-card-foreground mb-4">Recent Redemptions</h3>
        <div className="space-y-3">
          {recentRedeems.map((redeem, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
              <div className="flex items-center space-x-3">
                {getStatusIcon(redeem.status)}
                <div>
                  <p className="text-sm font-medium text-card-foreground">{redeem.type}</p>
                  <p className="text-xs text-muted-foreground">{redeem.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-card-foreground">{redeem.amount} coins</p>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    redeem.status === 'completed' ? 'border-success text-success' :
                    redeem.status === 'processing' ? 'border-warning text-warning' :
                    'border-muted text-muted-foreground'
                  }`}
                >
                  {redeem.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}