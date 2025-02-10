'use client'
import React, { JSX, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check } from 'lucide-react';
import TextEditor from '@/elements/text-editor';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { ReactMarquee } from '@/elements/react-marquee';
import LiquidBackground from '@/elements/liquid-background';
import HologramMaze from '@/elements/hologram-maze';
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
                        className="w-full px-8 py-4 text-2xl font-semibold bg-transparent border-none focus:outline-none"
                        placeholder="Document Title"
                    />

                    <div className="px-8 pb-4">
                        <div className="min-h-[calc(100vh-300px)] w-full">
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full h-full min-h-[calc(100vh-300px)] resize-none bg-transparent border-none focus:outline-none"
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
            <LiquidBackground />
        ),
        code: ``,
        day: 14
    },
    {
        name: 'Hologram Maze',
        component: (
            <HologramMaze />
        ),
        code: ``,
        day: 16
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
    const filteredElements = elements.filter(element => element.day === day);

    // If no elements found for the given day, show a message
    if (filteredElements.length === 0) {
        return (
            <></>
        );
    }

    return (
        <div className="p-4">
            {filteredElements.map((element, index) => (
                <div key={index} className="mb-8">
                    <Tabs defaultValue="preview" className="w-full">
                        <TabsList>
                            <TabsTrigger value="preview">Preview</TabsTrigger>
                            {element.code === '' ? null : <TabsTrigger value="code">Code</TabsTrigger>}
                        </TabsList>
                        <TabsContent value="preview" className="p-4 min-h-full border rounded">
                            {element.component}
                        </TabsContent>
                        {element.code === '' ? null :
                            <TabsContent value="code" className="p-4 border rounded">
                                <div className="relative">
                                    <button
                                        onClick={() => handleCopy(element.code, index)}
                                        className="absolute right-2 top-2 z-[100] p-2 rounded bg-opacity-60 bg-white hover:bg-gray-200 transition-colors"
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