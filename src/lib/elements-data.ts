export interface ElementData {
    name: string;
    code: string;
    day: number;
}

// Data extracted from src/components/Elements.tsx
// Contains only name, code, and day - no React components
const elementsData: ElementData[] = [
    {
        name: 'Primary Button',
        code: `<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Primary Button
  </button>`,
        day: 7
    },
    {
        name: 'Secondary Button',
        code: `<button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
    Secondary Button
  </button>`,
        day: 7
    },
    {
        name: 'Outline Button',
        code: `<button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
    Outline Button
  </button>`,
        day: 7
    },
    {
        name: 'Disabled Button',
        code: `<button className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded cursor-not-allowed" disabled>
    Disabled Button
  </button>`,
        day: 7
    },
    {
        name: 'Text Editor',
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
        code: ``, // Assuming no code snippet needed for UnicornStudioWrapper
        day: 14
    },
    {
        name: 'Hologram Maze',
        code: ``, // Assuming no code snippet needed for UnicornStudioWrapper
        day: 16
    },
    {
        name: 'Glyph Dither Spiral',
        code: ``, // Assuming no code snippet needed for UnicornStudioWrapper
        day: 17
    },
    {
        name: 'Stepper',
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
        code: ``, // Assuming no code snippet needed for UnicornStudioWrapper
        day: 19
    },
    {
        name: 'Text Dissolve',
        code: ``, // Assuming no code snippet needed for UnicornStudioWrapper
        day: 22
    },
    {
        name: 'Panel Reveal',
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
        code: ``, // Assuming no code snippet needed for UnicornStudioWrapper
        day: 25
    },
    {
        name: 'Draggable Grid',
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
        code: ``, // Assuming no code snippet needed for FeedbackBar component itself
        day: 28
    },
    {
        name: '🧊',
        code: ``, // Assuming no code snippet needed for UnicornStudioWrapper
        day: 29
    },
    {
        name: 'Blur Text',
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
        code: ``, // Assuming no code snippet needed for UnicornStudioWrapper
        day: 31
    },
    {
        name: 'Grid Layout',
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
        code: ``, // Assuming no code snippet needed for BreadcrumbShowcase
        day: 37
    },
    {
        name: 'CRT Screen',
        code: ``, // Assuming no code snippet needed for UnicornStudioWrapper
        day: 39
    },
    {
        name: 'Untitled #1',
        code: ``, // Assuming no code snippet needed for UnicornStudioWrapper
        day: 42
    },
    {
        name: 'Logo Light Ray',
        code: ``, // Assuming no code snippet needed for UnicornStudioWrapper
        day: 48
    },
    {
        name: 'Distortion Effect',
        code: ``, // Assuming no code snippet needed for UnicornStudioWrapper
        day: 54
    },
    {
        name: 'Glyph Ditcher Maze',
        code: ``, // Assuming no code snippet needed for UnicornStudioWrapper
        day: 56
    },
    {
        name: 'Tech Card',
        code: `import React from 'react';
  import { motion } from 'motion/react';
  import Image from 'next/image';
  import Link from 'next/link';
  
  interface TechCardProps {
      name: string;
      comment: string;
      iconUrl: string;
      link: string;
      platforms?: string[];
  }
  
  const TechCard: React.FC<TechCardProps> = ({ name, comment, iconUrl, link, platforms = [] }) => {
      return (
          <motion.section
              whileHover={{ borderColor: 'rgba(255, 255, 255, 0)' }}
              className="group border-2 item flex flex-col rounded-lg bg-gradient-to-tr from-red-500 to-purple-500 h-full w-full md:w-auto my-2 md:m-3"
          >
              <motion.span
                  className="rounded-md border-gray-border p-3 h-full bg-white"
              >
                  <section className="flex flex-row gap-2 m-2">
                      <Image
                          className="rounded-md object-contain m-2 h-12"
                          src={iconUrl}
                          width={50}
                          height={50}
                          alt={\`\${name} logo\`}
                      />
                      <Link
                          href={link}
                          className="flex flex-row justify-center"
                      >
                          <h2 className="text-xl font-bold tracking-tight lg:leading-[3.7rem] my-auto leading-tight group-hover:bg-clip-text group-hover:bg-gradient-to-tr from-red-500 to-purple-500 group-hover:text-transparent">
                              {name}
                          </h2>
                      </Link>
                  </section>
  
                  {platforms && platforms.length > 0 && (
                      <ul className="flex flex-wrap items-center gap-2 my-2 mx-4">
                          {platforms.map((platform, id) => (
                              <li
                                  key={id}
                                  className="bg-white border  border-gray-200 text-gray-500 rounded-md px-2 py-1"
                              >
                                  {platform}
                              </li>
                          ))}
                      </ul>
                  )}
  
                  <p className="pl-2 m-2 text-gray-500">{comment}</p>
              </motion.span>
          </motion.section>
      );
  };
  
  export default TechCard;`,
        day: 58
    },
    {
        name: 'Vertical Menu',
        code: `import React, { useState } from 'react';
  import { motion } from 'framer-motion';
  import { cn } from '@/lib/utils';
  
  // Define interface for menu items
  interface MenuItem {
      id: string;
      title: string;
      description: string;
      ctaText: string;
      icon: string;
      gradient: string;  // Base gradient (light mode)
      darkGradient: string; // Dark mode gradient
  }
  
  // Menu items with both dark and light theme gradient colors
  const menuItems: MenuItem[] = [
      {
          id: 'live-pricing',
          title: 'Live Pricing',
          description: 'Experience truly live pricing with Fey. Unlike other tools, there are no delays—get instant, real-time quotes every time.',
          ctaText: 'Preview live pricing',
          icon: '⭕', // Placeholder for your actual icon
          gradient: 'from-purple-200 to-rose-200',
          darkGradient: 'dark:from-purple-900 dark:to-rose-900',
      },
      {
          id: 'analysis-estimates',
          title: 'Analysis estimates',
          description: 'Get accurate analysis estimates to inform your investment decisions.',
          ctaText: 'View estimates',
          icon: '🔒', // Placeholder for your actual icon
          gradient: 'from-gray-200 to-gray-300',
          darkGradient: 'dark:from-gray-800 dark:to-gray-700',
      },
      {
          id: 'company-financials',
          title: 'Company financials',
          description: 'Access detailed financial information about companies.',
          ctaText: 'Explore financials',
          icon: '📊', // Placeholder for your actual icon
          gradient: 'from-slate-200 to-slate-300',
          darkGradient: 'dark:from-slate-900 dark:to-slate-800',
      },
      {
          id: 'peer-analysis',
          title: 'Peer analysis',
          description: 'Compare companies against their peers with comprehensive analysis tools.',
          ctaText: 'Compare peers',
          icon: '📈', // Placeholder for your actual icon
          gradient: 'from-neutral-200 to-zinc-300',
          darkGradient: 'dark:from-neutral-900 dark:to-zinc-800',
      },
      {
          id: 'historical-earnings',
          title: 'Historical earnings',
          description: 'Review detailed historical earnings data for informed decisions.',
          ctaText: 'View earnings history',
          icon: '📝', // Placeholder for your actual icon
          gradient: 'from-indigo-200 to-indigo-300',
          darkGradient: 'dark:from-indigo-900 dark:to-indigo-800',
      },
      {
          id: 'insider-transactions',
          title: 'Insider transactions',
          description: 'Track insider buying and selling activity for valuable insights.',
          ctaText: 'View transactions',
          icon: '👁️', // Placeholder for your actual icon
          gradient: 'from-gray-100 to-gray-200',
          darkGradient: 'dark:from-gray-900 dark:to-gray-800',
      },
      {
          id: 'email-updates',
          title: 'Email Updates',
          description: 'Stay informed with regular email updates on your watchlist.',
          ctaText: 'Subscribe now',
          icon: '✉️', // Placeholder for your actual icon
          gradient: 'from-slate-100 to-slate-200',
          darkGradient: 'dark:from-slate-800 dark:to-slate-900',
      },
  ];
  
  const VerticalMenu = ({ item, isExpanded, onHover }: {
      item: MenuItem;
      isExpanded: boolean;
      onHover: (id: string | null) => void;
  }) => {
      return (
          <motion.div
              key={item.id}
              className={cn(\`relative overflow-hidden rounded-lg bg-gradient-to-b  shadow-xl\`, item.gradient, item.darkGradient)}
              onHoverStart={() => onHover(item.id)}
              onHoverEnd={() => onHover(null)}
              layout
              animate={{
                  width: isExpanded ? '320px' : '70px',
                  height: isExpanded ? '380px' : '380px',
                  transition: { duration: 0.45, ease: "easeInOut" }
              }}
          >
              {/* Content Container */}
              <div className="h-full w-full p-2 flex flex-col">
                  {/* Vertical Title (Always Visible) */}
                  <div className={\`flex flex-col items-center h-full justify-center transition-opacity \${isExpanded ? 'opacity-0' : 'opacity-100'}\`}>
                      <motion.h3
                          className="text-gray-800 mx-auto my-auto  dark:text-white font-medium text-sm tracking-wider origin-left"
                          style={{ writingMode: 'vertical-lr', textOrientation: 'mixed' }}
                      >
                          {item.title}
                      </motion.h3>
                      <div className="flex items-center mt-auto  justify-self-end">
                          <span className="mr-2 opacity-80 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                      </div>
  
                  </div>
  
                  {/* Expanded Content */}
                  <motion.div
                      className="absolute inset-0 p-6 flex flex-col justify-between"
                      initial={{ opacity: 0 }}
                      animate={{
                          opacity: isExpanded ? 1 : 0,
                          transition: {
                              duration: 0.3,
                              delay: isExpanded ? 0.2 : 0,
                          }
                      }}
                  >
                      {/* Header */}
                      <div className="space-y-5">
                          <h2 className="text-gray-800 dark:text-white text-xl font-semibold tracking-tight">{item.title}</h2>
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.description}</p>
                      </div>
  
                      {/* CTA Button */}
                      <div className="mt-auto pt-6">
                          <button className="flex items-center text-gray-800 dark:text-white text-sm font-medium group hover:underline">
                              <span className="mr-2 opacity-80 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                              {item.ctaText}
                          </button>
                      </div>
                  </motion.div>
              </div>
          </motion.div>
      );
  };
  
  const VerticalMenuComponent = () => {
      const [expandedId, setExpandedId] = useState<string | null>(null);
      const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
      const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
          const { clientX, clientY } = e;
          const moveX = (clientX - window.innerWidth / 2) / -50;
          const moveY = (clientY - window.innerHeight / 2) / -50;
          setMousePosition({ x: moveX, y: moveY });
      };
  
      const handleHover = (id: string | null) => {
          setExpandedId(id);
      };
  
      return (
          <div
              className="w-full bg-gray-100 dark:bg-black p-6 relative overflow-hidden rounded-xl transition-colors duration-500"
              onMouseMove={handleMouseMove}
          >
              {/* Wave Decoration at bottom */}
              <motion.div
                  className="absolute bottom-0 left-0 right-0 h-40 opacity-70 pointer-events-none"
                  animate={{
                      x: mousePosition.x,
                      y: mousePosition.y
                  }}
                  transition={{
                      type: "spring",
                      stiffness: 75,
                      damping: 30,
                      mass: 2
                  }}
              >
                  <svg viewBox="0 0 1200 300" className="w-full h-full">
                      <path
                          className="fill-black/5 dark:fill-white/5"
                          d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,149.3C672,160,768,160,864,138.7C960,117,1056,75,1152,74.7C1248,75,1344,117,1392,138.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                      ></path>
                  </svg>
              </motion.div>
  
              {/* Menu Cards Container */}
              <div className="flex items-center justify-center gap-3 overflow-x-auto py-4">
                  {menuItems.map((item) => (
                      <VerticalMenu
                          key={item.id}
                          item={item}
                          isExpanded={expandedId === item.id}
                          onHover={handleHover}
                      />
                  ))}
              </div>
          </div>
      );
  };
  
  export default VerticalMenuComponent;`,
        day: 64
    },
    {
        name: 'Trance',
        code: ``, // Assuming no code snippet needed for UnicornStudioWrapper
        day: 68
    },
    {
        name: 'Cosmic Text',
        code: ``, // Assuming no code snippet needed for UnicornStudioWrapper
        day: 70
    },
    {
        name: 'Mouse Trail',
        code: `"use client"; // Essential for client-side hooks and event handlers
      
      import React, { useRef } from "react";
      import { motion, useMotionValue, useSpring, MotionValue } from "motion/react";
      import { cn } from "@/lib/utils"; // Adjust path if necessary
      
      // --- Configuration ---
      const NUM_TRAIL_DOTS = 15;
      const DEFAULT_TRAIL_SIZE = 10; // px
      const DEFAULT_TRAIL_COLOR = "bg-blue-500"; // Example Tailwind color
      const SPRING_CONFIG_MAIN = { damping: 20, stiffness: 300, mass: 0.5 };
      const SPRING_CONFIG_CURSOR = { damping: 15, stiffness: 300, mass: 0.1 };
      
      // --- Helper Component: TrailDot ---
      interface TrailDotProps {
          index: number;
          mouseX: MotionValue<number>;
          mouseY: MotionValue<number>;
          size: number;
          color: string;
          numDots: number;
      }
      
      function TrailDot({ index, mouseX, mouseY, size, color, numDots }: TrailDotProps) {
          // Progressively smaller and fainter dots
          const scale = Math.max(0, 1 - index / numDots);
          const opacity = Math.max(0.1, 1 - index / (numDots * 1.1)); // Keep slight opacity
      
          // Vary spring slightly for a more organic feel (optional)
          const damping = SPRING_CONFIG_MAIN.damping + index * 1;
          const stiffness = SPRING_CONFIG_MAIN.stiffness + index * 5;
          const mass = SPRING_CONFIG_MAIN.mass + index * 0.01;
      
          return (
              <motion.div
                  className={cn(
                      "absolute top-0 left-0 rounded-full pointer-events-none", // Ensure dots don't block mouse events
                      color
                  )}
                  style={{
                      width: size,
                      height: size,
                      translateX: mouseX, // Directly use the spring-animated values
                      translateY: mouseY,
                      scale: scale,
                      opacity: opacity,
                      // No explicit z-index needed if rendered before the text
                  }}
                  transition={{ type: "spring", damping, stiffness, mass }}
              />
          );
      }
      
      // --- Main Component: MouseTrailText ---
      interface MouseTrailTextProps extends React.HTMLAttributes<HTMLDivElement> {
          children: React.ReactNode;
          trailSize?: number;
          trailColor?: string; // Pass Tailwind background class, e.g., "bg-red-500"
          numDots?: number;
          // Add specific Framer Motion spring options if needed
      }
      
      export function MouseTrailText({
          children,
          className,
          trailSize = DEFAULT_TRAIL_SIZE,
          trailColor = DEFAULT_TRAIL_COLOR,
          numDots = NUM_TRAIL_DOTS,
          ...props
      }: MouseTrailTextProps) {
          const containerRef = useRef<HTMLDivElement>(null);
      
          // Raw mouse position within the container
          const rawMouseX = useMotionValue(0);
          const rawMouseY = useMotionValue(0);
      
          // Spring-animated values for the trail dots
          const trailMouseX = useSpring(rawMouseX, SPRING_CONFIG_MAIN);
          const trailMouseY = useSpring(rawMouseY, SPRING_CONFIG_MAIN);
      
          // Spring-animated values for the custom cursor (slightly faster/different feel)
          const cursorMouseX = useSpring(rawMouseX, SPRING_CONFIG_CURSOR);
          const cursorMouseY = useSpring(rawMouseY, SPRING_CONFIG_CURSOR);
      
      
          const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
              if (!containerRef.current) return;
              const rect = containerRef.current.getBoundingClientRect();
              // Update MotionValues with position relative to the container
              rawMouseX.set(e.clientX - rect.left - trailSize / 2); // Center dot on cursor
              rawMouseY.set(e.clientY - rect.top - trailSize / 2);
          };
      
          const handleMouseLeave = () => {
              // Optional: Could animate mouse values back to a default position,
              // but letting the spring settle naturally often looks good.
              // rawMouseX.set(0); // Example: move to top-left on leave
              // rawMouseY.set(0);
          };
      
          return (
              <div
                  ref={containerRef}
                  className={cn(
                      "relative overflow-hidden cursor-none", // Hide default cursor
                      className
                  )}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  {...props}
              >
                  {/* Render Trail Dots Behind Text */}
                  {Array.from({ length: numDots }).map((_, i) => (
                      <TrailDot
                          key={i}
                          index={i}
                          mouseX={trailMouseX}
                          mouseY={trailMouseY}
                          size={trailSize}
                          color={trailColor}
                          numDots={numDots}
                      />
                  ))}
      
                  {/* Foreground Text with Blend Mode */}
                  {/* Ensure text color contrasts with trail for the effect (e.g., white) */}
                  <div className="relative z-10 text-white mix-blend-difference pointer-events-none">
                      {/* pointer-events-none is crucial so text doesn't block mousemove */}
                      {children}
                  </div>
      
                  {/* Custom Cursor Element (Optional but recommended) */}
                  {/* Positioned above the text (z-20) */}
                  <motion.div
                      className={cn(
                          \`absolute top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-20\`,
                          trailColor
                      )}
                      style={{
                          translateX: cursorMouseX,
                          translateY: cursorMouseY,
                      }}
                  />
              </div>
          );
      }`,
        day: 71
    },
    {
        name: 'Hold Button',
        code: `'use client';
  
  import React, { useState, useRef, useEffect } from 'react';
  import { motion } from 'framer-motion';
  
  interface HoldButtonProps {
      /** Function to call when hold completes */
      onComplete: () => void;
      /** Button text or content */
      children: React.ReactNode;
      /** Additional CSS classes */
      className?: string;
      /** Hold duration in seconds (default: 3) */
      duration?: number;
      /** Button background color */
      bgColor?: string;
      /** Text color */
      textColor?: string;
      /** Overlay color with opacity */
      overlayColor?: string;
      /** Button width */
      width?: string;
      /** Button height */
      height?: string;
      /** Disabled state */
      disabled?: boolean;
  }
  
  const HoldButton = ({
      onComplete,
      children,
      className = '',
      duration = 3,
      bgColor = 'bg-blue-500',
      textColor = 'text-white',
      overlayColor = 'bg-black/50',
      width = 'w-auto',
      height = 'h-12',
      disabled = false,
  }: HoldButtonProps) => {
      const [isHolding, setIsHolding] = useState(false);
      const [progress, setProgress] = useState(0);
      const animationRef = useRef<number | null>(null);
      const startTimeRef = useRef<number | null>(null);
  
      // Clean up animation frame on unmount
      useEffect(() => {
          return () => {
              if (animationRef.current !== null) {
                  cancelAnimationFrame(animationRef.current);
              }
          };
      }, []);
  
      const resetState = () => {
          setIsHolding(false);
          setProgress(0);
          startTimeRef.current = null;
  
          if (animationRef.current !== null) {
              cancelAnimationFrame(animationRef.current);
              animationRef.current = null;
          }
      };
  
      const animate = () => {
          if (!startTimeRef.current) return;
  
          const elapsed = (Date.now() - startTimeRef.current) / 1000;
          const newProgress = Math.min(elapsed / duration, 1);
          setProgress(newProgress);
  
          if (newProgress < 1) {
              animationRef.current = requestAnimationFrame(animate);
          } else {
              onComplete();
              resetState();
          }
      };
  
      const handlePointerDown = (e: React.PointerEvent) => {
          if (disabled) return;
  
          e.preventDefault();
          setIsHolding(true);
          startTimeRef.current = Date.now();
          animationRef.current = requestAnimationFrame(animate);
      };
  
      const handlePointerUp = () => {
          resetState();
      };
  
      const handlePointerLeave = () => {
          resetState();
      };
  
      return (
          <motion.button
              className={\`
          relative overflow-hidden rounded-full 
          \${bgColor} \${textColor} \${width} \${height} 
          select-none touch-none 
          $\{disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          $\{className}
        \`}
              whileHover={disabled ? {} : { scale: 1.05 }}
              whileTap={disabled ? {} : { scale: 0.95 }}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerLeave}
              onPointerCancel={handlePointerUp}
              disabled={disabled}
          >
              {/* Progress overlay with transparency */}
              {isHolding && (
                  <motion.div
                      className={\`absolute top-0 left-0 h-full \${overlayColor}\`}
                      style={{ width: \`\${progress * 100}%\` }}
                      initial={{ width: 0 }}
                      animate={{ width: \`\${progress * 100}\` }}
                      transition={{ duration: 0.1, ease: "linear" }}
                  />
              )}
              <span className="relative z-10">{children}</span>
          </motion.button>
      );
  };
  
  export default HoldButton;`,
        day: 73
    },
    {
        name: 'Untitled #2',
        code: ``, // Assuming no code snippet needed for UnicornStudioWrapper
        day: 80
    },
    {
        name: 'Weather Card',
        code: `'use client';

import React, { useState, useRef, MouseEvent } from 'react';
import { motion, Variants } from 'motion/react';

// Props interface
interface WeatherCardProps {
    temperature: number;
    condition: string;
    time: string;
    location?: string;
}

// Container variants for staggered children animation
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
            when: "beforeChildren",
        },
    },
};

// Circle variants with improved animation states
const circleVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.7,
    },
    visible: {
        opacity: 0.7,
        y: 0,
        scale: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15,
            mass: 1,
        },
    },
};

// Text container variants for staggering text animation
const textContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.4,
        },
    },
};

// Text item variants
const textItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 12,
        },
    },
};

// Circle style definition
interface CircleStyle {
    color: string;
    size: string;
    top: string;
    followFactor: number;
}

const circles: CircleStyle[] = [
    { color: 'bg-orange-300', size: 'w-56 h-56', top: 'top-0', followFactor: 0.18 },
    { color: 'bg-orange-400', size: 'w-52 h-52', top: 'top-5', followFactor: 0.30 },
    { color: 'bg-orange-500', size: 'w-48 h-48', top: 'top-10', followFactor: 0.42 },
    { color: 'bg-red-400', size: 'w-44 h-44', top: 'top-14', followFactor: 0.54 },
    { color: 'bg-pink-400', size: 'w-40 h-40', top: 'top-18', followFactor: 0.66 },
    { color: 'bg-purple-300', size: 'w-36 h-36', top: 'top-22', followFactor: 0.78 },
    { color: 'bg-purple-400', size: 'w-32 h-32', top: 'top-26', followFactor: 0.86 },
];

const WeatherCard: React.FC<WeatherCardProps> = ({
    temperature,
    condition,
    time,
    location,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // Event handlers
    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const relativeX = event.clientX - (rect.left + rect.width / 2);
        const relativeY = event.clientY - (rect.top + rect.height / 2);
        setMousePos({ x: relativeX, y: relativeY });
    };

    const handleMouseEnter = () => setIsHovering(true);

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    return (
        <div
            ref={cardRef}
            className="relative w-full max-w-sm rounded-lg border border-gray-200 bg-stone-50 p-6 shadow-md overflow-hidden cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            {/* Animation Container */}
            <motion.div
                className="relative mb-6 h-64"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                aria-hidden="true"
            >
                {circles.map((circle, index) => (
                    <motion.div
                        key={index}
                        className={\`absolute left-1/2 -translate-x-1/2 rounded-full \${circle.size} \${circle.color} \${circle.top}\`}
                        variants={circleVariants} // Keep variants for initial animation
                        custom={circle.followFactor}
                        initial="hidden"
                        // Animate directly with an object for smoother control
                        animate={{
                            opacity: isHovering ? 0.8 : 0.7,
                            scale: isHovering ? 1.05 : 1,
                            x: isHovering ? mousePos.x * circle.followFactor : 0,
                            y: isHovering ? mousePos.y * circle.followFactor : 0,
                        }}
                        // Apply a single transition to all animated properties
                        transition={{
                            type: 'spring',
                            stiffness: 300, // Increased for snappier feel
                            damping: 5,    // Adjusted for control
                            mass: 0.5,
                        }}
                    />
                ))}
            </motion.div>

            {/* Weather Information */}
            <motion.div
                className="relative z-10 text-center pointer-events-none"
                variants={textContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {location && (
                    <motion.p
                        className="text-base font-medium text-gray-800 mb-1"
                        variants={textItemVariants}
                    >
                        {location}
                    </motion.p>
                )}
                <motion.p
                    className="text-4xl font-semibold text-gray-900"
                    variants={textItemVariants}
                >
                    {temperature}&deg;F
                </motion.p>
                <motion.p
                    className="text-lg text-gray-600"
                    variants={textItemVariants}
                >
                    {condition}
                </motion.p>
                <motion.p
                    className="text-sm text-gray-500"
                    variants={textItemVariants}
                >
                    {time}
                </motion.p>
            </motion.div>
        </div>
    );
};

export default WeatherCard;
`,
        day: 84
    },
    {
        name: 'Frosted Glass Tiles',
        code: ``, // Assuming no code snippet needed for UnicornStudioWrapper
        day: 85
    },
    {
        name: 'Vercel Ship 2024',
        code: ``, // Assuming no code snippet needed for TagComponent
        day: 86
    },
    {
        name: 'Corner Button',
        code: ``, // Assuming no code snippet needed for CornerButton
        day: 87
    },
    {
        name: 'container query button',
        code: `/* container-query-button.module.css */
.buttonWrapper {
	position: relative;
	width: 12rem;
	height: 4rem;
	container-type: size; /* Query both inline and block size */
	container-name: button-container; /* Optional: name the container */
}

.buttonLink {
	/* Define variables for corner dimensions and calculated offset */
	--corner-size: 0.75rem;
	--corner-offset: 0.25rem;
	/* NEW: Calculate the offset needed for travel without border */
	--corner-travel-offset: calc(2 * var(--corner-offset) + var(--corner-size));

	display: inline-flex; /* Use flex for centering */
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	position: relative; /* For positioning corners */
	cursor: pointer;
	/* REMOVED: border: 1px solid hsl(var(--border)); */
	background-color: hsl(var(--secondary));
	color: hsl(var(--foreground));
	font-weight: bold;
	text-decoration: none;
	transition: background-color 300ms;
}

.buttonLink:hover {
	background-color: hsl(var(--muted));
}

.corner {
	position: absolute;
	width: var(--corner-size);
	height: var(--corner-size);
	font-size: 1rem;
	line-height: var(--corner-size);
	text-align: center;
	color: hsl(var(--muted-foreground));
	transition: transform 300ms ease-in-out;
}

.topLeft {
	top: var(--corner-offset);
	left: var(--corner-offset);
}

.topRight {
	top: var(--corner-offset);
	right: var(--corner-offset);
}

.bottomLeft {
	bottom: var(--corner-offset);
	left: var(--corner-offset);
}

.bottomRight {
	bottom: var(--corner-offset);
	right: var(--corner-offset);
}

/* Hover Animations using Container Query Units and CSS Variables */
.buttonLink:hover .topLeft {
	transform: translateX(calc(100cqi - var(--corner-travel-offset)));
}

.buttonLink:hover .topRight {
	transform: translateY(calc(100cqb - var(--corner-travel-offset)));
}

.buttonLink:hover .bottomRight {
	transform: translateX(calc(-100cqi + var(--corner-travel-offset)));
}

.buttonLink:hover .bottomLeft {
	transform: translateY(calc(-100cqb + var(--corner-travel-offset)));
}


------------------------------------------------

// container-query-button.tsx
import React from 'react';
import styles from './container-query-button.module.css';
import { cn } from '@/lib/utils';

const ContainerQueryButton = () => {
  return (
    <div className={styles.buttonWrapper}>
      <a href="#" className={styles.buttonLink}>
        <span>Hover Me</span>

        {/* Top Left Corner -> Top Right */}
        <span className={cn(styles.corner, styles.topLeft)}>+</span>

        {/* Top Right Corner -> Bottom Right */}
        <span className={cn(styles.corner, styles.topRight)}>+</span>

        {/* Bottom Right Corner -> Bottom Left */}
        <span className={cn(styles.corner, styles.bottomRight)}>+</span>

        {/* Bottom Left Corner -> Top Left */}
        <span className={cn(styles.corner, styles.bottomLeft)}>+</span>
      </a>
    </div>
  );
};

export default ContainerQueryButton;


`,
        day: 88
    },
    {
        name: 'Tiles #2',
        code: ``, // Assuming no code snippet needed for UnicornStudioWrapper
        day: 90
    },
    {
        name: 'Float Menu',
        code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AnimatedBackground from '@/components/ui/animated-background';
import { List, X } from '@phosphor-icons/react';
import { ExternalLink } from 'lucide-react';
import { Link } from 'next-view-transitions';
import ThemeSwitch from '@/components/ui/ThemeSwitch';
import { cn } from '@/lib/utils';

const NAVIGATION_ITEMS = [
    {
        id: 'home',
        label: 'Home',
        href: '#', // Use '#' for showcase links
    },
    {
        id: 'resume',
        label: 'Resume',
        href: '#', // Use '#' for showcase links
    },
    {
        id: 'portfolio',
        label: 'Portfolio',
        href: '#', // Use '#' for showcase links
    },
    {
        id: 'contact',
        label: 'Contact',
        href: '#', // Use '#' for showcase links
    },
];

// Keep local for showcase
const isExternalLink = (href: string) => {
    // Simplified for showcase: assume internal links start with #
    return !href.startsWith('#');
};

interface FloatingMenuProps {
    align?: 'left' | 'right';
}

export default function FloatingMenuShowcase({ align = 'right' }: FloatingMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const alignmentClasses = align === 'left' ? 'left-4' : 'right-4';

    return (
        <div className="relative m-auto h-96 w-fit rounded-md overflow-hidden bg-background p-4 dark:bg-gray-900 dark:text-white">
            <p className="text-sm text-muted-foreground mb-2">Floating Menu Showcase (Click the button)</p>
            {/* Floating Action Button */}
            <motion.button
                onClick={toggleMenu}
                className={cn(
                    "absolute bottom-4 p-3 rounded-full shadow-lg z-50 transition-colors duration-300", // Use absolute positioning within container
                    "bg-card dark:bg-gray-800", // Use card background
                    "border border-border dark:border-gray-700",
                    "text-foreground dark:text-white",
                    alignmentClasses
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isOpen ? "Close menu" : "Open menu"}
            >
                <AnimatePresence initial={false} mode="wait">
                    <motion.div
                        key={isOpen ? 'close' : 'open'}
                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isOpen ? <X size={24} /> : <List size={24} />}
                    </motion.div>
                </AnimatePresence>
            </motion.button>

            {/* Expanded Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className={cn(
                            "absolute bottom-20 mb-2 p-4 rounded-xl shadow-xl z-40 flex flex-col space-y-1", // Use absolute positioning
                            "bg-card dark:bg-gray-800", // Use card background
                            "border border-border dark:border-gray-700",
                            alignmentClasses
                        )}
                    >
                        {/* Navigation Links with Animated Background */}
                        <AnimatedBackground
                            className="whitespace-nowrap rounded-lg bg-muted/50 dark:bg-gray-700/50 p-1"
                            transition={{
                                type: 'spring',
                                bounce: 0,
                                duration: 0.3,
                            }}
                            enableHover
                        >
                            {NAVIGATION_ITEMS.map(({ id, label, href }) => {
                                const isExternal = isExternalLink(href);
                                return (
                                    <a
                                        key={id}
                                        data-id={id}
                                        href={href}
                                        target={isExternal ? "_blank" : undefined}
                                        rel={isExternal ? "noopener noreferrer" : undefined}
                                        className="group flex w-full items-center justify-center cursor-pointer px-3 py-2 text-sm transition-all duration-300 text-muted-foreground hover:text-foreground data-[checked=true]:text-foreground dark:text-white dark:hover:text-foreground bg-transparent dark:data-[checked=true]:text-foreground rounded-md"
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent navigation in showcase
                                            setIsOpen(false);
                                        }}
                                    >
                                        {label}
                                        {isExternal && (
                                            <ExternalLink
                                                className="inline-block ml-1 h-3 w-3 text-muted-foreground group-hover:text-foreground dark:text-white dark:group-hover:text-foreground"
                                                strokeWidth={2}
                                            />
                                        )}
                                    </a>
                                );
                            })}
                        </AnimatedBackground>

                        {/* Theme Switch */}
                        <div className="pt-2 border-t border-border flex justify-start pointer-events-none">
                            <ThemeSwitch />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}`,
        day: 93
    },
    {
        name: 'Orb',
        code: ``, // Assuming no code snippet needed for UnicornStudioWrapper
        day: 94
    },
    {
        name: 'Project List Showcase',
        code: `'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from '@phosphor-icons/react';

// Define the structure for a project
interface Project {
    id: number;
    name: string;
    description: string;
    // Add other relevant fields like imageUrl, link, etc. if needed
}

// Sample project data (replace with actual JSON loading if needed)
const sampleProjects: Project[] = [
    { id: 1, name: "Project Alpha", description: "This is the description for Project Alpha. It showcases innovative features." },
    { id: 2, name: "Project Beta", description: "Project Beta focuses on user experience and intuitive design." },
    { id: 3, name: "Project Gamma", description: "A project exploring cutting-edge technology and performance optimization." },
    { id: 4, name: "Project Delta", description: "Delta aims to solve complex problems with elegant solutions." },
];

export default function ProjectListShowcase() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Load projects (using sample data for now)
    useEffect(() => {
        // In a real scenario, you might fetch this data:
        // fetch('/path/to/projects.json')
        //   .then(res => res.json())
        //   .then(data => setProjects(data))
        //   .catch(error => console.error("Error loading projects:", error));
        setProjects(sampleProjects);
    }, []);

    const openModal = (project: Project) => {
        setSelectedProject(project);
    };

    const closeModal = () => {
        setSelectedProject(null);
    };

    // Modal animation variants
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.9, y: 20 },
    };

    return (
        <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg min-h-[300px]">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Project Showcase</h2>
            <ul className="space-y-3">
                {projects.map((project) => (
                    <li
                        key={project.id}
                        onClick={() => openModal(project)}
                        className="p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <h3 className="font-medium text-gray-900 dark:text-white">{project.name}</h3>
                    </li>
                ))}
            </ul>

            {/* Floating Window (Modal) */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={closeModal} // Close on backdrop click
                    >
                        <motion.div
                            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{selectedProject.name}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{selectedProject.description}</p>
                            {/* Add more project details here */}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}`,
        day: 95
    },
    {
        name: 'Simple Project List',
        code: `'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from '@phosphor-icons/react';

interface Project {
    id: number;
    name: string;
    description: string;
    // Add other relevant fields like imageUrl, link, etc. if needed
}

// Sample project data (replace with actual JSON loading if needed)
const sampleProjects: Project[] = [
    { id: 1, name: "Project Alpha", description: "This is the description for Project Alpha. It showcases innovative features." },
    { id: 2, name: "Project Beta", description: "Project Beta focuses on user experience and intuitive design." },
    { id: 3, name: "Project Gamma", description: "A project exploring cutting-edge technology and performance optimization." },
    { id: 4, name: "Project Delta", description: "Delta aims to solve complex problems with elegant solutions." },
];

export default function ProjectListShowcase() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Load projects (using sample data for now)
    useEffect(() => {
        // In a real scenario, you might fetch this data:
        // fetch('/path/to/projects.json')
        //   .then(res => res.json())
        //   .then(data => setProjects(data))
        //   .catch(error => console.error("Error loading projects:", error));
        setProjects(sampleProjects);
    }, []);

    const openModal = (project: Project) => {
        setSelectedProject(project);
    };

    const closeModal = () => {
        setSelectedProject(null);
    };

    // Modal animation variants
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.9, y: 20 },
    };

    return (
        <div className="p-4 bg-gradient-to-br from-red-200 to-purple-300 dark:from-red-900 dark:to-purple-900 rounded-lg min-h-[300px]">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Project Showcase</h2>
            <ul className="space-y-3">
                {projects.map((project) => (
                    <li
                        key={project.id}
                        onClick={() => openModal(project)}
                        className="p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <h3 className="font-medium text-gray-900 dark:text-white">{project.name}</h3>
                    </li>
                ))}
            </ul>

            {/* Floating Window (Modal) */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={closeModal} // Close on backdrop click
                    >
                        <motion.div
                            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                        >
                            <button
                                onClick={closeModal}
                                className="absolute cursor-pointer top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{selectedProject.name}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{selectedProject.description}</p>
                            {/* Add more project details here */}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}`,
        day: 96
    },
    {
        name: 'Glitch Box',
        code: ``, // Assuming no code snippet needed for UnicornStudioWrapper
        day: 97
    },
];

export default elementsData;