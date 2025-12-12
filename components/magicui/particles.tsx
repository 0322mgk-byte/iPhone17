"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ParticlesProps {
    className?: string;
    quantity?: number;
    staticity?: number;
    ease?: number;
    size?: number;
    refresh?: boolean;
    color?: string;
    vx?: number;
    vy?: number;
}

function hexToRgb(hex: string): number[] {
    hex = hex.replace(/^#/, "");
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}

export const Particles: React.FC<ParticlesProps> = ({
    className = "",
    quantity = 30,
    staticity = 50,
    ease = 50,
    size = 0.4,
    refresh = false,
    color = "#ffffff",
    vx = 0,
    vy = 0,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasSize, setCanvasSize] = useState<{ w: number; h: number }>({
        w: 0,
        h: 0,
    });
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [circles, setCircles] = useState<any[]>([]);
    const canvasContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            setContext(canvasRef.current.getContext("2d"));
        }
    }, []);

    useEffect(() => {
        initCanvas();
        animate();

        const observer = new ResizeObserver(() => {
            initCanvas();
        });

        if (canvasContainerRef.current) {
            observer.observe(canvasContainerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [color]);

    useEffect(() => {
        onMouseMove();
    }, [context]);

    useEffect(() => {
        initCanvas();
    }, [refresh]);

    const initCanvas = () => {
        resizeCanvas();
        drawParticles();
    };

    const onMouseMove = () => {
        if (canvasRef.current) {
            canvasRef.current.addEventListener("mousemove", (e) => {
                // Optional interaction
            });
        }
    };

    const resizeCanvas = () => {
        if (canvasContainerRef.current && canvasRef.current && context) {
            circles.length = 0;
            canvasSize.w = canvasContainerRef.current.offsetWidth;
            canvasSize.h = canvasContainerRef.current.offsetHeight;
            canvasRef.current.width = canvasSize.w * window.devicePixelRatio;
            canvasRef.current.height = canvasSize.h * window.devicePixelRatio;
            context.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
    };

    const circleParams = (): any => {
        const x = Math.floor(Math.random() * canvasSize.w);
        const y = Math.floor(Math.random() * canvasSize.h);
        const translateX = 0;
        const translateY = 0;
        const pSize = Math.floor(Math.random() * 2) + size;
        const alpha = 0;
        const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
        const dx = (Math.random() - 0.5) * 0.1;
        const dy = (Math.random() - 0.5) * 0.1;
        const magnetism = 0.1 + Math.random() * 4;
        return {
            x,
            y,
            translateX,
            translateY,
            size: pSize,
            alpha,
            targetAlpha,
            dx,
            dy,
            magnetism,
        };
    };

    const drawCircle = (circle: any, update = false) => {
        if (context) {
            const { x, y, translateX, translateY, size, alpha } = circle;
            context.translate(translateX, translateY);
            context.beginPath();
            context.arc(x, y, size, 0, 2 * Math.PI);
            context.fillStyle = `rgba(${hexToRgb(color).join(", ")}, ${alpha})`;
            context.fill();
            context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

            if (!update) {
                circles.push(circle);
            }
        }
    };

    const clearContext = () => {
        if (context) {
            context.clearRect(0, 0, canvasSize.w, canvasSize.h);
        }
    };

    const drawParticles = () => {
        clearContext();
        for (let i = 0; i < quantity; i++) {
            const circle = circleParams();
            drawCircle(circle);
        }
    };

    const remapValue = (
        value: number,
        start1: number,
        end1: number,
        start2: number,
        end2: number
    ): number => {
        return start2 + ((end2 - start2) * (value - start1)) / (end1 - start1);
    };

    const animate = () => {
        clearContext();
        circles.forEach((circle: any, i: number) => {
            // Handle the alpha value
            const edge = [
                circle.x + circle.translateX - circle.size, // distance from left edge
                canvasSize.w - circle.x - circle.translateX - circle.size, // distance from right edge
                circle.y + circle.translateY - circle.size, // distance from top edge
                canvasSize.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
            ];
            const closestEdge = edge.reduce((a, b) => Math.min(a, b));
            const remapClosestEdge = parseFloat(
                remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
            );
            if (remapClosestEdge > 1) {
                circle.alpha += 0.02;
                if (circle.alpha > circle.targetAlpha) {
                    circle.alpha = circle.targetAlpha;
                }
            } else {
                circle.alpha = circle.targetAlpha * remapClosestEdge;
            }

            const speed = 0.05; // Fixed slow speed
            circle.translateX += circle.dx + vx;
            circle.translateY += circle.dy + vy;
            circle.x += (Math.random() - 0.5) * speed;
            circle.y += (Math.random() - 0.5) * speed;

            if (
                circle.x < -circle.size ||
                circle.x > canvasSize.w + circle.size ||
                circle.y < -circle.size ||
                circle.y > canvasSize.h + circle.size
            ) {
                // remove the circle from the array
                circles.splice(i, 1);
                // create a new circle
                const newCircle = circleParams();
                drawCircle(newCircle);
                // update the circle position
            } else {
                drawCircle(
                    {
                        ...circle,
                        x: circle.x,
                        y: circle.y,
                        translateX: circle.translateX,
                        translateY: circle.translateY,
                        alpha: circle.alpha,
                    },
                    true
                );
            }
        });
        window.requestAnimationFrame(animate);
    };

    return (
        <div className={className} ref={canvasContainerRef} aria-hidden="true">
            <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
        </div>
    );
};
