import AnimatedBackground from './animated-background';
import { ExternalLink } from 'lucide-react';
import { Link } from 'next-view-transitions'
import ThemeSwitch from './ThemeSwitch';

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
            <ThemeSwitch />

        </nav>
    );
}
