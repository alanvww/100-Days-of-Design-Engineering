'use client';

import { cn } from '@/lib/utils';
import { useMotionValue, animate, motion } from 'motion/react';
import { useState, useEffect } from 'react';
import useMeasure from 'react-use-measure';

export type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

export function ReactMarquee({
  children,
  gap = 16,
  duration = 25,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let controls;
    const size = direction === 'horizontal' ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    if (!isPaused) {
      // Get current position
      const currentPosition = translation.get();
      
      // Calculate remaining distance and duration
      const remainingDistance = Math.abs(to - currentPosition);
      const fullDistance = Math.abs(to - from);
      const remainingDuration = (remainingDistance / fullDistance) * duration;

      controls = animate(translation, to, {
        ease: 'linear',
        duration: remainingDuration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return () => controls?.stop();
  }, [
    translation,
    duration,
    width,
    height,
    gap,
    direction,
    reverse,
    isPaused,
  ]);

  const hoverProps = {
    onHoverStart: () => setIsPaused(true),
    onHoverEnd: () => setIsPaused(false),
  };

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className="flex w-max"
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}