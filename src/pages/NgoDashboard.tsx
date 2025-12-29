import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Users, Leaf, Plus, Package, Clock, CheckCircle2, 
  LogOut, Bell, TrendingUp, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Sample data
const currentNeeds = [
  { id: 1, item: "Rice & Grains", quantity: "50 kg", urgency: "high", fulfilled: 30 },
  { id: 2, item: "Cooking Oil", quantity: "20 liters", urgency: "medium", fulfilled: 50 },
  { id: 3, item: "Fresh Vegetables", quantity: "30 kg", urgency: "high", fulfilled: 20 },
];

const incomingDonations = [
  { id: 1, item: "Canned Food", quantity: "24 cans", donor: "Anonymous", status: "pending", eta: "Today, 3:00 PM" },
  { id: 2, item: "Bread", quantity: "15 loaves", donor: "Sunrise Bakery", status: "accepted", eta: "Today, 5:00 PM" },
  { id: 3, item: "Vegetables", quantity: "10 kg", donor: "John D.", status: "received", eta: "Completed" },
];

const urgencyConfig = {
  high: { label: "Urgent", color: "text-destructive", bg: "bg-destructive/10" },
  medium: { label: "Medium", color: "text-warning", bg: "bg-warning-light" },
  low: { label: "Low", color: "text-muted-foreground", bg: "bg-muted" },
};

const statusConfig = {
  pending: { label: "Pending", color: "text-warning", bg: "bg-warning-light", icon: Clock },
  accepted: { label: "Accepted", color: "text-primary", bg: "bg-primary-light", icon: CheckCircle2 },
  received: { label: "Received", color: "text-success", bg: "bg-success-light", icon: CheckCircle2 },
};

const NgoDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({ title: "Signed out", description: "You've been successfully logged out." });
    navigate("/");
  };

  const handleAcceptDonation = (id: number) => {
    toast({
      title: "Donation accepted",
      description: "The donor has been notified. Thank you!",
    });
  };

  const handleMarkReceived = (id: number) => {
    toast({
      title: "Marked as received",
      description: "The donation has been recorded successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-display text-foreground">GiveGood</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-secondary-light flex items-center justify-center">
                  <Users className="w-4 h-4 text-secondary" />
                </div>
                <span className="hidden sm:inline">Hope Foundation</span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-display text-foreground mb-2">NGO Dashboard</h1>
          <p className="text-muted-foreground">Manage your needs and incoming donations</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Active Needs", value: "6", icon: AlertCircle, color: "accent" },
            { label: "Donations Received", value: "124", icon: Package, color: "success" },
            { label: "Pending Pickups", value: "3", icon: Clock, color: "warning" },
            { label: "This Week", value: "+12", icon: TrendingUp, color: "primary" },
          ].map((stat) => (
            <Card key={stat.label} variant="default" padding="compact">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  stat.color === "primary" ? "bg-primary-light" :
                  stat.color === "success" ? "bg-success-light" :
                  stat.color === "warning" ? "bg-warning-light" : "bg-accent-light"
                }`}>
                  <stat.icon className={`w-5 h-5 ${
                    stat.color === "primary" ? "text-primary" :
                    stat.color === "success" ? "text-success" :
                    stat.color === "warning" ? "text-warning" : "text-accent"
                  }`} />
                </div>
                <div>
                  <p className="text-2xl font-display text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Current Needs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-display text-foreground">Your Needs</h2>
              <Link to="/ngo/new-need">
                <Button variant="default" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Need
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {currentNeeds.map((need) => {
                const urgency = urgencyConfig[need.urgency as keyof typeof urgencyConfig];
                return (
                  <Card key={need.id} variant="default" padding="compact">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">{need.item}</p>
                          <p className="text-sm text-muted-foreground">Need: {need.quantity}</p>
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${urgency.bg} ${urgency.color}`}>
                          {urgency.label}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Fulfilled</span>
                          <span>{need.fulfilled}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${need.fulfilled}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </motion.div>

          {/* Incoming Donations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-display text-foreground">Incoming Donations</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-3">
              {incomingDonations.map((donation) => {
                const status = statusConfig[donation.status as keyof typeof statusConfig];
                return (
                  <Card key={donation.id} variant="default" padding="compact">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${status.bg}`}>
                          <status.icon className={`w-5 h-5 ${status.color}`} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{donation.item}</p>
                          <p className="text-sm text-muted-foreground">
                            {donation.quantity} from {donation.donor}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{donation.eta}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${status.bg} ${status.color}`}>
                          {status.label}
                        </span>
                        {donation.status === "pending" && (
                          <Button 
                            variant="success" 
                            size="sm"
                            onClick={() => handleAcceptDonation(donation.id)}
                          >
                            Accept
                          </Button>
                        )}
                        {donation.status === "accepted" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleMarkReceived(donation.id)}
                          >
                            Mark Received
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default NgoDashboard;
