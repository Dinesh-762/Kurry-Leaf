import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-soft hover:shadow-medium hover:bg-primary/90 active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: 
          "hover:bg-accent/10 hover:text-foreground",
        link: 
          "text-primary underline-offset-4 hover:underline",
        whatsapp:
          "bg-whatsapp text-whatsapp-foreground shadow-soft hover:bg-whatsapp/90 hover:shadow-medium active:scale-[0.98]",
        accent:
          "bg-accent text-accent-foreground shadow-soft hover:bg-accent/90 hover:shadow-glow-gold active:scale-[0.98]",
        elegant:
          "bg-primary text-primary-foreground tracking-elegant uppercase text-xs font-semibold shadow-medium hover:shadow-elegant hover:bg-primary/95 active:scale-[0.98]",
        "elegant-outline":
          "border border-primary-foreground/30 bg-transparent text-primary-foreground tracking-elegant uppercase text-xs font-semibold hover:bg-primary-foreground/10 hover:border-primary-foreground/50",
        "elegant-gold":
          "bg-accent text-accent-foreground tracking-elegant uppercase text-xs font-semibold shadow-medium hover:shadow-glow-gold active:scale-[0.98]",
        premium:
          "bg-foreground text-background tracking-wide uppercase text-xs font-semibold shadow-elegant hover:opacity-90 active:scale-[0.98]",
      },
      size: {
        default: "h-11 px-6 py-2.5 rounded-sm",
        sm: "h-9 px-4 text-xs rounded-sm",
        lg: "h-13 px-10 py-3.5 text-sm rounded-sm",
        xl: "h-14 px-12 py-4 text-sm rounded-sm",
        icon: "h-11 w-11 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
