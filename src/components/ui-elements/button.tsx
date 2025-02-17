import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // Utility function for class merging (optional)
import type { ButtonHTMLAttributes, ReactNode } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 text-center font-medium hover:bg-opacity-90 transition focus:outline-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        green: "bg-green text-white",
        dark: "bg-dark text-white dark:bg-white/10",
        outlinePrimary:
          "border border-primary hover:bg-primary/10 text-primary",
        outlineGreen: "border border-green hover:bg-green/10 text-green",
        outlineDark:
          "border border-dark hover:bg-dark/10 text-dark dark:hover:bg-white/10 dark:border-white/25 dark:text-white",
      },
      shape: {
        default: "",
        rounded: "rounded-md",
        full: "rounded-full",
      },
      size: {
        default: "py-3.5 px-8 lg:px-10",
        small: "py-2.5 px-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      shape: "default",
      size: "default",
    },
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    label: string;
    icon?: ReactNode;
  };

export function Button({
  label,
  icon,
  variant,
  shape,
  size,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, shape, size }), className)}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
}
