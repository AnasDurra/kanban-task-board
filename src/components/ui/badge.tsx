import type React from "react";
import { cn } from "lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "destructive";
  className?: string;
  style?: React.CSSProperties;
}

export function Badge({
  children,
  variant = "default",
  className,
  style,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full transition-colors",
        {
          "bg-primary text-white": variant === "default",
          "bg-secondary text-foreground": variant === "secondary",
          "border border-input text-foreground": variant === "outline",
          "bg-destructive text-white": variant === "destructive",
        },
        className
      )}
      style={style}
    >
      {children}
    </span>
  );
}
