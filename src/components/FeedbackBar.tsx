"use client";

import { ThumbsUp, ThumbsDown } from "@phosphor-icons/react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useState, useEffect, useOptimistic, startTransition, useRef } from "react";
import { updateFeedbackAction } from "@/app/actions/feedback";

interface FeedbackBarProps {
	dayId: number;
	initialLikes: number;
	initialDislikes: number;
	showCounts?: boolean;
	color?: string;
	className?: string;
}

// Type for the state managed by useOptimistic
type OptimisticFeedbackState = {
	likes: number;
	dislikes: number;
	// feedbackType reflects the action being *attempted* optimistically
	feedbackType: 'like' | 'dislike' | null;
	pending: boolean;
};

// Type for the action passed to the optimistic reducer
type OptimisticAction = 'like' | 'dislike';

export default function FeedbackBar({
	dayId,
	initialLikes,
	initialDislikes,
	showCounts = true,
	color,
	className,
}: FeedbackBarProps) {
	// State for animations
	const [hearts, setHearts] = useState<{ id: string; x: number; delay: number }[]>([]);
	const dislikeControls = useAnimation();

	// Ref to track mount status for async operations
	const isMounted = useRef(true);
	useEffect(() => {
		isMounted.current = true;
		return () => { isMounted.current = false; };
	}, []);

	// State derived *solely* from localStorage on the client
	const [localFeedbackState, setLocalFeedbackState] = useState<{
		given: boolean;
		type: 'like' | 'dislike' | null;
	}>({ given: false, type: null });

	useEffect(() => {
		const storedFeedback = localStorage.getItem(`feedback-day-${dayId}`);
		if (storedFeedback === 'like' || storedFeedback === 'dislike') {
			setLocalFeedbackState({ given: true, type: storedFeedback });
		} else {
			setLocalFeedbackState({ given: false, type: null });
		}
	}, [dayId]);

	// --- Optimistic UI State ---
	// Initial state is based *only* on server props
	const [optimisticFeedback, setOptimisticFeedback] = useOptimistic<
		OptimisticFeedbackState,
		OptimisticAction
	>(
		{
			likes: initialLikes,
			dislikes: initialDislikes,
			feedbackType: null, // Optimistic action type starts as null
			pending: false,
		},
		// Reducer function: calculates the state during the optimistic update
		(currentState, actionType) => {
			// Check localStorage state *before* applying optimistic update
			// This prevents applying optimistic changes if feedback was already given
			const feedbackAlreadyGiven = localStorage.getItem(`feedback-day-${dayId}`) !== null;
			if (feedbackAlreadyGiven) {
				// If already given, just mark as pending but don't change counts/type
				return { ...currentState, pending: true };
			}

			// Apply optimistic changes
			return {
				likes: actionType === 'like' ? currentState.likes + 1 : currentState.likes,
				dislikes: actionType === 'dislike' ? currentState.dislikes + 1 : currentState.dislikes,
				feedbackType: actionType, // Set the type being attempted
				pending: true, // Mark as pending
			};
		}
	);

	// Determine if interaction should be disabled
	// Disabled if feedback was *already* given (from localStorage) OR if an optimistic update is pending
	const interactionDisabled = localFeedbackState.given || optimisticFeedback.pending;

	// Determine the *displayed* feedback type for styling icons/text
	// If an optimistic update is pending, show that type.
	// Otherwise, show the type confirmed by localStorage.
	const displayedFeedbackType = optimisticFeedback.pending
		? optimisticFeedback.feedbackType
		: localFeedbackState.type;

	// Style for buttons
	const buttonStyle = color ? {
		color: color,
		borderColor: color,
		borderWidth: '1px',
	} as React.CSSProperties : {};

	// Common handler logic
	const handleFeedback = async (type: 'like' | 'dislike') => {
		if (interactionDisabled) return;

		// 1. Update localStorage immediately
		localStorage.setItem(`feedback-day-${dayId}`, type);
		// 2. Update local client state to reflect localStorage change
		setLocalFeedbackState({ given: true, type: type });

		// 3. Start optimistic update
		startTransition(() => {
			setOptimisticFeedback(type);
		});

		// 4. Trigger animations
		if (type === 'like') {
			const newHearts = Array.from({ length: 20 }, (_, i) => ({
				id: `heart-${Date.now()}-${i}`, x: Math.random() * 30 - 15, delay: i * 0.18
			}));
			setHearts(currentHearts => [...currentHearts, ...newHearts]);
			setTimeout(() => {
				if (isMounted.current) {
					setHearts(currentHearts => currentHearts.filter(heart => !newHearts.find(h => h.id === heart.id)));
				}
			}, 2000);
		} else {
			await dislikeControls.start({
				x: [0, -5, 5, -5, 5, 0],
				transition: { duration: 0.4, ease: "easeInOut" }
			});
		}

		// 5. Call server action
		try {
			await updateFeedbackAction({ dayId, type: type });
			// Success! Optimistic state is committed automatically.
			// Revalidation should update parent if necessary.
		} catch (error) {
			console.error(`Failed to update feedback (${type}):`, error);
			// Revert localStorage and local state on error
			localStorage.removeItem(`feedback-day-${dayId}`);
			if (isMounted.current) {
				setLocalFeedbackState({ given: false, type: null });
				// Optimistic state reverts automatically on error.
			}
		}
	};

	return (
		<div className={`flex flex-col items-center justify-center mb-8 ${className}`}>
			<div className="flex flex-row max-w-full space-x-1 text-center justify-center items-center relative">
				{/* Like Button */}
				<motion.div
					className={`h-18 min-w-36 ${interactionDisabled ? 'bg-gray-200 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800/20 '} rounded-l-full shadow flex justify-center items-center gap-2 px-4 ${interactionDisabled ? 'cursor-default opacity-70' : 'cursor-pointer'} ${!interactionDisabled ? 'border-2' : ''} ${optimisticFeedback.pending ? 'opacity-50' : ''}`}
					style={!interactionDisabled ? buttonStyle : {}}
					whileHover={!interactionDisabled ? { scale: 1.05 } : {}}
					whileTap={!interactionDisabled ? { scale: 0.95 } : {}}
					onClick={() => handleFeedback('like')}
					aria-disabled={interactionDisabled}
				>
					<div className="flex items-center">
						<ThumbsUp
							size={32}
							weight={displayedFeedbackType === 'like' ? 'fill' : 'duotone'}
							color={interactionDisabled ? (displayedFeedbackType === 'like' ? '#3B82F6' : '#9CA3AF') : `${color}`}
						/>
					</div>
					<div className={`${displayedFeedbackType === 'like' ? 'text-[#3B82F6]' : displayedFeedbackType === 'dislike' ? 'text-[#9CA3AF]' : ''} text-lg`}>
						{optimisticFeedback.likes}
					</div>
					<AnimatePresence>
						{hearts.map(heart => (
							<motion.div
								key={heart.id}
								initial={{ y: 0, opacity: 0, scale: 0.5 }}
								animate={{ y: -150, opacity: [0, 1, 0], scale: [0.5, 1.2, 1], x: heart.x }}
								exit={{ opacity: 0 }}
								transition={{ duration: 2.5, delay: heart.delay, ease: "easeOut" }}
								className="absolute pointer-events-none"
							>
								❤️
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>

				{/* Dislike Button */}
				<motion.div
					className={`h-18 min-w-36 ${interactionDisabled ? 'bg-gray-200 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800/20 '} rounded-r-full shadow flex justify-center items-center gap-2 px-4 ${interactionDisabled ? 'cursor-default opacity-70' : 'cursor-pointer'} ${!interactionDisabled ? 'border-2' : ''} ${optimisticFeedback.pending ? 'opacity-50' : ''}`}
					style={!interactionDisabled ? buttonStyle : {}}
					whileHover={!interactionDisabled ? { scale: 1.05 } : {}}
					whileTap={!interactionDisabled ? { scale: 0.95 } : {}}
					onClick={() => handleFeedback('dislike')}
					animate={dislikeControls}
					aria-disabled={interactionDisabled}
				>
					<div className="flex items-center">
						<ThumbsDown
							size={32}
							weight={displayedFeedbackType === 'dislike' ? 'fill' : 'duotone'}
							color={interactionDisabled ? (displayedFeedbackType === 'dislike' ? '#A61228' : '#9CA3AF') : `${color}`}
						/>
					</div>
					<div className={`${displayedFeedbackType === 'dislike' ? 'text-[#A61228]' : displayedFeedbackType === 'like' ? 'text-[#9CA3AF]' : ''} text-lg`}>
						{optimisticFeedback.dislikes}
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
					<div className="flex flex-col items-center">
						<div className="flex space-x-2 items-center">
							<span className="text-xs text-gray-400 dark:text-gray-500">
								{optimisticFeedback.likes + optimisticFeedback.dislikes} total feedback
							</span>
							{(optimisticFeedback.likes + optimisticFeedback.dislikes > 0) && (
								<div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
									<div
										className="h-full bg-blue-500 dark:bg-blue-600 rounded-full"
										style={{
											width: `${(optimisticFeedback.likes / (optimisticFeedback.likes + optimisticFeedback.dislikes || 1)) * 100}%`, // Avoid division by zero
											transition: 'width 0.3s ease-in-out'
										}}
									></div>
								</div>
							)}
						</div>
					</div>
				</motion.div>
			)}
		</div>
	);
}
