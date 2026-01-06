import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const baseStyles =
            "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

        const variants = {
            primary:
                "bg-[#1E40AF] text-white hover:bg-[#1e3a8a] focus:ring-[#1E40AF] shadow-sm",
            secondary:
                "bg-[#2563EB] text-white hover:bg-[#1d4ed8] focus:ring-[#2563EB] shadow-sm",
            outline:
                "border-2 border-[#1E40AF] text-[#1E40AF] hover:bg-[#DBEAFE] focus:ring-[#1E40AF]",
            ghost:
                "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A] focus:ring-[#E2E8F0]",
        };

        const sizes = {
            sm: "px-3 py-1.5 text-sm",
            md: "px-4 py-2 text-sm",
            lg: "px-6 py-3 text-base",
        };

        return (
            <button
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                ref={ref}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button };
