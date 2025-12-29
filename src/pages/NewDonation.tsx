import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Leaf, ArrowLeft, Package, Apple, ShoppingBag, 
  Camera, MapPin, Calendar, Truck, Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

type ItemType = "food" | "essentials";
type DeliveryMethod = "pickup" | "dropoff";

const itemCategories = {
  food: [
    { id: "vegetables", label: "Fresh Vegetables", icon: "🥬" },
    { id: "fruits", label: "Fruits", icon: "🍎" },
    { id: "grains", label: "Rice & Grains", icon: "🌾" },
    { id: "bread", label: "Bread & Bakery", icon: "🍞" },
    { id: "canned", label: "Canned Food", icon: "🥫" },
    { id: "cooked", label: "Prepared Meals", icon: "🍲" },
  ],
  essentials: [
    { id: "hygiene", label: "Hygiene Products", icon: "🧴" },
    { id: "clothing", label: "Clothing", icon: "👕" },
    { id: "blankets", label: "Blankets", icon: "🛏️" },
    { id: "medicine", label: "Medicine", icon: "💊" },
    { id: "baby", label: "Baby Supplies", icon: "🍼" },
    { id: "other", label: "Other Essentials", icon: "📦" },
  ],
};

const NewDonation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: "" as ItemType,
    category: "",
    quantity: "",
    description: "",
    deliveryMethod: "" as DeliveryMethod,
    address: "",
    preferredDate: "",
    preferredTime: "",
  });

  const handleSubmit = () => {
    toast({
      title: "Donation created!",
      description: "We'll match you with an NGO shortly.",
    });
    navigate("/donor");
  };

  const totalSteps = 3;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/donor" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
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
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step {step} of {totalSteps}</span>
            <span className="text-sm font-medium text-primary">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step 1: Item Type & Category */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-display text-foreground mb-2">What are you donating?</h1>
              <p className="text-muted-foreground">Select the type and category of your donation</p>
            </div>

            {/* Item Type Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-foreground mb-3">Donation Type</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: "food", label: "Food Items", icon: Apple, description: "Fresh produce, grains, prepared meals" },
                  { id: "essentials", label: "Essential Goods", icon: ShoppingBag, description: "Hygiene, clothing, supplies" },
                ].map((type) => (
                  <motion.button
                    key={type.id}
                    onClick={() => setFormData({ ...formData, type: type.id as ItemType, category: "" })}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      variant="interactive"
                      className={formData.type === type.id ? "border-primary ring-2 ring-primary/20" : ""}
                    >
                      <div className="flex flex-col items-center text-center gap-2">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          formData.type === type.id ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}>
                          <type.icon className="w-6 h-6" />
                        </div>
                        <p className="font-medium text-foreground">{type.label}</p>
                        <p className="text-xs text-muted-foreground">{type.description}</p>
                      </div>
                    </Card>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Category Selection */}
            {formData.type && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-sm font-medium text-foreground mb-3">Select Category</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {itemCategories[formData.type].map((category) => (
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
              </motion.div>
            )}

            <div className="mt-8 flex justify-end">
              <Button 
                variant="hero" 
                size="lg"
                disabled={!formData.type || !formData.category}
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-display text-foreground mb-2">Donation Details</h1>
              <p className="text-muted-foreground">Tell us more about your donation</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Quantity</label>
                <Input
                  placeholder="e.g., 10 kg, 20 items, 5 bags"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Description (Optional)</label>
                <Input
                  placeholder="Any additional details about your donation"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Add Photo (Optional)</label>
                <Card variant="interactive" className="border-dashed cursor-pointer">
                  <div className="flex flex-col items-center gap-2 py-4">
                    <Camera className="w-8 h-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Click to upload a photo</p>
                  </div>
                </Card>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="outline" size="lg" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button 
                variant="hero" 
                size="lg"
                disabled={!formData.quantity}
                onClick={() => setStep(3)}
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Delivery */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-display text-foreground mb-2">How should we collect?</h1>
              <p className="text-muted-foreground">Choose your preferred delivery method</p>
            </div>

            <div className="space-y-6">
              {/* Delivery Method */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: "pickup", label: "Schedule Pickup", icon: Truck, description: "NGO will collect from you" },
                  { id: "dropoff", label: "Drop Off", icon: Building2, description: "You deliver to the NGO" },
                ].map((method) => (
                  <motion.button
                    key={method.id}
                    onClick={() => setFormData({ ...formData, deliveryMethod: method.id as DeliveryMethod })}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      variant="interactive"
                      className={formData.deliveryMethod === method.id ? "border-primary ring-2 ring-primary/20" : ""}
                    >
                      <div className="flex flex-col items-center text-center gap-2">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          formData.deliveryMethod === method.id ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}>
                          <method.icon className="w-6 h-6" />
                        </div>
                        <p className="font-medium text-foreground">{method.label}</p>
                        <p className="text-xs text-muted-foreground">{method.description}</p>
                      </div>
                    </Card>
                  </motion.button>
                ))}
              </div>

              {formData.deliveryMethod && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {formData.deliveryMethod === "pickup" ? "Pickup Address" : "Your Location"}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="pl-12"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Preferred Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className="pl-12"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Preferred Time</label>
                      <Input
                        type="time"
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="outline" size="lg" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button 
                variant="hero" 
                size="lg"
                disabled={!formData.deliveryMethod || !formData.address}
                onClick={handleSubmit}
              >
                Create Donation
              </Button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default NewDonation;
