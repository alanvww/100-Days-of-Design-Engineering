'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AnimatedBackground from './animated-background';
import { List, X } from '@phosphor-icons/react';
import { ExternalLink } from 'lucide-react'; // Correct import for ExternalLink
import { Link } from 'next-view-transitions';
import ThemeSwitch from '@/components/ui/ThemeSwitch'; // Assuming ThemeSwitch is here
import { cn } from '@/lib/utils'; // Assuming utils path

// Copied from Navbar.tsx - consider refactoring into a shared location later
const NAVIGATION_ITEMS = [
    {
        id: 'home',
        label: 'Home',
        href: '/',
    },
    {
        id: 'resume',
        label: 'Resume',
        href: 'https://link.alan.ooo/resume',
    },
    {
        id: 'portfolio',
        label: 'Portfolio',
        href: 'https://alan.ooo',
    },
    {
        id: 'contact',
        label: 'Contact',
        href: 'https://socials.alan.ooo/',
    },
];

// Copied from Navbar.tsx - consider refactoring into a shared location later
const isExternalLink = (href: string) => {
    return href.startsWith('http') || href.startsWith('https') || href.startsWith('//');
};

interface FloatingMenuProps {
    align?: 'left' | 'right';
}

export default function FloatingMenu({ align = 'right' }: FloatingMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const alignmentClasses = align === 'left' ? 'left-4' : 'right-4';

    return (
        <>
            {/* Floating Action Button */}
            <motion.button
                onClick={toggleMenu}
                className={cn(
                    "fixed bottom-4 p-3 rounded-full shadow-lg z-50 transition-colors duration-300",
                    "bg-white dark:bg-gray-800", // Match Navbar background
                    "border border-border dark:border-gray-700", // Match Navbar border
                    "text-foreground dark:text-white", // Adjust text color for contrast
                    alignmentClasses
                )}
                whileHover={{ scale: 1.1 }} // Keep hover scale effect
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
                            "fixed bottom-20 mb-2 p-4 rounded-xl shadow-xl z-40 flex flex-col space-y-1",
                            "bg-white dark:bg-gray-800", // Match Navbar background
                            "border border-border dark:border-gray-700", // Match Navbar border
                            alignmentClasses
                        )}
                    >
                        {/* Navigation Links with Animated Background */}
                        <AnimatedBackground
                            // defaultValue removed - active state now determined by path
                            className="whitespace-nowrap rounded-lg bg-muted dark:bg-gray-300"
                            transition={{
                                type: 'spring',
                                bounce: 0,
                                duration: 0.3, // Slightly slower for vertical
                            }}
                            enableHover
                        >
                            {NAVIGATION_ITEMS.map(({ id, label, href }) => {
                                const isExternal = isExternalLink(href);
                                return (
                                    <Link
                                        key={id}
                                        data-id={id} // Add data-id for AnimatedBackground
                                        href={href}
                                        target={isExternal ? "_blank" : undefined}
                                        rel={isExternal ? "noopener noreferrer" : undefined}
                                        className="group flex w-full items-center justify-center cursor-pointer px-3 py-2 text-sm transition-all duration-300 text-muted-foreground hover:text-foreground data-[checked=true]:text-foreground dark:text-white dark:hover:text-foreground bg-transparent dark:data-[checked=true]:text-foreground rounded-md " // Added items-center
                                        onClick={() => setIsOpen(false)} // Close menu on link click
                                    >
                                        <button
                                            type="button"
                                            className='cursor-pointer'
                                        >
                                            {label}
                                            {isExternal && (
                                                <ExternalLink
                                                    className="inline-block ml-1 h-3 w-3 text-muted-foreground group-hover:text-foreground dark:text-white dark:group-hover:text-foreground"
                                                    strokeWidth={2}
                                                />
                                            )}
                                        </button>


                                    </Link>
                                );
                            })}
                        </AnimatedBackground>

                        {/* Theme Switch */}
                        <div className="pt-2 border-t border-border flex justify-start">
                            {/* Ensure ThemeSwitch is adapted or wrapped if needed for this layout */}
                            <ThemeSwitch />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}