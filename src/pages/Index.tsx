import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Smartphone, CreditCard, TrendingUp, Users, Zap, CheckCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-banking-light via-background to-banking-light">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur border-b border-banking-blue/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-banking-blue to-banking-dark rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-banking-dark">SecureBank</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button variant="banking" asChild>
                <Link to="/register">Open Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-banking-blue to-banking-dark rounded-full mx-auto mb-8 flex items-center justify-center">
              <Shield className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-banking-dark mb-6">
              Banking Made <span className="text-banking-blue">Secure</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Experience next-generation banking with AI-powered security, real-time fraud detection, 
              and comprehensive account management designed for the modern world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="banking" size="lg" asChild>
                <Link to="/register">Get Started Today</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/login">Existing Customer</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-banking-dark mb-4">Why Choose SecureBank?</h2>
            <p className="text-muted-foreground">Advanced features designed to protect and serve you better</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <div className="w-16 h-16 bg-banking-blue/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-banking-blue" />
                </div>
                <CardTitle className="text-banking-dark">Advanced Security</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  AI-powered threat detection with real-time monitoring for SQL injection, XSS attacks, and brute force attempts.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <div className="w-16 h-16 bg-banking-blue/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-banking-blue" />
                </div>
                <CardTitle className="text-banking-dark">Mobile Banking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Secure mobile access with biometric authentication and encrypted communication for banking on-the-go.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <div className="w-16 h-16 bg-banking-blue/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-banking-blue" />
                </div>
                <CardTitle className="text-banking-dark">Smart Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Intelligent spending insights and investment recommendations powered by machine learning algorithms.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-banking-dark mb-6">
                Military-Grade Security
              </h2>
              <p className="text-muted-foreground mb-8">
                Your financial security is our top priority. Our advanced AI monitoring system 
                detects and prevents threats in real-time, ensuring your money and data stay protected.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span>Two-factor authentication</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span>Real-time fraud monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span>Biometric security</span>
                </div>
              </div>

              <Button variant="banking" className="mt-8" asChild>
                <Link to="/alerts">View Security Center</Link>
              </Button>
            </div>
            
            <div className="bg-gradient-to-br from-banking-blue/10 to-banking-dark/5 p-8 rounded-2xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 p-4 rounded-lg text-center">
                  <Lock className="w-8 h-8 text-banking-blue mx-auto mb-2" />
                  <p className="text-sm font-semibold">99.9%</p>
                  <p className="text-xs text-muted-foreground">Uptime</p>
                </div>
                <div className="bg-white/80 p-4 rounded-lg text-center">
                  <Shield className="w-8 h-8 text-success mx-auto mb-2" />
                  <p className="text-sm font-semibold">24/7</p>
                  <p className="text-xs text-muted-foreground">Monitoring</p>
                </div>
                <div className="bg-white/80 p-4 rounded-lg text-center">
                  <Zap className="w-8 h-8 text-warning mx-auto mb-2" />
                  <p className="text-sm font-semibold">0.1s</p>
                  <p className="text-xs text-muted-foreground">Response Time</p>
                </div>
                <div className="bg-white/80 p-4 rounded-lg text-center">
                  <Users className="w-8 h-8 text-banking-blue mx-auto mb-2" />
                  <p className="text-sm font-semibold">500K+</p>
                  <p className="text-xs text-muted-foreground">Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-banking-blue to-banking-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Experience Secure Banking?
          </h2>
          <p className="text-banking-light mb-8 text-lg">
            Join thousands of customers who trust SecureBank with their financial future.
            Open your account in minutes with our streamlined process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/register">Open Account Free</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-banking-dark" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-banking-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6" />
                <span className="text-xl font-bold">SecureBank</span>
              </div>
              <p className="text-banking-light text-sm">
                Your trusted financial partner with advanced security and modern banking solutions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Banking</h3>
              <ul className="space-y-2 text-sm text-banking-light">
                <li><Link to="/accounts" className="hover:text-white">Accounts</Link></li>
                <li><Link to="/transfers" className="hover:text-white">Transfers</Link></li>
                <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Security</h3>
              <ul className="space-y-2 text-sm text-banking-light">
                <li><Link to="/alerts" className="hover:text-white">Security Center</Link></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-banking-light">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">System Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-banking-blue/20 mt-8 pt-8 text-center text-sm text-banking-light">
            <p>&copy; 2024 SecureBank. All rights reserved. FDIC Insured.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
