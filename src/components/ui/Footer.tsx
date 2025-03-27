import { GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { InfiniteSlider } from './infinite-slider';

export function Footer() {
    return (
        <footer>
            <hr className="border-gray-200 dark:border-gray-800"></hr>
            <div className='mx-auto flex max-w-7xl flex-col justify-center px-6 pb-4 pt-12 md:flex-row md:justify-between md:px-8'>
                <p className='text-sm text-zinc-500 dark:text-zinc-200'>
                    Made with ❤️ by <a href='https://alan.ooo' className='underline hover:text-zinc-800 dark:hover:text-zinc-300'>Alan Ren</a> © {new Date().getFullYear()}
                </p>
                <div className='order-first mb-4 flex items-center gap-x-6 md:order-none md:mb-0'>
                    <a
                        href='https://github.com/alanvww'
                        className='fill-zinc-500 hover:fill-zinc-900 dark:fill-zinc-400 dark:hover:fill-zinc-100'
                    >
                        <GithubLogo size={28} />
                    </a>
                </div>
            </div>
            <div className='overflow-hidden'>
                <InfiniteSlider
                    className='select-none -mb-14 text-9xl leading-[100%] text-black dark:text-white sm:text-[12rem]'
                    gap={80}
                >
                    <div>100 Days of Design Engineering</div>
                </InfiniteSlider>
            </div>
        </footer>
    );
}
