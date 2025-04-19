'use client';

import React, { useState, useRef, MouseEvent } from 'react';
import { motion, Variants } from 'motion/react';

// Props interface
interface WeatherCardProps {
    temperature: number;
    condition: string;
    time: string;
    location?: string;
}

// Container variants for staggered children animation
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
            when: "beforeChildren",
        },
    },
};

// Circle variants with improved animation states
const circleVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.7,
    },
    visible: {
        opacity: 0.7,
        y: 0,
        scale: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15,
            mass: 1,
        },
    },
};

// Text container variants for staggering text animation
const textContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.4,
        },
    },
};

// Text item variants
const textItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 12,
        },
    },
};

// Circle style definition
interface CircleStyle {
    color: string;
    size: string;
    top: string;
    followFactor: number;
}

const circles: CircleStyle[] = [
    { color: 'bg-orange-300', size: 'w-56 h-56', top: 'top-0', followFactor: 0.18 },
    { color: 'bg-orange-400', size: 'w-52 h-52', top: 'top-5', followFactor: 0.30 },
    { color: 'bg-orange-500', size: 'w-48 h-48', top: 'top-10', followFactor: 0.42 },
    { color: 'bg-red-400', size: 'w-44 h-44', top: 'top-14', followFactor: 0.54 },
    { color: 'bg-pink-400', size: 'w-40 h-40', top: 'top-18', followFactor: 0.66 },
    { color: 'bg-purple-300', size: 'w-36 h-36', top: 'top-22', followFactor: 0.78 },
    { color: 'bg-purple-400', size: 'w-32 h-32', top: 'top-26', followFactor: 0.86 },
];

const WeatherCard: React.FC<WeatherCardProps> = ({
    temperature,
    condition,
    time,
    location,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // Event handlers
    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const relativeX = event.clientX - (rect.left + rect.width / 2);
        const relativeY = event.clientY - (rect.top + rect.height / 2);
        setMousePos({ x: relativeX, y: relativeY });
    };

    const handleMouseEnter = () => setIsHovering(true);

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    return (
        <div
            ref={cardRef}
            className="relative w-full max-w-sm rounded-lg border border-gray-200 bg-stone-50 p-6 shadow-md overflow-hidden cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            {/* Animation Container */}
            <motion.div
                className="relative mb-6 h-64"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                aria-hidden="true"
            >
                {circles.map((circle, index) => (
                    <motion.div
                        key={index}
                        className={`absolute left-1/2 -translate-x-1/2 rounded-full ${circle.size} ${circle.color} ${circle.top}`}
                        variants={circleVariants} // Keep variants for initial animation
                        custom={circle.followFactor}
                        initial="hidden"
                        // Animate directly with an object for smoother control
                        animate={{
                            opacity: isHovering ? 0.8 : 0.7,
                            scale: isHovering ? 1.05 : 1,
                            x: isHovering ? mousePos.x * circle.followFactor : 0,
                            y: isHovering ? mousePos.y * circle.followFactor : 0,
                        }}
                        // Apply a single transition to all animated properties
                        transition={{
                            type: 'spring',
                            stiffness: 300, // Increased for snappier feel
                            damping: 5,    // Adjusted for control
                            mass: 0.5,
                        }}
                    />
                ))}
            </motion.div>

            {/* Weather Information */}
            <motion.div
                className="relative z-10 text-center pointer-events-none"
                variants={textContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {location && (
                    <motion.p
                        className="text-base font-medium text-gray-800 mb-1"
                        variants={textItemVariants}
                    >
                        {location}
                    </motion.p>
                )}
                <motion.p
                    className="text-4xl font-semibold text-gray-900"
                    variants={textItemVariants}
                >
                    {temperature}&deg;F
                </motion.p>
                <motion.p
                    className="text-lg text-gray-600"
                    variants={textItemVariants}
                >
                    {condition}
                </motion.p>
                <motion.p
                    className="text-sm text-gray-500"
                    variants={textItemVariants}
                >
                    {time}
                </motion.p>
            </motion.div>
        </div>
    );
};

export default WeatherCard;
