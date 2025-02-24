'use client';

import React, { useRef, useEffect, useState, CSSProperties } from 'react';

interface ContainedBlurTextEffectProps {
    /**
     * Height of the container
     * @default "500px"
     */
    height?: string;

    /**
     * Width of the container
     * @default "100%"
     */
    width?: string;

    /**
     * Initial blur amount in pixels
     * @default 8
     */
    initialBlur?: number;

    /**
     * Final blur amount in pixels
     * @default 0
     */
    finalBlur?: number;

    /**
     * The scroll percentage at which the blur effect completes
     * @default 0.5
     */
    scrollThreshold?: number;

    /**
     * The heading text to display
     * @default "Scroll Within Container"
     */
    headingText?: string;

    /**
     * The body text to display
     * @default "This text transforms from blurry to clear as you scroll..."
     */
    bodyText?: string;

    /**
     * Background color classes (Tailwind)
     * @default "from-blue-950 to-black"
     */
    backgroundGradient?: string;

    /**
     * Show scroll indicator
     * @default true
     */
    showScrollIndicator?: boolean;
}

/**
 * A container component that applies a blur effect to text which clears as the user
 * scrolls within the container.
 */
export default function BlurText({
    height = "500px",
    width = "100%",
    initialBlur = 8,
    finalBlur = 0,
    scrollThreshold = 0.5,
    headingText = "Scroll Within Container",
    bodyText = "This text transforms from blurry to clear as you scroll within this fixed-height container.",
    backgroundGradient = "from-blue-950 to-black",
    showScrollIndicator = true
}: ContainedBlurTextEffectProps) {
    // References and state
    const containerRef = useRef<HTMLDivElement>(null);
    const [blurAmount, setBlurAmount] = useState<number>(initialBlur);
    const [indicatorOpacity, setIndicatorOpacity] = useState<number>(1);

    // Setup scroll event handler
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = (): void => {
            if (!container) return;

            // Calculate scroll percentage within the container
            const scrollableHeight = container.scrollHeight - container.clientHeight;
            const scrollPercentage = scrollableHeight > 0
                ? container.scrollTop / scrollableHeight
                : 0;

            // Progress within the threshold range (0 to 1)
            const progress = Math.min(1, scrollPercentage / scrollThreshold);

            // Calculate blur based on progress
            const newBlurAmount = initialBlur - progress * (initialBlur - finalBlur);
            setBlurAmount(Math.max(finalBlur, newBlurAmount));

            // Update indicator opacity
            if (showScrollIndicator) {
                setIndicatorOpacity(Math.max(0, 1 - progress * 2));
            }
        };

        // Add scroll event listener
        container.addEventListener('scroll', handleScroll);

        // Initial calculation
        handleScroll();

        // Cleanup
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [initialBlur, finalBlur, scrollThreshold, showScrollIndicator]);

    // Styles
    const blurStyle: CSSProperties = {
        filter: `blur(${blurAmount}px)`,
        transition: "filter 0.05s ease-out"
    };

    return (
        <div className="relative overflow-hidden">
            {/* Scrollable container */}
            <div
                ref={containerRef}
                className="relative overflow-auto"
                style={{
                    height,
                    width,
                    WebkitOverflowScrolling: 'touch' // For iOS support
                }}
            >
                {/* Content container */}
                <div className={`min-h-[200%] bg-gradient-to-b ${backgroundGradient}`}>
                    {/* Sticky text container */}
                    <div
                        className="sticky top-0 flex flex-col items-center justify-center"
                        style={{ height }}
                    >
                        <div className="max-w-xl px-6 py-8 text-center">
                            <h1
                                className="text-4xl md:text-5xl font-bold mb-4 text-white"
                                style={blurStyle}
                            >
                                {headingText}
                            </h1>

                            <p
                                className="text-lg md:text-xl text-white/90"
                                style={blurStyle}
                            >
                                {bodyText}
                            </p>
                        </div>
                    </div>

                    {/* Additional content to ensure scrollability */}
                    <div className="h-[100%] flex items-center justify-center">
                        <p className="text-white/30 text-center px-4">
                            Continue scrolling for maximum clarity...
                        </p>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            {showScrollIndicator && (
                <div
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center pointer-events-none"
                    style={{ opacity: indicatorOpacity }}
                >
                    <span className="text-sm mb-1">Scroll down</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-bounce"
                    >
                        <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                </div>
            )}
        </div>
    );
}