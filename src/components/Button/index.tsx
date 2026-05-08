interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secundary";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className ="",
}: ButtonProps) => {
  const buttonStyles = {
    base: "flex justify-center items-center gap-2 text-nowrap cursor-pointer transition-colors rounded-full font-medium transition py-2.5 duration-200",
    variant: {
      primary: "bg-primary text-surface hover:bg-primary-dark",
      secundary:
        "bg-transparent border border-2 border-primary text-text hover:bg-primary hover:text-surface",
    },
    size: {
      sm: "px-5",
      md: "px-8",
      lg: "px-10",
    }
  };

  const VariantButtonStyles = `${buttonStyles.base} ${buttonStyles.variant[variant]} ${buttonStyles.size[size]} ${className}`;
  return <button className={VariantButtonStyles}>{children}</button>;
};
