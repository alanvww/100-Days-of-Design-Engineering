'use client';
import { cn } from '@/lib/utils';
import { AnimatePresence, Transition, motion } from 'motion/react';
import { usePathname } from 'next/navigation'; // Import usePathname
import {
  Children,
  cloneElement,
  ReactElement,
  useEffect,
  useState,
  useId,
  useMemo, // Import useMemo
} from 'react';

export type AnimatedBackgroundProps = {
  children:
  | ReactElement<{ 'data-id': string; href?: string }>[] // Add href to child props type
  | ReactElement<{ 'data-id': string; href?: string }>;
  // defaultValue?: string; // Remove defaultValue
  onValueChange?: (newActiveId: string | null) => void;
  className?: string;
  transition?: Transition;
  enableHover?: boolean;
};

export default function AnimatedBackground({
  children,
  // defaultValue, // Remove defaultValue
  onValueChange,
  className,
  transition,
  enableHover = false,
}: AnimatedBackgroundProps) {
  const pathname = usePathname(); // Get current pathname
  const uniqueId = useId();

  // Determine the ID corresponding to the current path
  const activePathId = useMemo(() => {
    let currentId: string | null = null;
    Children.forEach(children, (child) => {
      if (child.props.href === pathname) {
        currentId = child.props['data-id'];
      }
    });
    return currentId;
  }, [pathname, children]);

  // State for visual highlight (includes hover)
  const [visualActiveId, setVisualActiveId] = useState<string | null>(activePathId);

  // Update visual state when path changes
  useEffect(() => {
    setVisualActiveId(activePathId);
  }, [activePathId]);


  const handleInteractionStart = (id: string | null) => {
    if (enableHover) {
      setVisualActiveId(id); // Set visual highlight on hover/focus
    } else {
      // If not hover-enabled, click sets the persistent state (though path change handles this now)
      // We might not need onValueChange anymore unless used elsewhere
      if (onValueChange) {
        onValueChange(id);
      }
    }
  };

  const handleInteractionEnd = () => {
    if (enableHover) {
      setVisualActiveId(activePathId); // Revert to path-based active ID on leave/blur
    }
  };


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Children.map(children, (child: any, index) => {
    const id = child.props['data-id'];

    const interactionProps = enableHover
      ? {
        onMouseEnter: () => handleInteractionStart(id),
        onMouseLeave: handleInteractionEnd,
        onFocus: () => handleInteractionStart(id), // Add focus for accessibility
        onBlur: handleInteractionEnd, // Add blur for accessibility
      }
      : {
        // Click is handled by the Link component itself for navigation
        // We rely on pathname change to update the active state
      };

    return cloneElement(
      child,
      {
        key: index,
        className: cn('relative inline-flex', child.props.className),
        // Use activePathId for the persistent data attribute
        'data-checked': activePathId === id ? 'true' : 'false',
        ...interactionProps,
      },
      <>
        <AnimatePresence initial={false}>
          {/* Use visualActiveId for the motion div */}
          {visualActiveId === id && (
            <motion.div
              layoutId={`background-${uniqueId}`}
              className={cn('absolute inset-0', className)}
              transition={transition}
              initial={{ opacity: 0 }} // Start transparent
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            />
          )}
        </AnimatePresence>
        {/* Ensure content is above the background */}
        <div className='relative z-10'>{child.props.children}</div>
      </>
    );
  });
}
