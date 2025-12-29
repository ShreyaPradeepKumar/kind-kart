import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const itemCategories = [
  { id: "vegetables", label: "Fresh Vegetables", icon: "🥬" },
  { id: "fruits", label: "Fruits", icon: "🍎" },
  { id: "grains", label: "Rice & Grains", icon: "🌾" },
  { id: "bread", label: "Bread & Bakery", icon: "🍞" },
  { id: "canned", label: "Canned Food", icon: "🥫" },
  { id: "cooking", label: "Cooking Supplies", icon: "🍳" },
  { id: "hygiene", label: "Hygiene Products", icon: "🧴" },
  { id: "clothing", label: "Clothing", icon: "👕" },
  { id: "blankets", label: "Blankets", icon: "🛏️" },
  { id: "other", label: "Other", icon: "📦" },
];

const urgencyOptions = [
  { id: "low", label: "Low", description: "Within the next week", color: "muted-foreground" },
  { id: "medium", label: "Medium", description: "Within 2-3 days", color: "warning" },
  { id: "high", label: "Urgent", description: "Needed immediately", color: "destructive" },
];

const NewNeed = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    category: "",
    quantity: "",
    description: "",
    urgency: "medium",
  });

  const handleSubmit = () => {
    toast({
      title: "Need posted!",
      description: "Donors will be notified about your requirement.",
    });
    navigate("/ngo");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/ngo" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-display text-foreground mb-2">Post a New Need</h1>
            <p className="text-muted-foreground">Let donors know what your organization needs</p>
          </div>

          <div className="space-y-8">
            {/* Category Selection */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">What do you need?</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {itemCategories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setFormData({ ...formData, category: category.id })}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      variant="interactive"
                      padding="compact"
                      className={formData.category === category.id ? "border-primary ring-2 ring-primary/20" : ""}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <p className="font-medium text-foreground text-sm">{category.label}</p>
                      </div>
                    </Card>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Quantity Needed</label>
              <Input
                placeholder="e.g., 50 kg, 100 items, 20 bags"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              />
            </div>

            {/* Urgency */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">How urgent is this need?</h3>
              <div className="grid grid-cols-3 gap-3">
                {urgencyOptions.map((urgency) => (
                  <motion.button
                    key={urgency.id}
                    onClick={() => setFormData({ ...formData, urgency: urgency.id })}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      variant="interactive"
                      padding="compact"
                      className={formData.urgency === urgency.id ? "border-primary ring-2 ring-primary/20" : ""}
                    >
                      <div className="text-center">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2 ${
                          urgency.id === "high" ? "bg-destructive/10" :
                          urgency.id === "medium" ? "bg-warning-light" : "bg-muted"
                        }`}>
                          <AlertCircle className={`w-4 h-4 ${
                            urgency.id === "high" ? "text-destructive" :
                            urgency.id === "medium" ? "text-warning" : "text-muted-foreground"
                          }`} />
                        </div>
                        <p className="font-medium text-foreground text-sm">{urgency.label}</p>
                        <p className="text-xs text-muted-foreground">{urgency.description}</p>
                      </div>
                    </Card>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Additional Details (Optional)</label>
              <Input
                placeholder="Any specific requirements or preferences"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <Link to="/ngo">
              <Button variant="outline" size="lg">Cancel</Button>
            </Link>
            <Button 
              variant="hero" 
              size="lg"
              disabled={!formData.category || !formData.quantity}
              onClick={handleSubmit}
            >
              Post Need
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default NewNeed;
