import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  EyeOff, 
  ArrowUpRight, 
  ArrowDownLeft,
  Shield,
  Bell,
  User,
  Settings,
  LogOut
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);

  const accounts = [
    { id: 1, name: "Checking Account", type: "checking", balance: 12450.75, number: "****1234" },
    { id: 2, name: "Savings Account", type: "savings", balance: 25680.00, number: "****5678" },
    { id: 3, name: "Credit Card", type: "credit", balance: -1250.30, number: "****9012", limit: 5000 },
  ];

  const recentTransactions = [
    { id: 1, description: "Online Purchase - Amazon", amount: -89.99, date: "2024-01-15", type: "debit" },
    { id: 2, description: "Salary Deposit", amount: 3500.00, date: "2024-01-15", type: "credit" },
    { id: 3, description: "ATM Withdrawal", amount: -200.00, date: "2024-01-14", type: "debit" },
    { id: 4, description: "Transfer from Savings", amount: 500.00, date: "2024-01-14", type: "credit" },
    { id: 5, description: "Grocery Store", amount: -156.43, date: "2024-01-13", type: "debit" },
  ];

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
              <Link to="/dashboard" className="text-banking-blue font-medium">Dashboard</Link>
              <Link to="/accounts" className="text-muted-foreground hover:text-banking-blue">Accounts</Link>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-banking-dark mb-2">Welcome back, John!</h2>
          <p className="text-muted-foreground">Here's what's happening with your accounts today.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Button variant="banking" className="h-auto py-4 flex-col gap-2">
            <ArrowUpRight className="w-5 h-5" />
            Send Money
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col gap-2">
            <ArrowDownLeft className="w-5 h-5" />
            Request Money
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col gap-2">
            <CreditCard className="w-5 h-5" />
            Pay Bills
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col gap-2">
            <TrendingUp className="w-5 h-5" />
            Investments
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Account Overview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-banking-dark">Account Overview</CardTitle>
                  <CardDescription>Your account balances and details</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBalance(!showBalance)}
                  className="flex items-center gap-2"
                >
                  {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showBalance ? "Hide" : "Show"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {accounts.map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-banking-blue/10 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-banking-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-banking-dark">{account.name}</h3>
                        <p className="text-sm text-muted-foreground">{account.number}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        {showBalance ? (
                          `$${Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                        ) : (
                          "••••••"
                        )}
                        {account.balance < 0 && showBalance && (
                          <span className="text-destructive"> CR</span>
                        )}
                      </p>
                      {account.type === "credit" && showBalance && (
                        <p className="text-sm text-muted-foreground">
                          Limit: ${account.limit?.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-banking-dark">Recent Transactions</CardTitle>
                <CardDescription>Your latest account activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          transaction.type === "credit" ? "bg-success/10" : "bg-destructive/10"
                        }`}>
                          {transaction.type === "credit" ? (
                            <TrendingUp className="w-5 h-5 text-success" />
                          ) : (
                            <TrendingDown className="w-5 h-5 text-destructive" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-banking-dark">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.type === "credit" ? "text-success" : "text-banking-dark"
                        }`}>
                          {transaction.type === "credit" ? "+" : ""}
                          ${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Transactions
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Security Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-banking-dark flex items-center gap-2">
                  <Shield className="w-5 h-5 text-success" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Account Security</span>
                  <Badge variant="secondary" className="bg-success/10 text-success">High</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Two-Factor Auth</span>
                  <Badge variant="secondary" className="bg-success/10 text-success">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Login</span>
                  <span className="text-sm text-muted-foreground">Today, 9:30 AM</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  <Link to="/alerts">View Security Center</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-banking-dark">This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Spending</span>
                  <span className="font-semibold">$2,847.32</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Income</span>
                  <span className="font-semibold text-success">$3,500.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Savings Goal</span>
                  <span className="text-sm text-muted-foreground">67% reached</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-banking-blue h-2 rounded-full" style={{ width: "67%" }}></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;