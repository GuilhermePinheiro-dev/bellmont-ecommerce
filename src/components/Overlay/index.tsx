import type React from "react";

interface OverlayProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  className?: string;
}

export const Overlay = ({ children, title, subtitle, className }: OverlayProps) => {
  return (
    <div className={`absolute w-full flex items-center font-title ${className}`}>
      <div>
        <h2 className="text-xl mb-2">{title}</h2>
        <h1 className="text-4xl mb-8">{subtitle}</h1>

        <div className="flex gap-4 justify-center">{children}</div>
      </div>
    </div>
  );
};

// 