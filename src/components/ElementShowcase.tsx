'use client'
import React, { JSX, useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check } from 'lucide-react';
import TextEditor from '@/elements/text-editor';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { ReactMarquee } from '@/elements/react-marquee';
import UnicornStudioWrapper from '@/elements/unicorn-studio-wrapper';
import ReactStepper from '@/elements/react-stepper';
import PanelReveal from '@/elements/panel-reveal';
import DraggableGrid from '@/elements/draggable-grid';
import ContactCard from '@/elements/contact-card';
import FeedbackBar from '@/elements/feedback-bar';
import BlurText from '@/elements/blur-text';
import GridWithPlaceholders from '@/elements/grid-with-placeholders';
import BreadcrumbShowcase from '@/elements/breadcurmb-showcase';
interface UIElement {
  name: string;
  component: JSX.Element;
  code: string;
  day: number;
}

interface ElementShowcaseProps {
  day: number;
}

const elements: UIElement[] = [
  {
    name: 'Primary Button',
    component: (
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Primary Button
      </button>
    ),
    code: `<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Primary Button
</button>`,
    day: 7
  },
  {
    name: 'Secondary Button',
    component: (
      <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
        Secondary Button
      </button>
    ),
    code: `<button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
  Secondary Button
</button>`,
    day: 7
  },
  {
    name: 'Outline Button',
    component: (
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        Outline Button
      </button>
    ),
    code: `<button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
  Outline Button
</button>`,
    day: 7
  },
  {
    name: 'Disabled Button',
    component: (
      <button className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded cursor-not-allowed" disabled>
        Disabled Button
      </button>
    ),
    code: `<button className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded cursor-not-allowed" disabled>
  Disabled Button
</button>`,
    day: 7
  },
  {
    name: 'Text Editor',
    component: (
      <TextEditor />
    ),
    code: `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function TextEditor() {
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("Untitled Document")

    // Calculate word count
    const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0

    return (
        <div className="min-h-screen bg-background p-4">
            <Card className="max-w-5xl mx-auto">
                <div className="border-b p-2 flex flex-wrap gap-2 items-center">
                    <TooltipProvider>
                        <div className="flex items-center gap-1 mr-4">
                            <Select defaultValue="normal">
                                <SelectTrigger className="w-[130px]">
                                    <SelectValue placeholder="Select font" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="normal">Normal Text</SelectItem>
                                    <SelectItem value="h1">Heading 1</SelectItem>
                                    <SelectItem value="h2">Heading 2</SelectItem>
                                    <SelectItem value="h3">Heading 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-1 border-r pr-2">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="w-8 h-8">
                                        <Bold className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Bold</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="w-8 h-8">
                                        <Italic className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Italic</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="w-8 h-8">
                                        <Underline className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Underline</TooltipContent>
                            </Tooltip>
                        </div>

                        <div className="flex items-center gap-1 border-r pr-2">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="w-8 h-8">
                                        <AlignLeft className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Align left</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="w-8 h-8">
                                        <AlignCenter className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Align center</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="w-8 h-8">
                                        <AlignRight className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Align right</TooltipContent>
                            </Tooltip>
                        </div>

                        <div className="flex items-center gap-1">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="w-8 h-8">
                                        <List className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Bullet list</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="w-8 h-8">
                                        <ListOrdered className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Numbered list</TooltipContent>
                            </Tooltip>
                        </div>
                    </TooltipProvider>
                </div>

                <CardContent className="p-0">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-8 py-4 text-2xl font-semibold bg-transparent border-none focus:outline-hidden"
                        placeholder="Document Title"
                    />

                    <div className="px-8 pb-4">
                        <div className="min-h-[calc(100vh-300px)] w-full">
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full h-full min-h-[calc(100vh-300px)] resize-none bg-transparent border-none focus:outline-hidden"
                                placeholder="Start typing..."
                            />
                        </div>
                    </div>
                </CardContent>

                <div className="border-t p-2 text-sm text-muted-foreground">
                    {wordCount} {wordCount === 1 ? "word" : "words"}
                </div>
            </Card>
        </div>
    )
}

`,
    day: 8
  },
  {
    name: 'React Marquee',
    component: (
      <ReactMarquee className='text-6xl text-yellow-300'>Sample Content Hover to Stop </ReactMarquee>
    ),
    code: `'use client';

import { cn } from '@/lib/utils';
import { useMotionValue, animate, motion, AnimationPlaybackControls } from 'motion/react';
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
    let controls: AnimationPlaybackControls;
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
          gap: \`\${gap}px\`,
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
}`,
    day: 13
  },
  {
    name: 'Liquid Background',
    component: (
      <UnicornStudioWrapper link='https://unicorn.studio/embed/TgBHx1wChujEYosGQB9T' />
    ),
    code: ``,
    day: 14
  },
  {
    name: 'Hologram Maze',
    component: (
      <UnicornStudioWrapper link='https://unicorn.studio/embed/hLbQnQvUF2Bw1kf3TyUl' />

    ),
    code: ``,
    day: 16
  },
  {
    name: 'Glyph Dither Spiral',
    component: (
      <UnicornStudioWrapper link='https://unicorn.studio/embed/uNJXDVOH11hlwxFNGqoT' />
    ),
    code: ``,
    day: 17
  },
  {
    name: 'Stepper',
    component: (
      <ReactStepper />
    ),
    code: `
// stepper.tsx
"use client";

import { cn } from "@/lib/utils";
import { Circle, CircleDashed, SpinnerGap } from '@phosphor-icons/react'
import * as React from "react";
import { createContext, useContext } from "react";

// Types
type StepperContextValue = {
  activeStep: number;
  setActiveStep: (step: number) => void;
  orientation: "horizontal" | "vertical";
};

type StepItemContextValue = {
  step: number;
  state: StepState;
  isDisabled: boolean;
  isLoading: boolean;
};

type StepState = "active" | "completed" | "inactive" | "loading";

// Contexts
const StepperContext = createContext<StepperContextValue | undefined>(undefined);
const StepItemContext = createContext<StepItemContextValue | undefined>(undefined);

const useStepper = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used within a Stepper");
  }
  return context;
};

const useStepItem = () => {
  const context = useContext(StepItemContext);
  if (!context) {
    throw new Error("useStepItem must be used within a StepperItem");
  }
  return context;
};

// Components
interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  orientation?: "horizontal" | "vertical";
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    { defaultValue = 0, value, onValueChange, orientation = "horizontal", className, ...props },
    ref,
  ) => {
    const [activeStep, setInternalStep] = React.useState(defaultValue);

    const setActiveStep = React.useCallback(
      (step: number) => {
        if (value === undefined) {
          setInternalStep(step);
        }
        onValueChange?.(step);
      },
      [value, onValueChange],
    );

    const currentStep = value ?? activeStep;

    return (
      <StepperContext.Provider
        value={{
          activeStep: currentStep,
          setActiveStep,
          orientation,
        }}
      >
        <div
          ref={ref}
          className={cn(
            "group/stepper inline-flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
            className,
          )}
          data-orientation={orientation}
          {...props}
        />
      </StepperContext.Provider>
    );
  },
);
Stepper.displayName = "Stepper";

// StepperItem
interface StepperItemProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
  completed?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const StepperItem = React.forwardRef<HTMLDivElement, StepperItemProps>(
  (
    { step, completed = false, disabled = false, loading = false, className, children, ...props },
    ref,
  ) => {
    const { activeStep } = useStepper();

    const state: StepState =
      completed || step < activeStep ? "completed" : activeStep === step ? "active" : "inactive";

    const isLoading = loading && step === activeStep;

    return (
      <StepItemContext.Provider value={{ step, state, isDisabled: disabled, isLoading }}>
        <div
          ref={ref}
          className={cn(
            "group/step flex items-center group-data-[orientation=horizontal]/stepper:flex-row group-data-[orientation=vertical]/stepper:flex-col",
            className,
          )}
          data-state={state}
          {...(isLoading ? { "data-loading": true } : {})}
          {...props}
        >
          {children}
        </div>
      </StepItemContext.Provider>
    );
  },
);
StepperItem.displayName = "StepperItem";

// StepperTrigger
interface StepperTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const StepperTrigger = React.forwardRef<HTMLButtonElement, StepperTriggerProps>(
  ({ asChild = false, className, children, ...props }, ref) => {
    const { setActiveStep } = useStepper();
    const { step, isDisabled } = useStepItem();

    if (asChild) {
      return <div className={className}>{children}</div>;
    }

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center gap-3 disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        onClick={() => setActiveStep(step)}
        disabled={isDisabled}
        {...props}
      >
        {children}
      </button>
    );
  },
);
StepperTrigger.displayName = "StepperTrigger";

interface StepperIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const StepperIndicator = React.forwardRef<HTMLDivElement, StepperIndicatorProps>(
  ({ asChild = false, className, children, ...props }, ref) => {
    const { state, isLoading } = useStepItem();

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex size-6 shrink-0 items-center justify-center rounded-full",
          "before:absolute before:inset-0 before:rounded-full before:bg-linear-to-b before:from-theme-green before:to-theme-purple before:opacity-0 hover:before:opacity-20",
          className
        )}
        data-state={state}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {/* Dashed circle for inactive state */}
            <CircleDashed
              className={cn(
                "absolute text-muted-foreground transition-all",
                "group-data-[state=active]/step:scale-0 group-data-[state=active]/step:opacity-0",
                "group-data-[state=completed]/step:scale-0 group-data-[state=completed]/step:opacity-0"
              )}
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />

            {/* Filled circle for active and completed states */}
            <Circle
              className={cn(
                "absolute text-theme-green transition-all",
                "scale-0 opacity-0",
                "group-data-[state=active]/step:scale-100 group-data-[state=active]/step:opacity-100",
                "group-data-[state=completed]/step:scale-100 group-data-[state=completed]/step:opacity-100"
              )}
              size={16}
              strokeWidth={2}
              fill="currentColor"
              aria-hidden="true"
            />

            {/* Loading spinner */}
            {isLoading && (
              <SpinnerGap
                className="absolute animate-spin text-theme-green"
                size={14}
                strokeWidth={2}
                aria-hidden="true"
              />
            )}
          </>
        )}
      </div>
    );
  }
);
StepperIndicator.displayName = "StepperIndicator";

// StepperTitle
const StepperTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-sm font-medium", className)} {...props} />
  ),
);
StepperTitle.displayName = "StepperTitle";

// StepperDescription
const StepperDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
StepperDescription.displayName = "StepperDescription";

// StepperSeparator
const StepperSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "m-0.5 bg-gray-light group-data-[orientation=horizontal]/stepper:h-0.5 group-data-[orientation=vertical]/stepper:h-12 group-data-[orientation=horizontal]/stepper:w-full group-data-[orientation=vertical]/stepper:w-[1.6px] group-data-[orientation=horizontal]/stepper:flex-1 group-data-[state=completed]/step:bg-theme-green",
          className,
        )}
        {...props}
      />
    );
  },
);
StepperSeparator.displayName = "StepperSeparator";

export {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
};

/* ------------------------------------------------------------------------- */

// Example Usage
"use client";

import { Button } from "@/components/ui/button";
import {
    Stepper,
    StepperIndicator,
    StepperItem,
    StepperSeparator,
    StepperTrigger,
} from "@/components/ui/stepper";
import { Check, LoaderCircle } from "lucide-react";
import { useState } from "react";

const steps = [1, 2, 3, 4];

export default function ReactStepper() {
    const [currentStep, setCurrentStep] = useState(1);
    return (
        <div className="space-y-8 text-center">
            <Stepper value={currentStep} onValueChange={setCurrentStep} orientation="vertical">
                {steps.map((step) => (
                    <StepperItem key={step} step={step} className="not-last:flex-1">
                        <StepperTrigger asChild>
                            <StepperIndicator>
                                <span className="transition-all group-data-[loading=true]/step:scale-50 group-data-[state=completed]/step:scale-50 group-data-[loading=true]/step:opacity-0 group-data-[state=completed]/step:opacity-0">
                                    {step}
                                </span>
                                <Check
                                    className="absolute scale-50 opacity-0 transition-all group-data-[state=completed]/step:scale-100 group-data-[state=completed]/step:opacity-100"
                                    size={16}
                                    strokeWidth={2}
                                    aria-hidden="true"
                                />
                                <span className="absolute scale-50 opacity-0 transition-all group-data-[loading=true]/step:scale-100 group-data-[loading=true]/step:opacity-100">
                                    <LoaderCircle
                                        className="animate-spin"
                                        size={16}
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    />
                                </span>
                            </StepperIndicator>
                        </StepperTrigger>
                        {step < steps.length && <StepperSeparator />}
                    </StepperItem>
                ))}
            </Stepper>
            <div className="flex justify-center space-x-4">
                <Button
                    variant="outline"
                    className="w-32"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    disabled={currentStep === 1}
                >
                    Prev step
                </Button>
                <Button
                    variant="outline"
                    className="w-32"
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                    disabled={currentStep > steps.length}
                >
                    Next step
                </Button>
            </div>
        </div>
    );
}
        `,
    day: 18
  },
  {
    name: 'Noise',
    component: (
      <UnicornStudioWrapper link='https://unicorn.studio/embed/X8aeQ4jq06VrHgiSb0k8' />
    ),
    code: ``,
    day: 19
  },
  {
    name: 'Text Dissolve',
    component: (
      <UnicornStudioWrapper link='https://unicorn.studio/embed/UKHV7zJt78QVovO0SWKR' />
    ),
    code: ``,
    day: 22
  },
  {
    name: 'Panel Reveal',
    component: (
      <PanelReveal />
    ),
    code: `import React from 'react';
import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';

const PanelReveal = () => {
  return (
    // Wrapper div that acts as the hover trigger area
    <motion.div
      className="relative w-full max-w-md mx-auto h-48 cursor-pointer"
      whileHover="open"
      initial="closed"
    >
      {/* Content underneath */}
      <Card className="absolute inset-0 overflow-hidden">
        <div className="h-full w-full bg-linear-to-r from-red-500 via-yellow-500 to-purple-500">
          <div className="p-4 text-white">
            <p className="text-lg font-bold mb-2">Hidden Content</p>
            <p>Hover anywhere to reveal this message!</p>
          </div>
        </div>
      </Card>

      {/* Cover panel */}
      <motion.div
        className="absolute inset-0"
        variants={{
          open: {
            rotateZ: 20,
            y: -100,
            x: 100,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 30
            }
          },
          closed: {
            rotateZ: 0,
            y: 0,
            x: 0,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 30
            }
          }
        }}
        style={{
          transformOrigin: "top",
          transformStyle: "preserve-3d"
        }}
      >
        <Card className="w-full h-full bg-white shadow-lg">
          <div className="p-4 font-medium text-center">
            Hover to Reveal Content
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default PanelReveal;`,
    day: 23
  },
  {
    name: 'Noise Blur',
    component: (
      <UnicornStudioWrapper link='https://unicorn.studio/embed/otPVi2FyRNrmmtT8tQh9' />
    ),
    code: ``,
    day: 25
  },
  {
    name: 'Draggable Grid',
    component: (
      <DraggableGrid />
    ),
    code: `import { createSwapy } from 'swapy'
import { useEffect, useRef, useState } from 'react'
import { DotsSixVertical } from '@phosphor-icons/react'

export default function DraggableGrid() {
    const swapy = useRef<ReturnType<typeof createSwapy> | null>(null)
    const container = useRef(null)

    const [pressedStates, setPressedStates] = useState({
        elementA: false,
        elementB: false,
        elementC: false
    });

    // Handler factory function to update specific element
    const handleMouseEvents = (elementId: string) => ({
        onMouseDown: () => setPressedStates(prev => ({ ...prev, [elementId]: true })),
        onMouseUp: () => setPressedStates(prev => ({ ...prev, [elementId]: false })),
        onMouseLeave: () => setPressedStates(prev => ({ ...prev, [elementId]: false }))
    });


    useEffect(() => {
        // If container element is loaded
        if (container.current) {
            swapy.current = createSwapy(container.current, { animation: 'spring' })

            // Your event listeners
            swapy.current.onSwap((event) => {
                console.log('swap', event);
            })
        }

        return () => {
            // Destroy the swapy instance on component destroy
            swapy.current?.destroy()
        }
    }, [])

    return (
        <div className='h-fit'>
            <div ref={container} className='flex flex-col gap-4 text-white rounded-4xl transition-all duration-300 '>
                <div data-swapy-slot="a" className='w-full h-64 border rounded-4xl'>
                    <div  {...handleMouseEvents('elementA')} data-swapy-item="a" className={\`flex items-center justify-center w-full h-full bg-red-500 rounded-4xl border shadow-sm cursor-grab transition-opacity duration-300 \${pressedStates.elementA ? 'opacity-75 scale-90 cursor-grabbing' : ''}\`}>
                        <DotsSixVertical size={32} />
                        <div >A</div>
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>

                    <div data-swapy-slot="b" className='w-full h-36 border rounded-4xl'>
                        <div  {...handleMouseEvents('elementB')} data-swapy-item="b" className={\`flex items-center justify-center w-full h-full bg-blue-500 rounded-4xl border shadow-sm cursor-grab transition-opacity duration-300 \${pressedStates.elementB ? 'opacity-75 scale-90 cursor-grabbing' : ''}\`}>
                            <DotsSixVertical size={32} />
                            <div >B</div>
                        </div>
                    </div>

                    <div data-swapy-slot="c" className='w-full h-36 border rounded-4xl'>
                        <div  {...handleMouseEvents('elementC')} data-swapy-item="c" className={\`flex items-center justify-center w-full h-full bg-purple-500 rounded-4xl border shadow-sm cursor-grab transition-opacity duration-300 \${pressedStates.elementC ? 'opacity-75 scale-90 cursor-grabbing' : ''}\`}>
                            <DotsSixVertical size={32} />
                            <div >C</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}`,
    day: 26
  },
  {
    name: 'Contact Card',
    component: (
      <ContactCard />
    ),
    code: `'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { XLogo, LinkedinLogo, GithubLogo, Envelope } from '@phosphor-icons/react';

// types/index.ts

export type SocialLinks = {
    twitter?: string;
    linkedin?: string;
    github?: string;
};

export type ContactDetails = {
    education?: string;
    experience?: string;
    skills?: string;
    bio?: string;
};

export interface ContactData {
    name: string;
    title: string;
    profileImage: string;
    email?: string;
    socials?: SocialLinks;
    details?: ContactDetails;
}


interface ContactCardProps {
    name: string;
    title: string;
    profileImage: string;
    email?: string;
    socials?: SocialLinks;
    details?: ContactDetails;
}

const contactData: ContactData = {
    name: "Jane Smith",
    title: "Full Stack Developer",
    profileImage: "https://placehold.co/600x400.png", // Place your image in the public folder
    email: "jane.smith@example.com",
    socials: {
        twitter: "https://twitter.com/janesmith",
        linkedin: "https://linkedin.com/in/janesmith",
        github: "https://github.com/janesmith"
    },
    details: {
        education: "M.S. Computer Science, Stanford University",
        experience: "5+ years in web development, previously at Google and Microsoft",
        skills: "React, Next.js, TypeScript, Node.js, GraphQL, TailwindCSS",
        bio: "Full stack developer passionate about creating intuitive user experiences and scalable applications. Loves hiking and playing chess in free time."
    }
};

const secondContact: ContactData = {
    name: "John Doe",
    title: "UI/UX Designer",
    profileImage: "https://placehold.co/600x400.png",
    email: "john.doe@example.com",
    socials: {
        twitter: "https://twitter.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe"
    },
    details: {
        education: "B.A. Design, Rhode Island School of Design",
        experience: "3+ years at creative agencies, specializing in mobile interfaces",
        skills: "Figma, Adobe XD, Sketch, Prototyping, User Research",
        bio: "Designer with a focus on creating accessible and beautiful interfaces. Coffee enthusiast and amateur photographer."
    }
};

const ContactCardLayout: React.FC<ContactCardProps> = ({
    name,
    title,
    profileImage,
    email,
    socials = {},
    details = {}
}) => {
    const [isFlipped, setIsFlipped] = useState<boolean>(false);

    const toggleFlip = (): void => {
        setIsFlipped(!isFlipped);
    };

    // Animation variants
    const cardVariants = {
        front: {
            rotateY: 0,
            transition: { duration: 0.5 }
        },
        back: {
            rotateY: 180,
            transition: { duration: 0.5 }
        }
    };

    const contentVariants = {
        front: {
            opacity: 1,
            transition: { delay: 0.2, duration: 0.3 }
        },
        back: {
            opacity: 0,
            transition: { duration: 0.3 }
        }
    };

    const detailsVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            transition: { duration: 0.3 }
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    // Render social media icons
    const renderSocialIcons = () => {
        return (
            <div className="flex space-x-3 mt-3">
                {socials.twitter && (
                    <a href={socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="XLogo">
                        <XLogo className="h-5 w-5 text-gray-600 hover:text-blue-400 transition-colors" />
                    </a>
                )}
                {socials.linkedin && (
                    <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <LinkedinLogo className="h-5 w-5 text-gray-600 hover:text-blue-600 transition-colors" />
                    </a>
                )}
                {socials.github && (
                    <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <GithubLogo className="h-5 w-5 text-gray-600 hover:text-gray-900 transition-colors" />
                    </a>
                )}
                {email && (
                    <a href={\`mailto:\${email}\`} aria-label="Email">
                        <Envelope className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
                    </a>
                )}
            </div>
        );
    };

    return (
        <motion.div
            className="relative w-72 h-96 perspective-1000 cursor-pointer"
            onHoverStart={toggleFlip}
            onHoverEnd={toggleFlip}
            onClick={toggleFlip}
        >
            <motion.div
                className="w-full h-full relative preserve-3d shadow-lg rounded-2xl bg-white"
                variants={cardVariants}
                animate={isFlipped ? 'back' : 'front'}
            >
                {/* Front side */}
                <motion.div
                    className="absolute w-full h-full backface-hidden rounded-2xl p-6 flex flex-col items-center"
                    variants={contentVariants}
                    animate={isFlipped ? 'back' : 'front'}
                >
                    <div className="w-36 h-36 relative rounded-full overflow-hidden border-4 border-gray-100 shadow-sm mb-4">
                        <Image
                            src={profileImage}
                            alt={\`${`name`}'s profile\`}
                            fill
                            sizes="(max-width: 144px) 100vw, 144px"
                            className="object-cover"
                            priority
                        />
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 text-center">{name}</h2>
                    <p className="text-gray-600 text-center mt-1">{title}</p>

                    {renderSocialIcons()}

                    <div className="mt-4 w-full">
                        <motion.div
                            className="bg-gray-50 rounded-xl p-3 text-center text-sm text-gray-500"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Hover to see more details
                        </motion.div>
                    </div>
                </motion.div>

                {/* Back side */}
                <motion.div
                    className="absolute w-full h-full backface-hidden rounded-2xl p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rotateY-180 overflow-hidden"
                    variants={contentVariants}
                    animate={isFlipped ? 'front' : 'back'}
                >
                    <div className="flex flex-col h-full">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
                        <p className="text-gray-600 mb-4">{title}</p>

                        <motion.div
                            className="flex-1 overflow-y-auto"
                            variants={detailsVariants}
                            initial="hidden"
                            animate={isFlipped ? 'visible' : 'hidden'}
                        >
                            {details.education && (
                                <motion.div className="mb-4" variants={itemVariants}>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Education</h3>
                                    <p className="text-sm text-gray-600">{details.education}</p>
                                </motion.div>
                            )}

                            {details.experience && (
                                <motion.div className="mb-4" variants={itemVariants}>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Experience</h3>
                                    <p className="text-sm text-gray-600">{details.experience}</p>
                                </motion.div>
                            )}

                            {details.skills && (
                                <motion.div className="mb-4" variants={itemVariants}>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Skills</h3>
                                    <p className="text-sm text-gray-600">{details.skills}</p>
                                </motion.div>
                            )}

                            {details.bio && (
                                <motion.div variants={itemVariants}>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-1">About</h3>
                                    <p className="text-sm text-gray-600">{details.bio}</p>
                                </motion.div>
                            )}
                        </motion.div>

                        {renderSocialIcons()}
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};



export default function ContactCard() {
    return (
        <div className='flex flex-col space-x-8 space-y-3 md:flex-row justify-center m-auto my-6'>
            <ContactCardLayout {...contactData} />
            <ContactCardLayout {...secondContact} />
        </div>
    );
}

`,
    day: 27
  },
  {
    name: 'Feedback Bar',
    component: (

      <div className='flex flex-col space-y-6 justify-center items-center'> <FeedbackBar /> <FeedbackBar /></div>
    ),
    code: ``,
    day: 28
  },
  {
    name: '🧊',
    component: (
      <UnicornStudioWrapper link='https://unicorn.studio/embed/huoUU3sgKs2g6dx8GVaq' />
    ),
    code: ``,
    day: 29
  },
  {
    name: 'Blur Text',
    component: (
      <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden mb-12">
        <BlurText height="400px" width="100%" />
      </div>
    ),
    code: `'use client';
    
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
            filter: \`blur($\{blurAmount\}px)\`,
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
                    <div className={\`min-h-[200%] bg-gradient-to-b $\{backgroundGradient}\`}>
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
    }`,
    day: 30
  },
  {
    name: 'Replicate',
    component: (
      <UnicornStudioWrapper link='https://unicorn.studio/embed/libGr2biSIITFd2EKHAJ' />
    ),
    code: ``,
    day: 31
  },
  {
    name: 'Grid Layout',
    component: (
      <GridWithPlaceholders />
    ),
    code: `import Image from 'next/image';
import Link from 'next/link';
import * as motion from 'motion/react-client';

// Define a generic item type that can work for various use cases
export type GridItem = {
    id: string;
    title: string;
    slug?: string;
    image: string;
    year?: string;
    tagline?: string;
    // Add any other optional fields here as needed
};

export type GridProps = {
    items: GridItem[];
    title: string;
    baseUrl?: string;
    gridConfig?: {
        minItemWidth?: number;
        rowHeight?: number;
    };
};

export default function Grid({
    items,
    title,
    baseUrl = '/',
    gridConfig = {
        minItemWidth: 280,
        rowHeight: 280
    }
}: GridProps) {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
            },
        },
    };

    return (
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-16 py-8 sm:py-12">
            <motion.h1
                className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {title}
            </motion.h1>

            <motion.div
                className="grid grid-flow-dense gap-4"
                style={{
                    gridTemplateColumns: \`repeat(auto-fill, minmax(\${gridConfig.minItemWidth}px, 1fr))\`,
                    gridAutoRows:\`\${gridConfig.rowHeight}px\`
                }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {items.map((item, index) => {
                    // Determine if this item should be featured based on position
                    const isFeatureLarge = index % 8 === 0; // Every 8th item is large feature
                    const isFeatureMedium = index % 5 === 3; // Every 5th item (starting at 3) is medium feature
                    const isFeatureWide = index % 6 === 2; // Every 6th item (starting at 2) is wide
                    const isFeatureTall = index % 7 === 5; // Every 7th item (starting at 5) is tall

                    // Generate class based on feature type
                    let gridClass = '';

                    if (isFeatureLarge) {
                        gridClass = 'col-span-2 row-span-2';
                    } else if (isFeatureMedium) {
                        gridClass = 'col-span-2 row-span-1';
                    } else if (isFeatureWide) {
                        gridClass = 'col-span-2 row-span-1';
                    } else if (isFeatureTall) {
                        gridClass = 'col-span-1 row-span-2';
                    } else {
                        gridClass = 'col-span-1 row-span-1';
                    }

                    // On smaller screens, don't span multiple columns
                    const responsiveClass = \`\${gridClass} sm:col-span-1 md:\${gridClass}\`;

                    return (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            className={responsiveClass}
                        >
                            <Link
                                href={
                                    // item.slug ? \`\${baseUrl}/\${item.slug}\` : 
                                    '#'}
                                className="group relative block h-full overflow-hidden rounded-lg"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    priority={index < 4}
                                />

                                <motion.div
                                    className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 sm:p-6"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <h2 className="text-lg sm:text-xl font-semibold text-white mb-1">
                                        {item.title}
                                    </h2>
                                    {item.year && (
                                        <p className="text-sm text-zinc-300">
                                            {item.year}
                                        </p>
                                    )}
                                    {item.tagline && (
                                        <p className="text-sm text-zinc-400 mt-2 line-clamp-2">
                                            {item.tagline}
                                        </p>
                                    )}
                                </motion.div>
                            </Link>
                        </motion.div>
                    );
                })}
            </motion.div>
        </main>
    );
}`,
    day: 35
  },
  {
    name: 'Breadcrumb',
    component: (
      <BreadcrumbShowcase />
    ),
    code: ``,
    day: 37
  },
];

