import { Link } from 'next-view-transitions';
import { Button } from './button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DayNavigationProps {
  currentDay: number;
  totalDays: number;
  color?: string;
  className?: string;
}

export function DayNavigation({
  currentDay,
  totalDays,
  color,
  className,
}: DayNavigationProps) {
  const hasPrevious = currentDay > 1;
  const hasNext = currentDay < totalDays;

  return (
    <div className={cn('flex justify-between items-center gap-4 my-8', className)}>
      {hasPrevious ? (
        <Link href={`/days/${currentDay - 1}`} passHref>
          <Button
            variant="outline"
            className={cn(
              "flex items-center gap-2 bg-background dark:bg-gray-800/50 dark:hover:bg-gray-500/30 dark:hover:text-white",
              color && "border-[var(--accent-color-light)] text-[var(--accent-color-light)] dark:border-[var(--accent-color-dark)] dark:text-[var(--accent-color-dark)]"
            )}
            style={color ? {
              '--accent-color-base': color,
              '--accent-color-light': `color-mix(in srgb, ${color} 90%, black 10%)`,
              '--accent-color-dark': `color-mix(in srgb, ${color} 85%, white 15%)`
            } as React.CSSProperties : {}}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous Day
          </Button>
        </Link>
      ) : (
        <div></div>
      )}

      {hasNext ? (
        <Link href={`/days/${currentDay + 1}`} passHref>
          <Button
            variant="outline"
            className={cn(
              "flex items-center gap-2 bg-background dark:bg-gray-800/50 dark:hover:bg-gray-500/30 dark:hover:text-white",
              color && "border-[var(--accent-color-light)] text-[var(--accent-color-light)] dark:border-[var(--accent-color-dark)] dark:text-[var(--accent-color-dark)]"
            )}
            style={color ? {
              '--accent-color-base': color,
              '--accent-color-light': `color-mix(in srgb, ${color} 90%, black 10%)`,
              '--accent-color-dark': `color-mix(in srgb, ${color} 85%, white 15%)`
            } as React.CSSProperties : {}}
          >
            Next Day
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      ) : null}
    </div>
  );
}
