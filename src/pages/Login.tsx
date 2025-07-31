import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Shield, Eye, EyeOff, Lock, User } from "lucide-react";
import { signIn } from "@/lib/supabase";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signIn(formData.email, formData.password);
      
      toast({
        title: "Login Successful",
        description: "Welcome back! Redirecting to dashboard...",
      });
      
      // Redirect to dashboard after successful login
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
      
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-banking-light via-background to-banking-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-banking-blue to-banking-dark rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-banking-dark">SecureBank</h1>
          <p className="text-muted-foreground mt-2">Your trusted financial partner</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-banking-dark">Welcome Back</CardTitle>
            <CardDescription>Sign in to access your account securely</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-banking-dark font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 h-12 border-2"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-banking-dark font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-12 h-12 border-2"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link to="/forgot-password" className="text-banking-blue hover:underline">
                  Forgot password?
                </Link>
                <span className="text-muted-foreground">Need help?</span>
              </div>

              <Button 
                type="submit" 
                variant="banking" 
                size="lg" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In Securely"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-banking-blue hover:underline font-medium">
                  Open Account
                </Link>
              </p>
            </div>

            <div className="mt-4 p-3 bg-success/10 rounded-lg border border-success/20">
              <div className="flex items-center gap-2 text-sm text-success">
                <Shield className="w-4 h-4" />
                <span className="font-medium">256-bit SSL encryption protects your data</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;