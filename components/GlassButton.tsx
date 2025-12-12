"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
}

export function GlassButton({
    children,
    className,
    glowColor = "rgba(255, 255, 255, 0.5)",
    ...props
}: GlassButtonProps) {
    return (
        <button
            className={cn(
                "group relative flex items-center justify-center rounded-full px-8 py-3 font-medium transition-all duration-300",
                // Glassmorphism Base
                "bg-white/10 backdrop-blur-md border border-white/20",
                // Text Color
                "text-white",
                // Hover Effects
                "hover:bg-white/20 hover:scale-105 hover:border-white/40",
                // Active/Click
                "active:scale-95",
                className
            )}
            style={{
                boxShadow: `0 0 20px -5px ${glowColor}`,
            }}
            {...props}
        >
            <span className="relative z-10">{children}</span>

            {/* Inner Glow (Optional Subtle Gradient) */}
            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Outer Glow Hover boost */}
            <div
                className="absolute inset-0 -z-20 rounded-full blur-xl transition-opacity duration-300 opacity-30 group-hover:opacity-60"
                style={{ background: glowColor }}
            />
        </button>
    );
}
