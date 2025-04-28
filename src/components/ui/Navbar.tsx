'use client';

import React, { useState } from 'react'; // Import useState
import { motion, AnimatePresence } from 'motion/react'; // Import motion and AnimatePresence
import { List, X } from '@phosphor-icons/react'; // Import icons
import AnimatedBackground from './animated-background';
import { ExternalLink } from 'lucide-react';
import { Link } from 'next-view-transitions';
import ThemeSwitch from './ThemeSwitch';
// import FloatingMenu from './FloatMenu'; // Remove FloatingMenu import
import { cn } from '@/lib/utils';

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

// Function to check if a URL is external
const isExternalLink = (href: string) => {
    return href.startsWith('http') || href.startsWith('https') || href.startsWith('//');
};

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false); // State for mobile menu
    const toggleMenu = () => setIsOpen(!isOpen); // Toggle function

    // Define alignment for the floating button/menu (can be prop later if needed)
    const alignmentClasses = 'right-4';

    return (
        <>
            {/* Desktop Navbar (visible medium screens and up) */}
            <nav className={cn(
                "hidden md:flex px-2 md:px-8 md:mx-0 flex-row items-center" // Hide on small, flex on medium+
            )}>
                <div className="w-full max-w-fit rounded-xl border border-border p-1 bg-white dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300 mr-2">
                    <div className="flex overflow-x-auto">
                        <AnimatedBackground
                            // defaultValue removed - active state now determined by path
                            className="whitespace-nowrap rounded-lg bg-muted dark:bg-gray-300"
                            transition={{
                                type: 'spring',
                                bounce: 0,
                                duration: 0.2,
                            }}
                            enableHover
                        >
                            {NAVIGATION_ITEMS.map(({ id, label, href }) => {
                                const isExternal = isExternalLink(href);

                                return (
                                    <Link
                                        key={id}
                                        data-id={id}
                                        href={href}
                                        target={isExternal ? "_blank" : undefined}
                                        rel={isExternal ? "noopener noreferrer" : undefined}
                                        className="group cursor-pointer px-2 sm:px-3 py-2 text-sm md:text-base transition-all duration-300 text-muted-foreground hover:text-foreground data-[checked=true]:text-foreground dark:text-white dark:hover:text-foreground bg-transparent dark:data-[checked=true]:text-foreground"
                                    >
                                        <button
                                            type="button"
                                            className='cursor-pointer'
                                        >
                                            {label}
                                            {isExternal && (
                                                <ExternalLink
                                                    className="min-[300px]:inline-block hidden align-baseline mx-0.5 pt-0.5 md:mx-1 h-3 w-3 "
                                                    strokeWidth={2}
                                                />)}
                                        </button>
                                    </Link>
                                );
                            })}
                        </AnimatedBackground>
                    </div>
                </div>
                <ThemeSwitch />
            </nav>

            {/* --- Mobile Floating Menu Elements (visible small screens only) --- */}

            {/* Floating Action Button (Mobile) */}
            <motion.button
                onClick={toggleMenu}
                className={cn(
                    "fixed bottom-4 mb-0 p-3 rounded-full shadow-lg z-50 transition-colors duration-300 md:hidden", // Added md:hidden
                    "bg-white dark:bg-gray-800",
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

            {/* Expanded Menu (Mobile) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className={cn(
                            "fixed bottom-20 mb-2 p-4 rounded-xl shadow-xl z-40 flex flex-col space-y-1 md:hidden", // Added md:hidden
                            "bg-white dark:bg-gray-800",
                            "border border-border dark:border-gray-700",
                            alignmentClasses
                        )}
                    >
                        {/* Navigation Links with Animated Background */}
                        <AnimatedBackground
                            // defaultValue removed - active state now determined by path
                            className="whitespace-nowrap rounded-lg bg-muted dark:bg-gray-300" // Use same style as desktop for consistency? Or keep FloatMenu style? Let's keep FloatMenu style for now.
                            transition={{
                                type: 'spring',
                                bounce: 0,
                                duration: 0.3,
                            }}
                            enableHover // Keep hover effect for mobile? Maybe disable? Let's keep it for now.
                        >
                            {NAVIGATION_ITEMS.map(({ id, label, href }) => {
                                const isExternal = isExternalLink(href);
                                return (
                                    <Link
                                        key={id}
                                        data-id={id}
                                        href={href}
                                        target={isExternal ? "_blank" : undefined}
                                        rel={isExternal ? "noopener noreferrer" : undefined}
                                        className="group flex w-full items-center justify-center cursor-pointer px-3 py-2 text-sm transition-all duration-300 text-muted-foreground hover:text-foreground data-[checked=true]:text-foreground dark:text-white dark:hover:text-foreground bg-transparent dark:data-[checked=true]:text-foreground rounded-md "
                                        onClick={() => setIsOpen(false)} // Close menu on link click
                                    >
                                        <button
                                            type="button"
                                            className='cursor-pointer flex items-center' // Added flex items-center here too
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
                            <ThemeSwitch />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
