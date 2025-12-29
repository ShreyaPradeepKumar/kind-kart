import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Building2, Leaf, Plus, Package, Clock, CheckCircle2, 
  LogOut, AlertTriangle, Utensils, Timer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Sample data
const surplusFoodItems = [
  { id: 1, item: "Prepared Meals", quantity: "25 portions", expires: "2 hours", status: "available" },
  { id: 2, item: "Fresh Bread", quantity: "30 loaves", expires: "4 hours", status: "claimed" },
  { id: 3, item: "Vegetable Curry", quantity: "15 portions", expires: "3 hours", status: "picked_up" },
];

const recentActivity = [
  { id: 1, action: "Food picked up", details: "20 portions by Hope Foundation", time: "1 hour ago" },
  { id: 2, action: "New claim", details: "Care Center claimed 15 bread loaves", time: "2 hours ago" },
  { id: 3, action: "Food uploaded", details: "30 fresh salads added", time: "3 hours ago" },
];

const statusConfig = {
  available: { label: "Available", color: "text-success", bg: "bg-success-light", icon: Package },
  claimed: { label: "Claimed", color: "text-warning", bg: "bg-warning-light", icon: Clock },
  picked_up: { label: "Picked Up", color: "text-muted-foreground", bg: "bg-muted", icon: CheckCircle2 },
};

const RestaurantDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({ title: "Signed out", description: "You've been successfully logged out." });
    navigate("/");
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
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-accent-light flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-accent" />
                </div>
                <span className="hidden sm:inline">Sunrise Cafe</span>
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
          <h1 className="text-3xl font-display text-foreground mb-2">Restaurant Dashboard</h1>
          <p className="text-muted-foreground">Reduce waste and help your community</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Food Saved", value: "245 kg", icon: Utensils, color: "success" },
            { label: "Donations Made", value: "67", icon: Package, color: "primary" },
            { label: "Active Listings", value: "3", icon: Timer, color: "warning" },
            { label: "NGOs Helped", value: "12", icon: Building2, color: "accent" },
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

        {/* Quick Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Link to="/restaurant/upload">
            <Card variant="warm" className="cursor-pointer hover:shadow-elevated transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
                    <Plus className="w-7 h-7 text-secondary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Upload Surplus Food</CardTitle>
                    <CardDescription>Quickly share excess food before it goes to waste</CardDescription>
                  </div>
                </div>
                <Button variant="warm">Upload Now</Button>
              </div>
            </Card>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Current Surplus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-display text-foreground">Current Surplus</h2>
              <Link to="/restaurant/upload">
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add More
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {surplusFoodItems.map((item) => {
                const status = statusConfig[item.status as keyof typeof statusConfig];
                const isUrgent = parseInt(item.expires) <= 2;
                return (
                  <Card key={item.id} variant="default" padding="compact">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${status.bg}`}>
                          <status.icon className={`w-5 h-5 ${status.color}`} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{item.item}</p>
                          <p className="text-sm text-muted-foreground">{item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${status.bg} ${status.color}`}>
                          {status.label}
                        </span>
                        <p className={`text-xs mt-1 flex items-center justify-end gap-1 ${isUrgent ? "text-destructive" : "text-muted-foreground"}`}>
                          {isUrgent && <AlertTriangle className="w-3 h-3" />}
                          Expires in {item.expires}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-display text-foreground">Recent Activity</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <Card variant="default">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.details}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default RestaurantDashboard;
