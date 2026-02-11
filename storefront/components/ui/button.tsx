import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline" | "gold" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  as?: "button" | "a";
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-sage-700 text-white hover:bg-primary-700",
  outline:
    "border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-white",
  gold:
    "bg-gold-500 text-white hover:bg-gold-400",
  ghost:
    "text-primary-700 hover:text-gold-500",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3 text-sm",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  as = "button",
  href,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center font-semibold uppercase tracking-widest transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (as === "a" && href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
