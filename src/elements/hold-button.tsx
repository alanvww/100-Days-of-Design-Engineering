'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HoldButtonProps {
    /** Function to call when hold completes */
    onComplete: () => void;
    /** Button text or content */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
    /** Hold duration in seconds (default: 3) */
    duration?: number;
    /** Button background color */
    bgColor?: string;
    /** Text color */
    textColor?: string;
    /** Overlay color with opacity */
    overlayColor?: string;
    /** Button width */
    width?: string;
    /** Button height */
    height?: string;
    /** Disabled state */
    disabled?: boolean;
}

const HoldButton = ({
    onComplete,
    children,
    className = '',
    duration = 3,
    bgColor = 'bg-blue-500',
    textColor = 'text-white',
    overlayColor = 'bg-black/50',
    width = 'w-auto',
    height = 'h-12',
    disabled = false,
}: HoldButtonProps) => {
    const [isHolding, setIsHolding] = useState(false);
    const [progress, setProgress] = useState(0);
    const animationRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    // Clean up animation frame on unmount
    useEffect(() => {
        return () => {
            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    const resetState = () => {
        setIsHolding(false);
        setProgress(0);
        startTimeRef.current = null;

        if (animationRef.current !== null) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
    };

    const animate = () => {
        if (!startTimeRef.current) return;

        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        const newProgress = Math.min(elapsed / duration, 1);
        setProgress(newProgress);

        if (newProgress < 1) {
            animationRef.current = requestAnimationFrame(animate);
        } else {
            onComplete();
            resetState();
        }
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        if (disabled) return;

        e.preventDefault();
        setIsHolding(true);
        startTimeRef.current = Date.now();
        animationRef.current = requestAnimationFrame(animate);
    };

    const handlePointerUp = () => {
        resetState();
    };

    const handlePointerLeave = () => {
        resetState();
    };

    return (
        <motion.button
            className={`
        relative overflow-hidden rounded-full 
        ${bgColor} ${textColor} ${width} ${height} 
        select-none touch-none 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
            whileHover={disabled ? {} : { scale: 1.05 }}
            whileTap={disabled ? {} : { scale: 0.95 }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerLeave}
            onPointerCancel={handlePointerUp}
            disabled={disabled}
        >
            {/* Progress overlay with transparency */}
            {isHolding && (
                <motion.div
                    className={`absolute top-0 left-0 h-full ${overlayColor}`}
                    style={{ width: `${progress * 100}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                />
            )}
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
};

export default HoldButton;