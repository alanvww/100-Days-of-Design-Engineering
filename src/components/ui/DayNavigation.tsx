import { Link } from 'next-view-transitions'
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

  const buttonStyle = color ? {
    color: color,
    borderColor: color
  } as React.CSSProperties : {};

  return (
    <div className={cn('flex justify-between items-center gap-4 my-8', className)}>
      {hasPrevious ? (
        <Link href={`/days/${currentDay - 1}`} passHref>
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-background dark:bg-gray-800/50 dark:hover:bg-gray-500/30"
            style={buttonStyle}
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
            className="flex items-center gap-2 bg-background dark:bg-gray-800/50 dark:hover:bg-gray-500/30"
            style={buttonStyle}
          >
            Next Day
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      ) : null}
    </div>
  );
}
