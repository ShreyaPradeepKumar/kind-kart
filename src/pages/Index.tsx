import { motion, type Easing } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Users, Building2, ArrowRight, Leaf, Package, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/hero-illustration.jpg";

const easeOut: Easing = [0.4, 0, 0.2, 1];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: easeOut },
  }),
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-display text-foreground">GiveGood</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link to="/auth">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button variant="default" size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-20 right-0 w-1/2 h-full opacity-10">
          <div className="w-96 h-96 rounded-full bg-primary blur-3xl" />
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="max-w-xl"
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              custom={0}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light text-primary text-sm font-medium mb-6">
                <Heart className="w-4 h-4" />
                Making kindness simple
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display text-foreground leading-tight mb-6">
                Give what you can.
                <span className="block text-primary">Get what you need.</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                A simple platform that quietly connects people who want to give with organizations that truly need — one donation at a time.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/auth?mode=signup">
                  <Button variant="hero" size="lg">
                    Start Donating
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/auth?mode=signup&role=ngo">
                  <Button variant="heroOutline" size="lg">
                    Register as NGO
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-elevated">
                <img
                  src={heroImage}
                  alt="Community sharing food and essentials"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
              </div>
              {/* Floating stats card */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-elevated p-5 border border-border"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-success-light flex items-center justify-center">
                    <Package className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-display text-foreground">2,450+</p>
                    <p className="text-sm text-muted-foreground">Donations matched</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            custom={0}
          >
            <h2 className="text-3xl sm:text-4xl font-display text-foreground mb-4">
              How it works
            </h2>
            <p className="text-muted-foreground text-lg">
              Three simple roles, one seamless experience. Choose how you want to make a difference.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "For Donors",
                description: "Donate food or essential items. See exactly what NGOs need. Schedule pickups or drop-offs with ease.",
                color: "primary",
                link: "/auth?mode=signup&role=donor",
              },
              {
                icon: Users,
                title: "For NGOs",
                description: "Post your needs clearly. Receive matching donations directly. Mark items as received and track impact.",
                color: "secondary",
                link: "/auth?mode=signup&role=ngo",
              },
              {
                icon: Building2,
                title: "For Restaurants",
                description: "Upload surplus food quickly. Connect with nearby NGOs. Reduce waste and do good effortlessly.",
                color: "accent",
                link: "/auth?mode=signup&role=restaurant",
              },
            ].map((role, index) => (
              <motion.div
                key={role.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariants}
                custom={index * 0.1}
              >
                <Card
                  variant={role.color === "primary" ? "featured" : role.color === "secondary" ? "warm" : "accent"}
                  className="h-full"
                >
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                      role.color === "primary" ? "bg-primary-light" :
                      role.color === "secondary" ? "bg-secondary-light" : "bg-accent-light"
                    }`}>
                      <role.icon className={`w-7 h-7 ${
                        role.color === "primary" ? "text-primary" :
                        role.color === "secondary" ? "text-secondary" : "text-accent"
                      }`} />
                    </div>
                    <CardTitle className="text-2xl">{role.title}</CardTitle>
                    <CardDescription className="text-base">{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to={role.link}>
                      <Button
                        variant={role.color === "primary" ? "default" : role.color === "secondary" ? "warm" : "accent"}
                        className="w-full"
                      >
                        Get Started
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              custom={0}
            >
              <h2 className="text-3xl sm:text-4xl font-display text-foreground mb-6">
                Built on trust. Designed for simplicity.
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                We believe giving should feel good, not complicated. Our platform removes friction so you can focus on what matters — helping others.
              </p>
              <div className="space-y-6">
                {[
                  {
                    icon: Clock,
                    title: "Real-time matching",
                    description: "Donations are matched to NGO needs instantly based on location and item type.",
                  },
                  {
                    icon: Package,
                    title: "End-to-end tracking",
                    description: "See your donation journey from submission to delivery completion.",
                  },
                  {
                    icon: Heart,
                    title: "Human-centered design",
                    description: "Every interaction is designed to be warm, clear, and reassuring.",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="flex gap-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUpVariants}
                    custom={index * 0.1}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card variant="elevated" padding="spacious" className="relative z-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-success-light flex items-center justify-center">
                      <span className="text-success text-xl">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Fresh vegetables donated</p>
                      <p className="text-sm text-muted-foreground">10 kg → Hope Foundation</p>
                    </div>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-warning-light flex items-center justify-center">
                      <span className="text-warning text-xl">⏳</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Bread pickup scheduled</p>
                      <p className="text-sm text-muted-foreground">Today, 4:00 PM</p>
                    </div>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
                      <span className="text-primary text-xl">🍎</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">New NGO request</p>
                      <p className="text-sm text-muted-foreground">50 meals needed by Friday</p>
                    </div>
                  </div>
                </div>
              </Card>
              <div className="absolute top-8 -right-8 w-full h-full rounded-2xl bg-primary/5 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            custom={0}
          >
            <h2 className="text-3xl sm:text-4xl font-display text-foreground mb-4">
              Ready to make a difference?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of donors, NGOs, and restaurants already using GiveGood to reduce waste and feed communities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/auth?mode=signup">
                <Button variant="hero" size="xl">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-display text-foreground">GiveGood</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 GiveGood. Making kindness simple, one donation at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
