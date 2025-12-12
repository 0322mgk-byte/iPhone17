"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface AuroraTextProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
    children: React.ReactNode;
}

export function AuroraText({ className, children, ...props }: AuroraTextProps) {
    return (
        <span
            className={cn(
                "relative inline-block bg-[linear-gradient(90deg,#FFFFFF_0%,#a87aff_25%,#e0baff_50%,#a87aff_75%,#FFFFFF_100%)] bg-clip-text text-transparent bg-[length:200%_auto] animate-aurora",
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}
