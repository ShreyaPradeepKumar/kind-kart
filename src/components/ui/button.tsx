import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-card active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-soft hover:shadow-card",
        outline: "border-2 border-primary/20 bg-transparent text-foreground hover:bg-primary/5 hover:border-primary/40",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-soft hover:shadow-card",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Custom variants for the donation platform
        hero: "bg-primary text-primary-foreground hover:bg-primary-glow shadow-card hover:shadow-elevated hover:scale-[1.02] active:scale-[0.98] text-base",
        heroOutline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground active:scale-[0.98] text-base",
        warm: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-soft hover:shadow-card active:scale-[0.98]",
        success: "bg-success text-success-foreground hover:bg-success/90 shadow-soft hover:shadow-card active:scale-[0.98]",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-soft hover:shadow-card active:scale-[0.98]",
        soft: "bg-primary-light text-primary hover:bg-primary hover:text-primary-foreground shadow-soft active:scale-[0.98]",
        card: "bg-card text-card-foreground border border-border hover:border-primary/30 hover:shadow-card shadow-soft",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-10 w-10 rounded-lg",
        iconLg: "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
