'use client'
import React, { JSX, useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { useTheme } from 'next-themes'

import elements from './Elements';

interface UIElement {
  name: string;
  component: JSX.Element;
  code: string;
  day: number;
}

interface ElementShowcaseProps {
  day: number;
}

const ElementShowcase: React.FC<ElementShowcaseProps> = ({ day }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { resolvedTheme } = useTheme()


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
          <Tabs defaultValue="preview" className="w-full bg-white dark:bg-gray-900">
            <TabsList className='bg-muted dark:bg-gray-700 text-muted-foreground'>
              <TabsTrigger value="preview" className='cursor-pointer dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-white'>Preview</TabsTrigger>
              {element.code === '' ? null : <TabsTrigger value="code" className='cursor-pointer dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-white'>Code</TabsTrigger>}
            </TabsList>
            <TabsContent value="preview" className="p-4 min-h-full border border-gray-200 dark:border-gray-800 rounded">
              {element.component}
            </TabsContent>
            {element.code === '' ? null :
              <TabsContent value="code" className="p-4 border border-gray-200 dark:border-gray-800 rounded dark:bg-gray-900">
                <div className="relative">
                  <button
                    onClick={() => handleCopy(element.code, index)}
                    className="absolute right-2 top-2 z-100 p-2 rounded bg-white/60 hover:bg-gray-200/60 dark:bg-gray-800/60 dark:hover:bg-gray-700/60 transition-colors"
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
                      extensions={[javascript({ jsx: true }),]}
                      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
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
