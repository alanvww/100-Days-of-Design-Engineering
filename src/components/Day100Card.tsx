'use client'

import React from 'react';
import Image from "next/image";
import { motion } from "motion/react";
import { Project } from "@/types/ProjectTypes";
import { hexToRGB, rgbDataURL } from './ProjectCard';
import Link from 'next/link';

interface Day100CardProps {
    project: Project;
    onClick: () => void;
}

export const Day100Card: React.FC<Day100CardProps> = ({ project, onClick }) => {
    const rgb = hexToRGB(project.color || '#cccccc');
    const blurDataURL = rgbDataURL(rgb.r, rgb.g, rgb.b);

    // Animation variants
    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 30,
                duration: 0.4
            }
        },
        hover: {
            scale: 1.05,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 20
            }
        }
    };

    const titleVariants = {
        rest: {
            opacity: 0,
            y: 10
        },
        hover: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.1,
                duration: 0.2
            }
        }
    };

    return (
        <Link href={'#'} onClick={onClick} className="group cursor-pointer px-2 md:px-4 min-w-full w-60 md:w-80">
            {/* Inner motion.div for animation - Matches ProjectCard */}
            <motion.div
                className="cursor-pointer px-2 md:px-4 min-w-full"
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={cardVariants} // Use same variants
                layout
            >
                <div className="relative aspect-square overflow-hidden rounded-lg">
                    {/* Use Image component like ProjectCard, but with gradient as background via className */}
                    {/* Use the specific Day 100 image */}
                    <Image
                        src="/assets/day-100/1.png" // Use the actual image path
                        alt="Day 100 Celebration" // Updated Alt text
                        width={400}
                        height={400}
                        quality={50}
                        sizes="(min-width: 640px) 400px, 100vw"
                        className="object-cover w-full h-full group-hover:scale-150 transition-transform duration-300 ease-in-out"
                        priority={true}
                        placeholder='blur'
                        blurDataURL={blurDataURL}
                    />
                    {/* Overlay motion.div - Matches ProjectCard */}
                    <motion.div
                        className="absolute inset-0"
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                    >
                        {/* Flex container - Matches ProjectCard */}
                        <div className="h-full flex flex-col justify-between">
                            {/* Day number span - Matches ProjectCard */}
                            <motion.span
                                className="m-3 text-md text-white bg-gray-900/60 dark:bg-black/60 rounded-full w-fit px-3 py-2"
                                whileHover={{ scale: 1.05 }} // Match ProjectCard
                            >
                                Day 100
                            </motion.span>
                            {/* Title area span - Matches ProjectCard */}
                            <motion.span
                                className="p-3 text-lg sm:text-xl text-gray-900 dark:text-white bg-transparent group-hover:bg-gradient-to-b from-transparent from-0% to-30% to-background/80 dark:to-gray-900/80" // Match ProjectCard gradient class
                                variants={titleVariants} // Match ProjectCard variants
                            >
                                {/* Inner span for content - Matches ProjectCard */}
                                <span className="inline-block mt-6">
                                    🎉
                                </span>
                            </motion.span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </Link>
    );
};