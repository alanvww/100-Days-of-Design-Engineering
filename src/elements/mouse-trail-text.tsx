"use client"; // Essential for client-side hooks and event handlers

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, MotionValue } from "motion/react";
import { cn } from "@/lib/utils"; // Adjust path if necessary

// --- Configuration ---
const NUM_TRAIL_DOTS = 15;
const DEFAULT_TRAIL_SIZE = 10; // px
const DEFAULT_TRAIL_COLOR = "bg-blue-500"; // Example Tailwind color
const SPRING_CONFIG_MAIN = { damping: 20, stiffness: 300, mass: 0.5 };
const SPRING_CONFIG_CURSOR = { damping: 15, stiffness: 300, mass: 0.1 };

// --- Helper Component: TrailDot ---
interface TrailDotProps {
    index: number;
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
    size: number;
    color: string;
    numDots: number;
}

function TrailDot({ index, mouseX, mouseY, size, color, numDots }: TrailDotProps) {
    // Progressively smaller and fainter dots
    const scale = Math.max(0, 1 - index / numDots);
    const opacity = Math.max(0.1, 1 - index / (numDots * 1.1)); // Keep slight opacity

    // Vary spring slightly for a more organic feel (optional)
    const damping = SPRING_CONFIG_MAIN.damping + index * 1;
    const stiffness = SPRING_CONFIG_MAIN.stiffness + index * 5;
    const mass = SPRING_CONFIG_MAIN.mass + index * 0.01;

    return (
        <motion.div
            className={cn(
                "absolute top-0 left-0 rounded-full pointer-events-none", // Ensure dots don't block mouse events
                color
            )}
            style={{
                width: size,
                height: size,
                translateX: mouseX, // Directly use the spring-animated values
                translateY: mouseY,
                scale: scale,
                opacity: opacity,
                // No explicit z-index needed if rendered before the text
            }}
            transition={{ type: "spring", damping, stiffness, mass }}
        />
    );
}

// --- Main Component: MouseTrailText ---
interface MouseTrailTextProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    trailSize?: number;
    trailColor?: string; // Pass Tailwind background class, e.g., "bg-red-500"
    numDots?: number;
    // Add specific Framer Motion spring options if needed
}

export function MouseTrailText({
    children,
    className,
    trailSize = DEFAULT_TRAIL_SIZE,
    trailColor = DEFAULT_TRAIL_COLOR,
    numDots = NUM_TRAIL_DOTS,
    ...props
}: MouseTrailTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Raw mouse position within the container
    const rawMouseX = useMotionValue(0);
    const rawMouseY = useMotionValue(0);

    // Spring-animated values for the trail dots
    const trailMouseX = useSpring(rawMouseX, SPRING_CONFIG_MAIN);
    const trailMouseY = useSpring(rawMouseY, SPRING_CONFIG_MAIN);

    // Spring-animated values for the custom cursor (slightly faster/different feel)
    const cursorMouseX = useSpring(rawMouseX, SPRING_CONFIG_CURSOR);
    const cursorMouseY = useSpring(rawMouseY, SPRING_CONFIG_CURSOR);


    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        // Update MotionValues with position relative to the container
        rawMouseX.set(e.clientX - rect.left - trailSize / 2); // Center dot on cursor
        rawMouseY.set(e.clientY - rect.top - trailSize / 2);
    };

    const handleMouseLeave = () => {
        // Optional: Could animate mouse values back to a default position,
        // but letting the spring settle naturally often looks good.
        // rawMouseX.set(0); // Example: move to top-left on leave
        // rawMouseY.set(0);
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative overflow-hidden cursor-none", // Hide default cursor
                className
            )}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {/* Render Trail Dots Behind Text */}
            {Array.from({ length: numDots }).map((_, i) => (
                <TrailDot
                    key={i}
                    index={i}
                    mouseX={trailMouseX}
                    mouseY={trailMouseY}
                    size={trailSize}
                    color={trailColor}
                    numDots={numDots}
                />
            ))}

            {/* Foreground Text with Blend Mode */}
            {/* Ensure text color contrasts with trail for the effect (e.g., white) */}
            <div className="relative z-10 text-white mix-blend-difference pointer-events-none">
                {/* pointer-events-none is crucial so text doesn't block mousemove */}
                {children}
            </div>

            {/* Custom Cursor Element (Optional but recommended) */}
            {/* Positioned above the text (z-20) */}
            <motion.div
                className={cn(
                    `absolute top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-20`,
                    trailColor
                )}
                style={{
                    translateX: cursorMouseX,
                    translateY: cursorMouseY,
                }}
            />
        </div>
    );
}