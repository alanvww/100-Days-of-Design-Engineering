'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AnimatedBackground from '@/components/ui/animated-background';
import { List, X } from '@phosphor-icons/react';
import { ExternalLink } from 'lucide-react';
import { Link } from 'next-view-transitions';
import ThemeSwitch from '@/components/ui/ThemeSwitch';
import { cn } from '@/lib/utils';

const NAVIGATION_ITEMS = [
    {
        id: 'home',
        label: 'Home',
        href: '#', // Use '#' for showcase links
    },
    {
        id: 'resume',
        label: 'Resume',
        href: '#', // Use '#' for showcase links
    },
    {
        id: 'portfolio',
        label: 'Portfolio',
        href: '#', // Use '#' for showcase links
    },
    {
        id: 'contact',
        label: 'Contact',
        href: '#', // Use '#' for showcase links
    },
];

// Keep local for showcase
const isExternalLink = (href: string) => {
    // Simplified for showcase: assume internal links start with #
    return !href.startsWith('#');
};

interface FloatingMenuProps {
    align?: 'left' | 'right';
}

export default function FloatingMenuShowcase({ align = 'right' }: FloatingMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const alignmentClasses = align === 'left' ? 'left-4' : 'right-4';

    return (
        <div className="relative m-auto h-96 w-fit rounded-md overflow-hidden bg-background p-4 dark:bg-gray-900 dark:text-white">
            <p className="text-sm text-muted-foreground mb-2">Floating Menu Showcase (Click the button)</p>
            {/* Floating Action Button */}
            <motion.button
                onClick={toggleMenu}
                className={cn(
                    "absolute bottom-4 p-3 rounded-full shadow-lg z-50 transition-colors duration-300", // Use absolute positioning within container
                    "bg-card dark:bg-gray-800", // Use card background
                    "border border-border dark:border-gray-700",
                    "text-foreground dark:text-white",
                    alignmentClasses
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isOpen ? "Close menu" : "Open menu"}
            >
                <AnimatePresence initial={false} mode="wait">
                    <motion.div
                        key={isOpen ? 'close' : 'open'}
                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isOpen ? <X size={24} /> : <List size={24} />}
                    </motion.div>
                </AnimatePresence>
            </motion.button>

            {/* Expanded Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className={cn(
                            "absolute bottom-20 mb-2 p-4 rounded-xl shadow-xl z-40 flex flex-col space-y-1", // Use absolute positioning
                            "bg-card dark:bg-gray-800", // Use card background
                            "border border-border dark:border-gray-700",
                            alignmentClasses
                        )}
                    >
                        {/* Navigation Links with Animated Background */}
                        <AnimatedBackground
                            className="whitespace-nowrap rounded-lg bg-muted/50 dark:bg-gray-700/50 p-1"
                            transition={{
                                type: 'spring',
                                bounce: 0,
                                duration: 0.3,
                            }}
                            enableHover
                        >
                            {NAVIGATION_ITEMS.map(({ id, label, href }) => {
                                const isExternal = isExternalLink(href);
                                return (
                                    <a
                                        key={id}
                                        data-id={id}
                                        href={href}
                                        target={isExternal ? "_blank" : undefined}
                                        rel={isExternal ? "noopener noreferrer" : undefined}
                                        className="group flex w-full items-center justify-center cursor-pointer px-3 py-2 text-sm transition-all duration-300 text-muted-foreground hover:text-foreground data-[checked=true]:text-foreground dark:text-white dark:hover:text-foreground bg-transparent dark:data-[checked=true]:text-foreground rounded-md"
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent navigation in showcase
                                            setIsOpen(false);
                                        }}
                                    >
                                        {label}
                                        {isExternal && (
                                            <ExternalLink
                                                className="inline-block ml-1 h-3 w-3 text-muted-foreground group-hover:text-foreground dark:text-white dark:group-hover:text-foreground"
                                                strokeWidth={2}
                                            />
                                        )}
                                    </a>
                                );
                            })}
                        </AnimatedBackground>

                        {/* Theme Switch */}
                        <div className="pt-2 border-t border-border flex justify-start pointer-events-none">
                            <ThemeSwitch />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}