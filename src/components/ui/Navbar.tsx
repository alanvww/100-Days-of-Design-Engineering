import AnimatedBackground from './animated-background';
import { ExternalLink } from 'lucide-react';
import { Link } from 'next-view-transitions'
import { Sun, Moon } from '@phosphor-icons/react/dist/ssr';

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
        <nav className=" px-2 md:px-8 md:mx-0 flex flex-row">
            <div className="w-full max-w-fit rounded-xl border border-zinc-200 p-1 dark:border-zinc-800">
                <div className="flex overflow-x-auto">
                    <AnimatedBackground
                        defaultValue={NAVIGATION_ITEMS[0].id}
                        className="whitespace-nowrap rounded-lg bg-zinc-100 dark:bg-zinc-800"
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
                                >
                                    <button
                                        type="button"
                                        className="group px-3 py-2 text-xs md:text-base text-zinc-600 transition-colors duration-300 hover:text-zinc-950 data-[checked=true]:text-black dark:text-zinc-400 dark:hover:text-zinc-50 dark:data-[checked=true]:text-white cursor-pointer"
                                    >
                                        {label}
                                        {isExternal && (
                                            <ExternalLink
                                                className="min-[365px]:inline-block hidden align-baseline mx-0.5 pt-0.5 md:mx-1 h-3 w-3 "
                                                strokeWidth={2}
                                            />)}
                                    </button>
                                </Link>
                            );
                        })}
                    </AnimatedBackground>


                </div>
            </div>
            <div className="hidden md:flex ml-auto w-full max-w-fit rounded-xl border border-zinc-200 p-1 dark:border-zinc-800 cursor-not-allowed ">
                <button
                    key='theme-toggle'
                    data-id="theme-toggle"
                    type="button"
                    className="cursor-not-allowed align-middle justify-center m-auto px-3 py-2 rounded-lg text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-300"
                    aria-label="Toggle theme"
                >
                    <div className="hidden dark:flex items-center gap-1.5">
                        <Sun size={32} className="h-4 w-4 md:h-5 md:w-5" weight="fill" />
                        <span className="text-xs md:text-sm">Light</span>
                    </div>
                    <div className="flex dark:hidden items-center gap-1.5">
                        <Moon size={32} className="h-4 w-4 md:h-5 md:w-5" weight="fill" />
                        <span className="text-xs md:text-sm">Dark</span>
                    </div>
                </button>
            </div>
        </nav>
    );
}