const ElementShowcase: React.FC<ElementShowcaseProps> = ({ day }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Filter elements based on the day parameter
  // const filteredElements = elements.filter(element => element.day === day);
  const filteredElements = useMemo(() =>
    elements.reduce<Record<number, UIElement[]>>((acc, element) => {
      if (!acc[element.day]) acc[element.day] = [];
      acc[element.day].push(element);
      return acc;
    }, {}),
    []);

  // If no elements found for the given day, show a message
  if (!filteredElements[day] || filteredElements[day].length === 0) {
    return (
      <></>
    );
  }

  return (
    <div className="p-4">
      {filteredElements[day].map((element, index) => (
        <div key={index} className="mb-8">
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview" className='cursor-pointer'>Preview</TabsTrigger>
              {element.code === '' ? null : <TabsTrigger value="code" className='cursor-pointer'>Code</TabsTrigger>}
            </TabsList>
            <TabsContent value="preview" className="p-4 min-h-full border rounded">
              {element.component}
            </TabsContent>
            {element.code === '' ? null :
              <TabsContent value="code" className="p-4 border rounded">
                <div className="relative">
                  <button
                    onClick={() => handleCopy(element.code, index)}
                    className="absolute right-2 top-2 z-100 p-2 rounded bg-white/60 hover:bg-gray-200/60 transition-colors"
                    aria-label="Copy code"
                  >
                    {copiedIndex === index ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                  <div className="relative z-0">
                    <CodeMirror
                      value={element.code}
                      height="100%"  // adjust height as needed
                      extensions={[javascript({ jsx: true })]}
                      readOnly={true}
                      basicSetup={{
                        lineNumbers: true,
                        highlightActiveLine: true,
                      }}
                    />
                  </div>
                </div>
              </TabsContent>}

          </Tabs>
        </div>
      ))}
    </div>
  );
};

export default ElementShowcase;