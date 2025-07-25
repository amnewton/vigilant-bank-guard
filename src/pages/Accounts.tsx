import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Wallet, 
  PiggyBank, 
  TrendingUp, 
  Download, 
  Plus,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownLeft,
  History,
  Shield,
  Bell,
  User,
  Settings,
  LogOut
} from "lucide-react";
import { Link } from "react-router-dom";

const Accounts = () => {
  const [showBalances, setShowBalances] = useState(true);

  const accounts = [
    {
      id: 1,
      name: "Premium Checking",
      type: "checking",
      balance: 12450.75,
      number: "****1234",
      status: "active",
      interest: "0.05%",
      description: "Everyday banking with no monthly fees"
    },
    {
      id: 2,
      name: "High-Yield Savings",
      type: "savings",
      balance: 25680.00,
      number: "****5678",
      status: "active",
      interest: "4.20%",
      description: "Earn more with our competitive rates"
    },
    {
      id: 3,
      name: "Investment Account",
      type: "investment",
      balance: 48320.15,
      number: "****9876",
      status: "active",
      interest: "7.85%",
      description: "Diversified portfolio management"
    },
    {
      id: 4,
      name: "Platinum Credit Card",
      type: "credit",
      balance: -1250.30,
      number: "****9012",
      status: "active",
      limit: 15000,
      interest: "18.99%",
      description: "Premium rewards and benefits"
    }
  ];

  const getAccountIcon = (type: string) => {
    switch (type) {
      case "checking":
        return <Wallet className="w-6 h-6" />;
      case "savings":
        return <PiggyBank className="w-6 h-6" />;
      case "investment":
        return <TrendingUp className="w-6 h-6" />;
      case "credit":
        return <CreditCard className="w-6 h-6" />;
      default:
        return <Wallet className="w-6 h-6" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success/10 text-success";
      case "inactive":
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
              <Link to="/accounts" className="text-banking-blue font-medium">Accounts</Link>
              <Link to="/transfers" className="text-muted-foreground hover:text-banking-blue">Transfers</Link>
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-banking-dark mb-2">My Accounts</h2>
            <p className="text-muted-foreground">Manage your banking accounts and view detailed information</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => setShowBalances(!showBalances)}
              className="flex items-center gap-2"
            >
              {showBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showBalances ? "Hide Balances" : "Show Balances"}
            </Button>
            <Button variant="banking">
              <Plus className="w-4 h-4 mr-2" />
              Open New Account
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Account Overview</TabsTrigger>
            <TabsTrigger value="statements">Statements</TabsTrigger>
            <TabsTrigger value="settings">Account Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Account Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {accounts.map((account) => (
                <Card key={account.id} className="relative overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-banking-blue/10 rounded-lg flex items-center justify-center text-banking-blue">
                          {getAccountIcon(account.type)}
                        </div>
                        <div>
                          <CardTitle className="text-lg text-banking-dark">{account.name}</CardTitle>
                          <CardDescription className="text-sm">{account.number}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getStatusColor(account.status)}>
                        {account.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
                        <p className="text-2xl font-bold text-banking-dark">
                          {showBalances ? (
                            <>
                              {account.balance < 0 && account.type === "credit" ? "" : "$"}
                              {Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                              {account.balance < 0 && account.type === "credit" && " owed"}
                            </>
                          ) : (
                            "••••••"
                          )}
                        </p>
                      </div>
                      {account.type === "credit" && showBalances && (
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Credit Limit</p>
                          <p className="text-sm font-semibold">${account.limit?.toLocaleString()}</p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                      <div>
                        <p className="text-xs text-muted-foreground">Interest Rate</p>
                        <p className="text-sm font-semibold text-banking-blue">{account.interest}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Account Type</p>
                        <p className="text-sm font-semibold capitalize">{account.type}</p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">{account.description}</p>

                    <div className="flex gap-2 pt-2">
                      <Button variant="banking" size="sm" className="flex-1">
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                        Transfer
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <History className="w-4 h-4 mr-1" />
                        History
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Account Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-banking-dark">Account Summary</CardTitle>
                <CardDescription>Total balances across all accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-success/5 rounded-lg border border-success/20">
                    <p className="text-sm text-muted-foreground mb-1">Total Assets</p>
                    <p className="text-2xl font-bold text-success">
                      {showBalances ? "$86,450.90" : "••••••"}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-banking-light/50 rounded-lg border border-banking-blue/20">
                    <p className="text-sm text-muted-foreground mb-1">Checking</p>
                    <p className="text-2xl font-bold text-banking-blue">
                      {showBalances ? "$12,450.75" : "••••••"}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-banking-light/50 rounded-lg border border-banking-blue/20">
                    <p className="text-sm text-muted-foreground mb-1">Savings</p>
                    <p className="text-2xl font-bold text-banking-blue">
                      {showBalances ? "$25,680.00" : "••••••"}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                    <p className="text-sm text-muted-foreground mb-1">Credit Used</p>
                    <p className="text-2xl font-bold text-destructive">
                      {showBalances ? "$1,250.30" : "••••••"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-banking-dark">Account Statements</CardTitle>
                <CardDescription>Download your monthly statements and transaction history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["January 2024", "December 2023", "November 2023", "October 2023"].map((month) => (
                    <div key={month} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{month} Statement</p>
                        <p className="text-sm text-muted-foreground">All accounts included</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-banking-dark">Account Preferences</CardTitle>
                  <CardDescription>Manage your account settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Update Contact Information
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Change Account Nicknames
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Notification Preferences
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Privacy Settings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-banking-dark">Security Settings</CardTitle>
                  <CardDescription>Enhance your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Login History
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Account Alerts
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Accounts;