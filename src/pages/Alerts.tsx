import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  Users, 
  Globe, 
  Skull,
  Eye,
  Bell,
  User,
  Settings,
  LogOut,
  Clock,
  MapPin,
  Smartphone,
  Monitor,
  Wifi,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const Alerts = () => {
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});
  const { toast } = useToast();

  // Add handler functions for all buttons
  const handleViewDetails = (alertId: number) => {
    setIsLoading({ [`details-${alertId}`]: true });
    setTimeout(() => {
      setIsLoading({});
      toast({
        title: "Alert Details",
        description: `Viewing detailed information for alert #${alertId}`,
      });
    }, 1000);
  };

  const handleMarkResolved = (alertId: number) => {
    setIsLoading({ [`resolve-${alertId}`]: true });
    setTimeout(() => {
      setIsLoading({});
      toast({
        title: "Alert Resolved",
        description: `Alert #${alertId} has been marked as resolved`,
      });
    }, 1000);
  };

  const handleTerminateSession = (sessionId: number) => {
    setIsLoading({ [`terminate-${sessionId}`]: true });
    setTimeout(() => {
      setIsLoading({});
      toast({
        title: "Session Terminated",
        description: `Suspicious session has been terminated successfully`,
        variant: "destructive",
      });
    }, 1000);
  };

  const handleTerminateAllSessions = () => {
    setIsLoading({ 'terminate-all': true });
    setTimeout(() => {
      setIsLoading({});
      toast({
        title: "All Sessions Terminated",
        description: "All other sessions have been terminated for security",
      });
    }, 1500);
  };

  const handleEnableSessionAlerts = () => {
    setIsLoading({ 'session-alerts': true });
    setTimeout(() => {
      setIsLoading({});
      toast({
        title: "Session Alerts Enabled",
        description: "You will now receive notifications for new login sessions",
      });
    }, 1000);
  };

  const handleSecuritySetting = (setting: string) => {
    setIsLoading({ [setting]: true });
    setTimeout(() => {
      setIsLoading({});
      toast({
        title: "Settings Updated",
        description: `${setting.replace('-', ' ')} settings have been updated`,
      });
    }, 1000);
  };

  const securityAlerts = [
    {
      id: 1,
      type: "critical",
      title: "SQL Injection Attempt Detected",
      description: "Multiple SQL injection attempts from IP 192.168.1.100",
      timestamp: "2024-01-15 14:23:45",
      source: "Login Form",
      actions: "Blocked and IP banned",
      severity: "high"
    },
    {
      id: 2,
      type: "warning",
      title: "Brute Force Attack",
      description: "15 failed login attempts detected from same IP",
      timestamp: "2024-01-15 13:45:12",
      source: "Authentication System",
      actions: "Account temporarily locked",
      severity: "medium"
    },
    {
      id: 3,
      type: "info",
      title: "XSS Attack Prevented",
      description: "Cross-site scripting attempt blocked",
      timestamp: "2024-01-15 12:30:08",
      source: "Contact Form",
      actions: "Request sanitized and logged",
      severity: "low"
    },
    {
      id: 4,
      type: "critical",
      title: "Unusual Login Pattern",
      description: "Login from unexpected geographic location",
      timestamp: "2024-01-15 11:15:33",
      source: "User Authentication",
      actions: "2FA challenge triggered",
      severity: "high"
    }
  ];

  const activeSessions = [
    {
      id: 1,
      device: "iPhone 15 Pro",
      location: "New York, NY",
      ip: "192.168.1.45",
      loginTime: "2024-01-15 09:30:00",
      lastActivity: "2024-01-15 14:45:12",
      status: "active",
      browser: "Safari 17.0"
    },
    {
      id: 2,
      device: "MacBook Pro",
      location: "New York, NY",
      ip: "192.168.1.46",
      loginTime: "2024-01-15 08:15:22",
      lastActivity: "2024-01-15 14:44:58",
      status: "active",
      browser: "Chrome 120.0"
    },
    {
      id: 3,
      device: "Windows PC",
      location: "Unknown Location",
      ip: "203.45.67.89",
      loginTime: "2024-01-14 22:30:15",
      lastActivity: "2024-01-14 23:45:33",
      status: "suspicious",
      browser: "Firefox 121.0"
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-alert-critical" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-alert-medium" />;
      case "info":
        return <Activity className="w-5 h-5 text-alert-low" />;
      default:
        return <Shield className="w-5 h-5" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-alert-critical/10 text-alert-critical border-alert-critical/20";
      case "warning":
        return "bg-alert-medium/10 text-alert-medium border-alert-medium/20";
      case "info":
        return "bg-alert-low/10 text-alert-low border-alert-low/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getDeviceIcon = (device: string) => {
    if (device.includes("iPhone") || device.includes("Android")) {
      return <Smartphone className="w-5 h-5" />;
    } else if (device.includes("Mac") || device.includes("Windows")) {
      return <Monitor className="w-5 h-5" />;
    }
    return <Globe className="w-5 h-5" />;
  };

  const getSessionStatus = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/10 text-success">Active</Badge>;
      case "suspicious":
        return <Badge className="bg-alert-critical/10 text-alert-critical">Suspicious</Badge>;
      case "expired":
        return <Badge className="bg-muted text-muted-foreground">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
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
              <Link to="/transfers" className="text-muted-foreground hover:text-banking-blue">Transfers</Link>
              <Link to="/alerts" className="text-banking-blue font-medium">Security</Link>
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
            <h2 className="text-3xl font-bold text-banking-dark mb-2">Security Center</h2>
            <p className="text-muted-foreground">Monitor threats, manage sessions, and protect your account</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secure">
              <Shield className="w-4 h-4 mr-2" />
              Security Status: High
            </Button>
          </div>
        </div>

        {/* Security Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-alert-critical/20 bg-alert-critical/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-alert-critical/10 rounded-lg flex items-center justify-center">
                  <Skull className="w-6 h-6 text-alert-critical" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-alert-critical">12</p>
                  <p className="text-sm text-muted-foreground">Critical Threats</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-alert-medium/20 bg-alert-medium/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-alert-medium/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-alert-medium" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-alert-medium">8</p>
                  <p className="text-sm text-muted-foreground">Warnings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-success/20 bg-success/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">3</p>
                  <p className="text-sm text-muted-foreground">Active Sessions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-banking-blue/20 bg-banking-light/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-banking-blue/10 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-banking-blue" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-banking-blue">99.9%</p>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="threats" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="threats">Security Threats</TabsTrigger>
            <TabsTrigger value="sessions">Active Sessions</TabsTrigger>
            <TabsTrigger value="settings">Security Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="threats" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-banking-dark flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Real-time Security Alerts
                </CardTitle>
                <CardDescription>AI-powered threat detection and prevention system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityAlerts.map((alert) => (
                    <div 
                      key={alert.id} 
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedAlert === alert.id ? 'ring-2 ring-banking-blue' : ''
                      } ${getAlertColor(alert.type)}`}
                      onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          {getAlertIcon(alert.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{alert.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {alert.severity} priority
                            </Badge>
                          </div>
                          <p className="text-sm mb-2">{alert.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {alert.timestamp}
                            </span>
                            <span className="flex items-center gap-1">
                              <Globe className="w-3 h-3" />
                              {alert.source}
                            </span>
                          </div>
                          
                          {selectedAlert === alert.id && (
                            <div className="mt-4 p-3 bg-background/50 rounded border">
                              <h4 className="font-medium mb-2">Actions Taken:</h4>
                              <p className="text-sm">{alert.actions}</p>
                              <div className="flex gap-2 mt-3">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewDetails(alert.id);
                                  }}
                                  disabled={isLoading[`details-${alert.id}`]}
                                >
                                  {isLoading[`details-${alert.id}`] ? "Loading..." : "View Details"}
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleMarkResolved(alert.id);
                                  }}
                                  disabled={isLoading[`resolve-${alert.id}`]}
                                >
                                  {isLoading[`resolve-${alert.id}`] ? "Resolving..." : "Mark as Resolved"}
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Threat Prevention Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">SQL Injection Attempts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-alert-critical mb-2">24</div>
                  <p className="text-xs text-muted-foreground">Blocked today</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">XSS Attacks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-alert-medium mb-2">7</div>
                  <p className="text-xs text-muted-foreground">Prevented today</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">Brute Force</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-alert-high mb-2">15</div>
                  <p className="text-xs text-muted-foreground">Attempts blocked</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-banking-dark flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Active Login Sessions
                </CardTitle>
                <CardDescription>Monitor and manage all active sessions across devices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeSessions.map((session) => (
                    <div key={session.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-banking-blue/10 rounded-lg flex items-center justify-center text-banking-blue">
                            {getDeviceIcon(session.device)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-banking-dark">{session.device}</h3>
                            <p className="text-sm text-muted-foreground">{session.browser}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {session.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Wifi className="w-3 h-3" />
                                {session.ip}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {getSessionStatus(session.status)}
                          <p className="text-xs text-muted-foreground mt-1">
                            Login: {session.loginTime}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Last: {session.lastActivity}
                          </p>
                          {session.status === "suspicious" && (
                            <Button 
                              size="sm" 
                              variant="alert" 
                              className="mt-2"
                              onClick={() => handleTerminateSession(session.id)}
                              disabled={isLoading[`terminate-${session.id}`]}
                            >
                              {isLoading[`terminate-${session.id}`] ? "Terminating..." : "Terminate Session"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={handleTerminateAllSessions}
                    disabled={isLoading['terminate-all']}
                  >
                    {isLoading['terminate-all'] ? "Terminating..." : "Terminate All Other Sessions"}
                  </Button>
                  <Button 
                    variant="banking" 
                    className="flex-1"
                    onClick={handleEnableSessionAlerts}
                    disabled={isLoading['session-alerts']}
                  >
                    {isLoading['session-alerts'] ? "Enabling..." : "Enable Session Alerts"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-banking-dark">Security Preferences</CardTitle>
                  <CardDescription>Customize your security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleSecuritySetting('two-factor-auth')}
                    disabled={isLoading['two-factor-auth']}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    {isLoading['two-factor-auth'] ? "Updating..." : "Two-Factor Authentication"}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleSecuritySetting('login-notifications')}
                    disabled={isLoading['login-notifications']}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {isLoading['login-notifications'] ? "Updating..." : "Login Notifications"}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleSecuritySetting('security-alerts')}
                    disabled={isLoading['security-alerts']}
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    {isLoading['security-alerts'] ? "Updating..." : "Security Alerts"}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleSecuritySetting('trusted-devices')}
                    disabled={isLoading['trusted-devices']}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    {isLoading['trusted-devices'] ? "Updating..." : "Trusted Devices"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-banking-dark">AI Protection Status</CardTitle>
                  <CardDescription>Advanced threat detection systems</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Real-time Monitoring</span>
                    <CheckCircle className="w-5 h-5 text-success" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Anomaly Detection</span>
                    <CheckCircle className="w-5 h-5 text-success" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Behavioral Analysis</span>
                    <CheckCircle className="w-5 h-5 text-success" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Threat Intelligence</span>
                    <CheckCircle className="w-5 h-5 text-success" />
                  </div>
                  <Button 
                    variant="secure" 
                    className="w-full mt-4"
                    onClick={() => handleSecuritySetting('detailed-report')}
                    disabled={isLoading['detailed-report']}
                  >
                    {isLoading['detailed-report'] ? "Generating..." : "View Detailed Report"}
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

export default Alerts;