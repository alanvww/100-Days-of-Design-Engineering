"use client";

import { ThumbsUp, ThumbsDown } from "@phosphor-icons/react";
import { motion, useAnimation, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface FeedbackBarProps {
    dayId: number;
    showCounts?: boolean;
    color?: string;
    className?: string;
}

export default function FeedbackBar({ dayId, showCounts = true, color, className }: FeedbackBarProps) {
    // State for animations and local feedback status
    const [hearts, setHearts] = useState<{ id: string; x: number; delay: number }[]>([]);
    const [feedbackGiven, setFeedbackGiven] = useState(false);
    const [feedbackType, setFeedbackType] = useState<string | null>(null);
    const dislikeControls = useAnimation();

    // State for feedback counts
    const [likesCount, setLikesCount] = useState(0);
    const [dislikesCount, setDislikesCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Style for buttons based on the provided color
    const buttonStyle = color ? {
        color: color,
        borderColor: color,
        borderWidth: '1px',
    } as React.CSSProperties : {};

    // Check if user has already provided feedback for this day
    useEffect(() => {
        const checkPreviousFeedback = () => {
            const storedFeedback = localStorage.getItem(`feedback-day-${dayId}`);
            if (storedFeedback) {
                setFeedbackGiven(true);
                setFeedbackType(storedFeedback);
            }
        };

        const fetchFeedbackCounts = async () => {
            try {
                const response = await fetch(`/api/feedback/${dayId}`);
                if (!response.ok) {
                    throw new Error(`Error fetching feedback: ${response.status}`);
                }

                const data = await response.json();

                if (data) {
                    setLikesCount(data.likes || 0);
                    setDislikesCount(data.dislikes || 0);
                }
            } catch (error) {
                console.error('Failed to fetch feedback counts:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkPreviousFeedback();
        fetchFeedbackCounts();
    }, [dayId]);

    // Function to update feedback through API
    const updateFeedback = async (type: 'like' | 'dislike') => {
        try {
            const response = await fetch('/api/feedback/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dayId, type }),
            });

            if (!response.ok) {
                throw new Error(`Error updating feedback: ${response.status}`);
            }

            const data = await response.json();

            // Update local state with the response from the server
            setLikesCount(data.likes);
            setDislikesCount(data.dislikes);

            // Store the feedback type in localStorage to prevent duplicate submissions
            localStorage.setItem(`feedback-day-${dayId}`, type);
        } catch (error) {
            console.error('Failed to update feedback:', error);
        }
    };

    // Function to handle like button click
    const handleLike = () => {
        if (feedbackGiven) return;

        // Set feedback as given and record type
        setFeedbackGiven(true);
        setFeedbackType('like');

        // Update feedback through API
        updateFeedback('like');

        // Create hearts animation
        const newHearts = Array.from({ length: 20 }, (_, i) => ({
            id: `heart-${Date.now()}-${i}`,
            x: Math.random() * 30 - 15, // Random horizontal offset
            delay: i * 0.18 // Staggered delay
        }));

        setHearts([...hearts, ...newHearts]);

        // Remove hearts after animation completes
        setTimeout(() => {
            setHearts(hearts => hearts.filter(heart => !newHearts.find(h => h.id === heart.id)));
        }, 2000);
    };

    // Function to handle dislike button click
    const handleDislike = async () => {
        if (feedbackGiven) return;

        // Set feedback as given and record type
        setFeedbackGiven(true);
        setFeedbackType('dislike');

        // Update feedback through API
        updateFeedback('dislike');

        // Animate the dislike button (shake effect)
        await dislikeControls.start({
            x: [0, -5, 5, -5, 5, 0],
            transition: { duration: 0.4, ease: "easeInOut" }
        });
    };

    return (
        <div className={`flex flex-col items-center justify-center mb-8 ${className}`}>
            <div className="flex flex-row max-w-full space-x-1 text-center justify-center items-center relative">
                <motion.div 
                    className={`h-18 min-w-36 ${feedbackGiven ? 'bg-gray-200 dark:bg-gray-800/50 dark:hover:bg-gray-500/30' : 'bg-white dark:bg-gray-800/20 '} rounded-l-full shadow flex justify-center items-center gap-2 px-4 ${feedbackGiven ? 'cursor-default' : 'cursor-pointer'} ${!feedbackGiven && !feedbackType ? 'border-2' : ''}`}
                    style={!feedbackGiven && !feedbackType ? buttonStyle : {}}
                    whileHover={!feedbackGiven ? { scale: 1.05 } : {}}
                    whileTap={!feedbackGiven ? { scale: 0.95 } : {}}
                    onClick={!feedbackGiven ? handleLike : undefined}
                >
                    <div className="flex items-center">
                        <ThumbsUp
                            size={32}
                            weight={feedbackType === 'like' ? 'fill' : 'duotone'}
                            color={feedbackGiven ? (feedbackType === 'like' ? '#3B82F6' : '#9CA3AF') : `${color}`}
                        />
                    </div>

                    <div className={`${feedbackType === 'like' ? 'text-[#3B82F6]' : feedbackType === 'dislike' ? 'text-[#9CA3AF]' : ''} text-lg`}>
                        {isLoading ? "..." : likesCount}
                    </div>

                    {/* Hearts animation container */}
                    <AnimatePresence>
                        {hearts.map(heart => (
                            <motion.div
                                key={heart.id}
                                initial={{ y: 0, opacity: 0, scale: 0.5 }}
                                animate={{
                                    y: -150,
                                    opacity: [0, 1, 0],
                                    scale: [0.5, 1.2, 1],
                                    x: heart.x
                                }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 2.5,
                                    delay: heart.delay,
                                    ease: "easeOut"
                                }}
                                className="absolute pointer-events-none"
                            >
                                ❤️
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <motion.div
                    className={`h-18 min-w-36 ${feedbackGiven ?  'bg-gray-200 dark:bg-gray-800/50 dark:hover:bg-gray-500/30' : 'bg-white dark:bg-gray-800/20 '} rounded-r-full shadow flex justify-center items-center gap-2 px-4 ${feedbackGiven ? 'cursor-default' : 'cursor-pointer'} ${!feedbackGiven && !feedbackType ? 'border-2' : ''}`}
                    style={!feedbackGiven && !feedbackType ? buttonStyle : {}}
                    whileHover={!feedbackGiven ? { scale: 1.05 } : {}}
                    whileTap={!feedbackGiven ? { scale: 0.95 } : {}}
                    onClick={!feedbackGiven ? handleDislike : undefined}
                    animate={dislikeControls}
                >
                    <div className="flex items-center">
                        <ThumbsDown
                            size={32}
                            weight={feedbackType === 'dislike' ? 'fill' : 'duotone'}
                            color={feedbackGiven ? (feedbackType === 'dislike' ? '#A61228' : '#9CA3AF') : `${color}`}
                        />
                    </div>

                    <div className={`${feedbackType === 'dislike' ? 'text-[#A61228]' : feedbackType === 'like' ? 'text-[#9CA3AF]' : ''} text-lg`}>
                        {isLoading ? "..." : dislikesCount}
                    </div>
                </motion.div>
            </div>

            {/* Show details if requested */}
            {showCounts && (
                <motion.div
                    className="flex justify-center mt-2 text-sm text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {isLoading ? (
                        <span>Loading feedback...</span>
                    ) : (
                        <div className="flex flex-col items-center">
                            <div className="flex space-x-2 items-center">
                                <span className="text-xs text-gray-400 dark:text-gray-500">
                                    {likesCount + dislikesCount} total feedback
                                </span>
                                {(likesCount + dislikesCount > 0) && (
                                    <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 dark:bg-blue-600 rounded-full"
                                            style={{
                                                width: `${(likesCount / (likesCount + dislikesCount)) * 100}%`,
                                                transition: 'width 0.3s ease-in-out'
                                            }}
                                        ></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
}
