"use client"

import React from "react"
import { motion, type MotionProps } from "framer-motion"

import { cn } from "@/lib/utils"

const animationProps: MotionProps = {
    initial: { "--x": "100%", scale: 0.8 },
    animate: { "--x": "-100%", scale: 1 },
    whileTap: { scale: 0.95 },
    transition: {
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        type: "spring",
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
            type: "spring",
            stiffness: 200,
            damping: 5,
            mass: 0.5,
        },
    },
} as MotionProps

interface ShinyButtonProps
    extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>,
    MotionProps {
    children: React.ReactNode
    className?: string
}

export const ShinyButton = React.forwardRef<
    HTMLButtonElement,
    ShinyButtonProps
>(({ children, className, ...props }, ref) => {
    return (
        <motion.button
            ref={ref}
            className={cn(
                "relative cursor-pointer rounded-full border border-white/10 px-8 py-3 font-medium backdrop-blur-xl transition-all duration-300 ease-in-out hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 bg-white/5",
                className
            )}
            {...animationProps}
            {...props}
        >
            <span
                className="relative block size-full text-sm font-semibold tracking-wide text-white uppercase"
                style={{
                    maskImage:
                        "linear-gradient(-75deg,white calc(var(--x) + 20%),transparent calc(var(--x) + 30%),white calc(var(--x) + 100%))",
                }}
            >
                {children}
            </span>
            <span
                style={{
                    mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
                    WebkitMask:
                        "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
                    backgroundImage:
                        "linear-gradient(-75deg,rgba(255,255,255,0.1) calc(var(--x)+20%),rgba(255,255,255,0.5) calc(var(--x)+25%),rgba(255,255,255,0.1) calc(var(--x)+100%))",
                }}
                className="absolute inset-0 z-10 block rounded-[inherit] p-px"
            />
        </motion.button>
    )
})

ShinyButton.displayName = "ShinyButton"
