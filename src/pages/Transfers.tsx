import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCw, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Shield,
  Bell,
  User,
  Settings,
  LogOut,
  CreditCard,
  Building,
  Smartphone
} from "lucide-react";
import { Link } from "react-router-dom";

const Transfers = () => {
  const [transferData, setTransferData] = useState({
    fromAccount: "",
    toAccount: "",
    amount: "",
    description: "",
    transferType: "internal"
  });

  const accounts = [
    { id: "1", name: "Premium Checking", number: "****1234", balance: 12450.75 },
    { id: "2", name: "High-Yield Savings", number: "****5678", balance: 25680.00 },
    { id: "3", name: "Investment Account", number: "****9876", balance: 48320.15 }
  ];

  const recentTransfers = [
    {
      id: 1,
      type: "internal",
      from: "Checking ****1234",
      to: "Savings ****5678",
      amount: 500.00,
      status: "completed",
      date: "2024-01-15 14:30",
      description: "Monthly savings transfer"
    },
    {
      id: 2,
      type: "external",
      from: "Checking ****1234",
      to: "External Account",
      amount: 1200.00,
      status: "pending",
      date: "2024-01-15 10:15",
      description: "Rent payment"
    },
    {
      id: 3,
      type: "wire",
      from: "Checking ****1234",
      to: "Business Account",
      amount: 2500.00,
      status: "completed",
      date: "2024-01-14 16:45",
      description: "Business investment"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Transfer initiated:", transferData);
    // Handle transfer logic here
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "pending":
        return <Clock className="w-4 h-4 text-warning" />;
      case "failed":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success";
      case "pending":
        return "bg-warning/10 text-warning";
      case "failed":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-banking-light/50 to-background">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur border-b border-banking-blue/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-banking-blue to-banking-dark rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-banking-dark">SecureBank</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-muted-foreground hover:text-banking-blue">Dashboard</Link>
              <Link to="/accounts" className="text-muted-foreground hover:text-banking-blue">Accounts</Link>
              <Link to="/transfers" className="text-banking-blue font-medium">Transfers</Link>
              <Link to="/alerts" className="text-muted-foreground hover:text-banking-blue">Security</Link>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-banking-dark mb-2">Transfers & Payments</h2>
          <p className="text-muted-foreground">Send money, pay bills, and manage your transfers securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transfer Form */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="send" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="send">Send Money</TabsTrigger>
                <TabsTrigger value="request">Request Money</TabsTrigger>
                <TabsTrigger value="schedule">Schedule Transfer</TabsTrigger>
              </TabsList>

              <TabsContent value="send">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-banking-dark flex items-center gap-2">
                      <ArrowUpRight className="w-5 h-5" />
                      Send Money
                    </CardTitle>
                    <CardDescription>Transfer funds between accounts or to external recipients</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fromAccount" className="text-banking-dark font-medium">From Account</Label>
                          <Select value={transferData.fromAccount} onValueChange={(value) => setTransferData({ ...transferData, fromAccount: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select source account" />
                            </SelectTrigger>
                            <SelectContent>
                              {accounts.map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                  <div className="flex items-center justify-between w-full">
                                    <span>{account.name} {account.number}</span>
                                    <span className="text-sm text-muted-foreground ml-2">
                                      ${account.balance.toLocaleString()}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="transferType" className="text-banking-dark font-medium">Transfer Type</Label>
                          <Select value={transferData.transferType} onValueChange={(value) => setTransferData({ ...transferData, transferType: value })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="internal">
                                <div className="flex items-center gap-2">
                                  <RefreshCw className="w-4 h-4" />
                                  Between My Accounts
                                </div>
                              </SelectItem>
                              <SelectItem value="external">
                                <div className="flex items-center gap-2">
                                  <Building className="w-4 h-4" />
                                  External Bank Account
                                </div>
                              </SelectItem>
                              <SelectItem value="wire">
                                <div className="flex items-center gap-2">
                                  <CreditCard className="w-4 h-4" />
                                  Wire Transfer
                                </div>
                              </SelectItem>
                              <SelectItem value="mobile">
                                <div className="flex items-center gap-2">
                                  <Smartphone className="w-4 h-4" />
                                  Mobile Payment
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {transferData.transferType === "internal" && (
                        <div className="space-y-2">
                          <Label htmlFor="toAccount" className="text-banking-dark font-medium">To Account</Label>
                          <Select value={transferData.toAccount} onValueChange={(value) => setTransferData({ ...transferData, toAccount: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select destination account" />
                            </SelectTrigger>
                            <SelectContent>
                              {accounts.filter(account => account.id !== transferData.fromAccount).map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                  {account.name} {account.number}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {transferData.transferType === "external" && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="recipientName" className="text-banking-dark font-medium">Recipient Name</Label>
                              <Input id="recipientName" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="recipientEmail" className="text-banking-dark font-medium">Email (Optional)</Label>
                              <Input id="recipientEmail" type="email" placeholder="john@example.com" />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="bankName" className="text-banking-dark font-medium">Bank Name</Label>
                              <Input id="bankName" placeholder="Bank of America" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="routingNumber" className="text-banking-dark font-medium">Routing Number</Label>
                              <Input id="routingNumber" placeholder="123456789" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="accountNumber" className="text-banking-dark font-medium">Account Number</Label>
                            <Input id="accountNumber" placeholder="1234567890" />
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="amount" className="text-banking-dark font-medium">Amount</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                            <Input
                              id="amount"
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              className="pl-8"
                              value={transferData.amount}
                              onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="when" className="text-banking-dark font-medium">When</Label>
                          <Select defaultValue="now">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="now">Send Now</SelectItem>
                              <SelectItem value="later">Schedule for Later</SelectItem>
                              <SelectItem value="recurring">Recurring Transfer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-banking-dark font-medium">Description (Optional)</Label>
                        <Input
                          id="description"
                          placeholder="What's this transfer for?"
                          value={transferData.description}
                          onChange={(e) => setTransferData({ ...transferData, description: e.target.value })}
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button type="submit" variant="banking" className="flex-1">
                          Send Transfer
                        </Button>
                        <Button type="button" variant="outline" className="flex-1">
                          Save as Template
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="request">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-banking-dark flex items-center gap-2">
                      <ArrowDownLeft className="w-5 h-5" />
                      Request Money
                    </CardTitle>
                    <CardDescription>Request funds from friends, family, or businesses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="requestAmount" className="text-banking-dark font-medium">Amount Requested</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                            <Input id="requestAmount" type="number" step="0.01" placeholder="0.00" className="pl-8" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="requestTo" className="text-banking-dark font-medium">Deposit To</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select account" />
                            </SelectTrigger>
                            <SelectContent>
                              {accounts.map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                  {account.name} {account.number}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="requestFrom" className="text-banking-dark font-medium">Request From</Label>
                        <Input id="requestFrom" placeholder="Enter email or phone number" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="requestReason" className="text-banking-dark font-medium">Reason for Request</Label>
                        <Input id="requestReason" placeholder="Dinner split, rent share, etc." />
                      </div>

                      <Button variant="banking" className="w-full">
                        Send Money Request
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-banking-dark flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Schedule Transfer
                    </CardTitle>
                    <CardDescription>Set up recurring or future-dated transfers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Clock className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold text-banking-dark mb-2">Scheduled Transfers</h3>
                      <p className="text-muted-foreground mb-6">Set up automatic transfers for bills, savings, and more</p>
                      <Button variant="banking">
                        Set Up Scheduled Transfer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Transfer */}
            <Card>
              <CardHeader>
                <CardTitle className="text-banking-dark">Quick Transfer</CardTitle>
                <CardDescription>Move money between your accounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    $100
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    $500
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    $1,000
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    Custom
                  </Button>
                </div>
                <Button variant="banking" size="sm" className="w-full">
                  Quick Transfer
                </Button>
              </CardContent>
            </Card>

            {/* Transfer Limits */}
            <Card>
              <CardHeader>
                <CardTitle className="text-banking-dark">Daily Limits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Online Transfers</span>
                  <span className="font-semibold">$10,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Wire Transfers</span>
                  <span className="font-semibold">$50,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Today's Usage</span>
                  <span className="text-banking-blue font-semibold">$1,200</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-banking-blue h-2 rounded-full" style={{ width: "12%" }}></div>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card>
              <CardHeader>
                <CardTitle className="text-banking-dark flex items-center gap-2">
                  <Shield className="w-5 h-5 text-success" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>• All transfers are encrypted with 256-bit SSL</p>
                  <p>• Fraud monitoring active 24/7</p>
                  <p>• Two-factor authentication required for large transfers</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Transfers */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-banking-dark">Recent Transfers</CardTitle>
            <CardDescription>Your transfer history and pending transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransfers.map((transfer) => (
                <div key={transfer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-banking-blue/10 rounded-lg flex items-center justify-center">
                      {getStatusIcon(transfer.status)}
                    </div>
                    <div>
                      <p className="font-medium text-banking-dark">{transfer.description}</p>
                      <p className="text-sm text-muted-foreground">{transfer.from} → {transfer.to}</p>
                      <p className="text-xs text-muted-foreground">{transfer.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-banking-dark">
                      ${transfer.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                    <Badge className={getStatusColor(transfer.status)}>
                      {transfer.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Transfers;