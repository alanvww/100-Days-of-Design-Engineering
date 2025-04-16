"use client";
import { ThumbsUp, ThumbsDown } from "@phosphor-icons/react";
import { motion, useAnimation, AnimatePresence } from "motion/react";
import { useState } from "react";

export default function FeedbackBar() {
    const [hearts, setHearts] = useState<{ id: string; x: number; delay: number }[]>([]);
    const [feedbackGiven, setFeedbackGiven] = useState(false);
    const [feedbackType, setFeedbackType] = useState<string | null>(null); // 'like' or 'dislike'
    const dislikeControls = useAnimation();

    // Function to handle like button click
    const handleLike = () => {
        // Set feedback as given and record type
        setFeedbackGiven(true);
        setFeedbackType('like');

        // Create 8 hearts with random parameters
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
        // Set feedback as given and record type
        setFeedbackGiven(true);
        setFeedbackType('dislike');

        await dislikeControls.start({
            x: [0, -5, 5, -5, 5, 0],
            transition: { duration: 0.4, ease: "easeInOut" }
        });
    };

    return (
        <div className="flex flex-row max-w-full space-x-1 text-center justify-center items-center relative">
            <motion.div
                className={`h-18 w-28 ${feedbackGiven ? 'bg-gray-200' : 'bg-white'} rounded-l-full shadow flex justify-center items-center ${feedbackGiven ? 'cursor-default' : 'cursor-pointer'}`}
                whileHover={!feedbackGiven ? { scale: 1.05 } : {}}
                whileTap={!feedbackGiven ? { scale: 0.95 } : {}}
                onClick={!feedbackGiven ? handleLike : undefined}
            >
                <ThumbsUp
                    size={32}
                    weight={feedbackType === 'like' ? 'fill' : 'duotone'}
                    color={feedbackGiven ? (feedbackType === 'like' ? '#3B82F6' : '#9CA3AF') : '#000000'}
                />

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
                className={`h-18 w-28 ${feedbackGiven ? 'bg-gray-200' : 'bg-white'} rounded-r-full shadow flex justify-center items-center ${feedbackGiven ? 'cursor-default' : 'cursor-pointer'}`}
                whileHover={!feedbackGiven ? { scale: 1.05 } : {}}
                whileTap={!feedbackGiven ? { scale: 0.95 } : {}}
                onClick={!feedbackGiven ? handleDislike : undefined}
                animate={dislikeControls}
            >
                <ThumbsDown
                    size={32}
                    weight={feedbackType === 'dislike' ? 'fill' : 'duotone'}
                    color={feedbackGiven ? (feedbackType === 'dislike' ? '#A61228' : '#9CA3AF') : '#000000'}
                />
            </motion.div>
        </div>
    );
}