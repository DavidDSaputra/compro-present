"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="flex items-start gap-2">
                <input
                    type="checkbox"
                    className={cn(
                        "h-4 w-4 rounded border-[#E2E8F0] text-[#1E40AF] focus:ring-[#1E40AF] focus:ring-2 focus:ring-offset-2 cursor-pointer",
                        error && "border-red-500",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {label && (
                    <label className="text-sm text-[#475569] cursor-pointer leading-tight">
                        {label}
                    </label>
                )}
                {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
        );
    }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
