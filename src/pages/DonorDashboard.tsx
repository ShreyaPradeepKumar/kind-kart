import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Heart, Leaf, Plus, Package, Clock, CheckCircle2, 
  MapPin, LogOut, Search, Filter, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Sample data for demonstration
const recentDonations = [
  { id: 1, item: "Fresh Vegetables", quantity: "10 kg", status: "delivered", ngo: "Hope Foundation", date: "Dec 28" },
  { id: 2, item: "Canned Food", quantity: "24 cans", status: "in_transit", ngo: "Care Center", date: "Dec 27" },
  { id: 3, item: "Bread & Bakery", quantity: "20 loaves", status: "pending", ngo: "Pending match", date: "Dec 27" },
];

const nearbyNgos = [
  { id: 1, name: "Hope Foundation", needs: ["Vegetables", "Rice", "Cooking Oil"], distance: "2.3 km" },
  { id: 2, name: "Care Center", needs: ["Canned Food", "Blankets"], distance: "3.5 km" },
  { id: 3, name: "Sunrise Shelter", needs: ["Fresh Fruits", "Bread"], distance: "4.1 km" },
];

const statusConfig = {
  delivered: { label: "Delivered", color: "text-success", bg: "bg-success-light", icon: CheckCircle2 },
  in_transit: { label: "In Transit", color: "text-warning", bg: "bg-warning-light", icon: Clock },
  pending: { label: "Pending", color: "text-muted-foreground", bg: "bg-muted", icon: Package },
};

const DonorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

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
                <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
                  <Heart className="w-4 h-4 text-primary" />
                </div>
                <span className="hidden sm:inline">Donor</span>
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
          <h1 className="text-3xl font-display text-foreground mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">Ready to make a difference today?</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Total Donations", value: "23", icon: Package, color: "primary" },
            { label: "Items Delivered", value: "156", icon: CheckCircle2, color: "success" },
            { label: "NGOs Helped", value: "8", icon: Heart, color: "accent" },
            { label: "This Month", value: "5", icon: Calendar, color: "secondary" },
          ].map((stat) => (
            <Card key={stat.label} variant="default" padding="compact">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  stat.color === "primary" ? "bg-primary-light" :
                  stat.color === "success" ? "bg-success-light" :
                  stat.color === "accent" ? "bg-accent-light" : "bg-secondary-light"
                }`}>
                  <stat.icon className={`w-5 h-5 ${
                    stat.color === "primary" ? "text-primary" :
                    stat.color === "success" ? "text-success" :
                    stat.color === "accent" ? "text-accent" : "text-secondary"
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/donor/new-donation">
                <Card variant="featured" className="cursor-pointer hover:shadow-elevated transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">
                        <Plus className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Create New Donation</CardTitle>
                        <CardDescription>Share food or essentials with those in need</CardDescription>
                      </div>
                    </div>
                    <Button variant="hero">Donate Now</Button>
                  </div>
                </Card>
              </Link>
            </motion.div>

            {/* Recent Donations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-display text-foreground">Recent Donations</h2>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="space-y-3">
                {recentDonations.map((donation) => {
                  const status = statusConfig[donation.status as keyof typeof statusConfig];
                  return (
                    <Card key={donation.id} variant="default" padding="compact">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${status.bg}`}>
                            <status.icon className={`w-5 h-5 ${status.color}`} />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{donation.item}</p>
                            <p className="text-sm text-muted-foreground">{donation.quantity} → {donation.ngo}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${status.bg} ${status.color}`}>
                            {status.label}
                          </span>
                          <p className="text-xs text-muted-foreground mt-1">{donation.date}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Search NGOs */}
            <Card variant="default">
              <CardHeader className="pb-4">
                <CardTitle>Find NGOs</CardTitle>
                <CardDescription>Search for organizations near you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or need..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Nearby NGOs */}
            <Card variant="default">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle>Nearby NGOs</CardTitle>
                  <Button variant="ghost" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {nearbyNgos.map((ngo) => (
                  <div key={ngo.id} className="p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-foreground">{ngo.name}</p>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {ngo.distance}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {ngo.needs.map((need) => (
                        <span key={need} className="text-xs px-2 py-0.5 rounded-full bg-primary-light text-primary">
                          {need}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DonorDashboard;
