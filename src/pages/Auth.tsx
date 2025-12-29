import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Users, Building2, Leaf, ArrowLeft, Mail, Lock, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type UserRole = "donor" | "ngo" | "restaurant";

const roleConfig = {
  donor: {
    icon: Heart,
    title: "Donor",
    description: "Donate food and essentials to those in need",
    color: "primary",
  },
  ngo: {
    icon: Users,
    title: "NGO",
    description: "Receive donations for your community",
    color: "secondary",
  },
  restaurant: {
    icon: Building2,
    title: "Restaurant",
    description: "Share surplus food before it goes to waste",
    color: "accent",
  },
};

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const initialRole = (searchParams.get("role") as UserRole) || "donor";
  
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [step, setStep] = useState<"role" | "form">(mode === "login" ? "form" : "role");
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    organization: "",
    location: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For now, simulate successful auth and redirect to appropriate dashboard
    toast({
      title: mode === "login" ? "Welcome back!" : "Account created!",
      description: mode === "login" 
        ? "You've successfully signed in." 
        : "Your account has been created successfully.",
    });

    // Redirect based on role
    const dashboardRoutes = {
      donor: "/donor",
      ngo: "/ngo",
      restaurant: "/restaurant",
    };
    
    navigate(dashboardRoutes[selectedRole]);
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep("form");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary/5">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-md"
          >
            <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-8">
              <Leaf className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="text-4xl font-display text-foreground mb-4">
              {mode === "login" ? "Welcome back" : "Join KindKart"}
            </h2>
            <p className="text-muted-foreground text-lg">
              {mode === "login" 
                ? "Sign in to continue making a difference in your community."
                : "Be part of a movement that connects generosity with need."}
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/10 to-transparent" />
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <AnimatePresence mode="wait">
            {mode === "signup" && step === "role" ? (
              <motion.div
                key="role-select"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-display text-foreground mb-2">
                    How would you like to help?
                  </h1>
                  <p className="text-muted-foreground">
                    Choose your role to get started
                  </p>
                </div>

                <div className="space-y-4">
                  {(Object.keys(roleConfig) as UserRole[]).map((role) => {
                    const config = roleConfig[role];
                    return (
                      <motion.button
                        key={role}
                        onClick={() => handleRoleSelect(role)}
                        className="w-full text-left"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          variant="interactive"
                          className={`${selectedRole === role ? "border-primary ring-2 ring-primary/20" : ""}`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                              config.color === "primary" ? "bg-primary-light" :
                              config.color === "secondary" ? "bg-secondary-light" : "bg-accent-light"
                            }`}>
                              <config.icon className={`w-7 h-7 ${
                                config.color === "primary" ? "text-primary" :
                                config.color === "secondary" ? "text-secondary" : "text-accent"
                              }`} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{config.title}</h3>
                              <p className="text-sm text-muted-foreground">{config.description}</p>
                            </div>
                          </div>
                        </Card>
                      </motion.button>
                    );
                  })}
                </div>

                <p className="text-center text-sm text-muted-foreground mt-8">
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      setMode("login");
                      setStep("form");
                    }}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="auth-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {mode === "signup" && (
                  <button
                    onClick={() => setStep("role")}
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors text-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Change role
                  </button>
                )}

                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    {mode === "signup" && (
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        roleConfig[selectedRole].color === "primary" ? "bg-primary-light" :
                        roleConfig[selectedRole].color === "secondary" ? "bg-secondary-light" : "bg-accent-light"
                      }`}>
                        {(() => {
                          const Icon = roleConfig[selectedRole].icon;
                          return <Icon className={`w-5 h-5 ${
                            roleConfig[selectedRole].color === "primary" ? "text-primary" :
                            roleConfig[selectedRole].color === "secondary" ? "text-secondary" : "text-accent"
                          }`} />;
                        })()}
                      </div>
                    )}
                    <h1 className="text-3xl font-display text-foreground">
                      {mode === "login" ? "Sign in" : `Sign up as ${roleConfig[selectedRole].title}`}
                    </h1>
                  </div>
                  <p className="text-muted-foreground">
                    {mode === "login" 
                      ? "Enter your credentials to access your account"
                      : "Create your account to start making a difference"}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === "signup" && (
                    <>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder={selectedRole === "donor" ? "Your name" : "Contact person name"}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="pl-12"
                          required
                        />
                      </div>
                      
                      {(selectedRole === "ngo" || selectedRole === "restaurant") && (
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            type="text"
                            placeholder={selectedRole === "ngo" ? "Organization name" : "Restaurant name"}
                            value={formData.organization}
                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                            className="pl-12"
                            required
                          />
                        </div>
                      )}

                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="Location (City)"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="pl-12"
                          required
                        />
                      </div>
                    </>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-12"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-12"
                      required
                    />
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    {mode === "login" ? "Sign In" : "Create Account"}
                  </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground mt-6">
                  {mode === "login" ? (
                    <>
                      Don't have an account?{" "}
                      <button
                        onClick={() => {
                          setMode("signup");
                          setStep("role");
                        }}
                        className="text-primary hover:underline font-medium"
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        onClick={() => {
                          setMode("login");
                          setStep("form");
                        }}
                        className="text-primary hover:underline font-medium"
                      >
                        Sign in
                      </button>
                    </>
                  )}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Auth;
