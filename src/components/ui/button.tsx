import type React from "react";
import { cn } from "lib/utils";
import { forwardRef } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "px-3 py-2 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },
          {
            "bg-primary text-white hover:brightness-110 focus:ring-primary":
              variant === "primary",
            "bg-secondary text-foreground hover:brightness-95 focus:ring-secondary":
              variant === "secondary",
            "border-2 border-input bg-transparent text-foreground hover:bg-background focus:ring-primary":
              variant === "outline",
            "bg-transparent text-muted-foreground hover:bg-background focus:ring-primary":
              variant === "ghost",
            "bg-destructive text-white hover:bg-red-700 focus:ring-destructive":
              variant === "danger",
          },
          className
        )}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
