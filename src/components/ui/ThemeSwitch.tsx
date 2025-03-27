'use client'
import { useState, useEffect } from 'react'
import type { NextPage } from "next";
import { useTheme } from 'next-themes'
import { Sun, Moon } from '@phosphor-icons/react/dist/ssr';


const ThemeSwitch: NextPage = () => {
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme, setTheme } = useTheme()

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div className="hidden md:flex ml-auto w-full max-w-fit rounded-xl border border-border p-1 bg-white dark:bg-gray-800 dark:border-gray-700">
            <button
                key='theme-toggle'
                data-id="theme-toggle"
                type="button"
                className="cursor-pointer align-middle justify-center m-auto px-3 py-2 rounded-lg 
                text-muted-foreground hover:text-foreground hover:bg-muted dark:text-white dark:hover:text-foreground dark:hover:bg-muted/80 transition-colors duration-300"
                aria-label="Toggle theme"
                onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}

            >
                <div className={resolvedTheme === "light" ? "hidden" : "flex items-center gap-1.5"}>
                    <Sun size={32} className="h-4 w-4 md:h-5 md:w-5" weight="fill" />
                    <span className="text-xs md:text-sm">Light</span>
                </div>
                <div className={resolvedTheme === "light" ? "flex items-center gap-1.5" : "hidden"}>
                    <Moon size={32} className="h-4 w-4 md:h-5 md:w-5" weight="fill" />
                    <span className="text-xs md:text-sm">Dark</span>
                </div>
            </button>
        </div>
    )
}

export default ThemeSwitch
