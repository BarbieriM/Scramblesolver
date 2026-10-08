import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark" | "ghost" | "danger";
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary: `
      border
      border-gold-light
      bg-gold
      text-cream-light
      shadow-gold-button
      hover:bg-gold-hover
    `,

    secondary: `
      border
      border-umber
      bg-bark
      text-ochre
      hover:bg-bark-hover
    `,

    dark: `
      border
      border-rust
      bg-night
      text-gold-light
      shadow-card-dark
      hover:bg-night-hover
    `,

    danger: `
      border
      border-danger-light
      bg-danger
      text-cream-light
      shadow-card-dark
      hover:bg-danger-hover
    `,

    ghost: `
      bg-transparent
      text-gold
      hover:bg-bark
    `,
  };

  return (
    <button
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        px-5
        py-3
        font-bold
        transition-all
        duration-150
        cursor-pointer
        disabled:cursor-not-allowed
        disabled:opacity-40
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}