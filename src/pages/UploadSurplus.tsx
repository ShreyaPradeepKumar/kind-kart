import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, ArrowLeft, Clock, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const foodCategories = [
  { id: "prepared", label: "Prepared Meals", icon: "🍲" },
  { id: "bread", label: "Bread & Bakery", icon: "🍞" },
  { id: "vegetables", label: "Fresh Vegetables", icon: "🥬" },
  { id: "fruits", label: "Fresh Fruits", icon: "🍎" },
  { id: "dairy", label: "Dairy Products", icon: "🧀" },
  { id: "beverages", label: "Beverages", icon: "🥤" },
  { id: "desserts", label: "Desserts", icon: "🍰" },
  { id: "other", label: "Other", icon: "🍽️" },
];

const expiryOptions = [
  { id: "1", label: "1 hour", urgent: true },
  { id: "2", label: "2 hours", urgent: true },
  { id: "4", label: "4 hours", urgent: false },
  { id: "6", label: "6 hours", urgent: false },
  { id: "12", label: "12 hours", urgent: false },
  { id: "24", label: "24 hours", urgent: false },
];

const UploadSurplus = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    category: "",
    quantity: "",
    expiresIn: "",
    description: "",
    pickupInstructions: "",
  });

  const handleSubmit = () => {
    toast({
      title: "Surplus food uploaded!",
      description: "Nearby NGOs have been notified.",
    });
    navigate("/restaurant");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/restaurant" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
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
            <h1 className="text-3xl font-display text-foreground mb-2">Upload Surplus Food</h1>
            <p className="text-muted-foreground">Share excess food before it goes to waste</p>
          </div>

          <div className="space-y-8">
            {/* Food Category */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">What type of food?</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {foodCategories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setFormData({ ...formData, category: category.id })}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      variant="interactive"
                      padding="compact"
                      className={formData.category === category.id ? "border-secondary ring-2 ring-secondary/20" : ""}
                    >
                      <div className="flex flex-col items-center gap-2 py-1">
                        <span className="text-2xl">{category.icon}</span>
                        <p className="font-medium text-foreground text-xs">{category.label}</p>
                      </div>
                    </Card>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Quantity</label>
              <Input
                placeholder="e.g., 25 portions, 10 kg, 30 items"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              />
            </div>

            {/* Time Sensitivity */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">
                <Clock className="w-4 h-4 inline mr-1" />
                Best consumed within
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {expiryOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => setFormData({ ...formData, expiresIn: option.id })}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      variant="interactive"
                      padding="compact"
                      className={`text-center ${formData.expiresIn === option.id ? "border-secondary ring-2 ring-secondary/20" : ""}`}
                    >
                      <p className={`font-medium text-sm ${option.urgent ? "text-destructive" : "text-foreground"}`}>
                        {option.label}
                      </p>
                    </Card>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Photo */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Add Photo (Recommended)</label>
              <Card variant="interactive" className="border-dashed cursor-pointer">
                <div className="flex flex-col items-center gap-2 py-6">
                  <Camera className="w-8 h-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload a photo of the food</p>
                  <p className="text-xs text-muted-foreground">Helps NGOs verify quality</p>
                </div>
              </Card>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Description (Optional)</label>
              <Input
                placeholder="e.g., Vegetarian curry with rice, freshly prepared"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* Pickup Instructions */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Pickup Instructions (Optional)</label>
              <Input
                placeholder="e.g., Available at back door, ask for kitchen manager"
                value={formData.pickupInstructions}
                onChange={(e) => setFormData({ ...formData, pickupInstructions: e.target.value })}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <Link to="/restaurant">
              <Button variant="outline" size="lg">Cancel</Button>
            </Link>
            <Button 
              variant="warm" 
              size="lg"
              disabled={!formData.category || !formData.quantity || !formData.expiresIn}
              onClick={handleSubmit}
            >
              Upload & Notify NGOs
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default UploadSurplus;
