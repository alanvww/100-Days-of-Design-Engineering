import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

// Define interface for menu items
interface MenuItem {
    id: string;
    title: string;
    description: string;
    ctaText: string;
    icon: string;
    gradient: string;  // Base gradient (light mode)
    darkGradient: string; // Dark mode gradient
}

// Menu items with both dark and light theme gradient colors
const menuItems: MenuItem[] = [
    {
        id: 'live-pricing',
        title: 'Live Pricing',
        description: 'Experience truly live pricing with Fey. Unlike other tools, there are no delays—get instant, real-time quotes every time.',
        ctaText: 'Preview live pricing',
        icon: '⭕', // Placeholder for your actual icon
        gradient: 'from-purple-200 to-rose-200',
        darkGradient: 'dark:from-purple-900 dark:to-rose-900',
    },
    {
        id: 'analysis-estimates',
        title: 'Analysis estimates',
        description: 'Get accurate analysis estimates to inform your investment decisions.',
        ctaText: 'View estimates',
        icon: '🔒', // Placeholder for your actual icon
        gradient: 'from-gray-200 to-gray-300',
        darkGradient: 'dark:from-gray-800 dark:to-gray-700',
    },
    {
        id: 'company-financials',
        title: 'Company financials',
        description: 'Access detailed financial information about companies.',
        ctaText: 'Explore financials',
        icon: '📊', // Placeholder for your actual icon
        gradient: 'from-slate-200 to-slate-300',
        darkGradient: 'dark:from-slate-900 dark:to-slate-800',
    },
    {
        id: 'peer-analysis',
        title: 'Peer analysis',
        description: 'Compare companies against their peers with comprehensive analysis tools.',
        ctaText: 'Compare peers',
        icon: '📈', // Placeholder for your actual icon
        gradient: 'from-neutral-200 to-zinc-300',
        darkGradient: 'dark:from-neutral-900 dark:to-zinc-800',
    },
    {
        id: 'historical-earnings',
        title: 'Historical earnings',
        description: 'Review detailed historical earnings data for informed decisions.',
        ctaText: 'View earnings history',
        icon: '📝', // Placeholder for your actual icon
        gradient: 'from-indigo-200 to-indigo-300',
        darkGradient: 'dark:from-indigo-900 dark:to-indigo-800',
    },
    {
        id: 'insider-transactions',
        title: 'Insider transactions',
        description: 'Track insider buying and selling activity for valuable insights.',
        ctaText: 'View transactions',
        icon: '👁️', // Placeholder for your actual icon
        gradient: 'from-gray-100 to-gray-200',
        darkGradient: 'dark:from-gray-900 dark:to-gray-800',
    },
    {
        id: 'email-updates',
        title: 'Email Updates',
        description: 'Stay informed with regular email updates on your watchlist.',
        ctaText: 'Subscribe now',
        icon: '✉️', // Placeholder for your actual icon
        gradient: 'from-slate-100 to-slate-200',
        darkGradient: 'dark:from-slate-800 dark:to-slate-900',
    },
];

const VerticalMenu = ({ item, isExpanded, onHover }: {
    item: MenuItem;
    isExpanded: boolean;
    onHover: (id: string | null) => void;
}) => {
    return (
        <motion.div
            key={item.id}
            className={cn(`relative overflow-hidden rounded-lg bg-gradient-to-b  shadow-xl`, item.gradient, item.darkGradient)}
            onHoverStart={() => onHover(item.id)}
            onHoverEnd={() => onHover(null)}
            layout
            animate={{
                width: isExpanded ? '320px' : '70px',
                height: isExpanded ? '380px' : '380px',
                transition: { duration: 0.45, ease: "easeInOut" }
            }}
        >
            {/* Content Container */}
            <div className="h-full w-full p-2 flex flex-col">
                {/* Vertical Title (Always Visible) */}
                <div className={`flex flex-col items-center h-full justify-center transition-opacity ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
                    <motion.h3
                        className="text-gray-800 mx-auto my-auto  dark:text-white font-medium text-sm tracking-wider origin-left"
                        style={{ writingMode: 'vertical-lr', textOrientation: 'mixed' }}
                    >
                        {item.title}
                    </motion.h3>
                    <div className="flex items-center mt-auto  justify-self-end">
                        <span className="mr-2 opacity-80 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                    </div>

                </div>

                {/* Expanded Content */}
                <motion.div
                    className="absolute inset-0 p-6 flex flex-col justify-between"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: isExpanded ? 1 : 0,
                        transition: {
                            duration: 0.3,
                            delay: isExpanded ? 0.2 : 0,
                        }
                    }}
                >
                    {/* Header */}
                    <div className="space-y-5">
                        <h2 className="text-gray-800 dark:text-white text-xl font-semibold tracking-tight">{item.title}</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.description}</p>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto pt-6">
                        <button className="flex items-center text-gray-800 dark:text-white text-sm font-medium group hover:underline">
                            <span className="mr-2 opacity-80 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                            {item.ctaText}
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const VerticalMenuComponent = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
        const { clientX, clientY } = e;
        const moveX = (clientX - window.innerWidth / 2) / -50;
        const moveY = (clientY - window.innerHeight / 2) / -50;
        setMousePosition({ x: moveX, y: moveY });
    };

    const handleHover = (id: string | null) => {
        setExpandedId(id);
    };

    return (
        <div
            className="w-full bg-gray-100 dark:bg-black p-6 relative overflow-hidden rounded-xl transition-colors duration-500"
            onMouseMove={handleMouseMove}
        >
            {/* Wave Decoration at bottom */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-40 opacity-70 pointer-events-none"
                animate={{
                    x: mousePosition.x,
                    y: mousePosition.y
                }}
                transition={{
                    type: "spring",
                    stiffness: 75,
                    damping: 30,
                    mass: 2
                }}
            >
                <svg viewBox="0 0 1200 300" className="w-full h-full">
                    <path
                        className="fill-black/5 dark:fill-white/5"
                        d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,149.3C672,160,768,160,864,138.7C960,117,1056,75,1152,74.7C1248,75,1344,117,1392,138.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </motion.div>

            {/* Menu Cards Container */}
            <div className="flex items-center justify-center gap-3 overflow-x-auto py-4">
                {menuItems.map((item) => (
                    <VerticalMenu
                        key={item.id}
                        item={item}
                        isExpanded={expandedId === item.id}
                        onHover={handleHover}
                    />
                ))}
            </div>
        </div>
    );
};

export default VerticalMenuComponent;