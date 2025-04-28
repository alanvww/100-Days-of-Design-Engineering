import AnimatedBackground from './animated-background';
import { ExternalLink } from 'lucide-react';
import { Link } from 'next-view-transitions';
import ThemeSwitch from './ThemeSwitch';
import FloatingMenu from './FloatMenu'; // Import the FloatingMenu
import { cn } from '@/lib/utils'; // Import cn

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
    return (
        <>
            {/* Original Navbar for medium screens and up */}
            <nav className={cn(
                "hidden md:flex px-2 md:px-8 md:mx-0 flex-row" // Hide on small, flex on medium+
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

            {/* Floating Menu for small screens */}
            <div className={cn(
                "block md:hidden" // Show on small, hide on medium+
            )}>
                <FloatingMenu align="right" />
            </div>
        </>
    );
}
