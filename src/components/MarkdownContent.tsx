import React from 'react';
import { cn } from '@/lib/utils';

interface MarkdownContentProps {
    content: string;
    className?: string;
}

type ValidTags = 'h1' | 'h2' | 'h3' | 'p' | 'img' | 'ul' | 'ol' | 'li' | 'code' | 'pre' | 'blockquote';

const MarkdownContent = ({ content, className }: MarkdownContentProps) => {
    // Define style mappings
    const styleMap: Record<ValidTags, string> = {
        h1: 'text-4xl md:text-5xl mb-8 text-gray-900 dark:text-gray-100',
        h2: 'text-3xl md:text-4xl  mb-6 text-gray-800 dark:text-gray-200',
        h3: 'text-2xl md:text-3xl  mb-4 text-gray-800 dark:text-gray-200',
        p: 'text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300',
        img: 'rounded-lg shadow-lg w-full object-cover my-8',
        ul: 'list-disc list-inside mb-6 space-y-2',
        ol: 'list-decimal list-inside mb-6 space-y-2',
        li: 'text-lg text-gray-700 dark:text-gray-300',
        code: 'bg-gray-100 dark:bg-gray-800 rounded px-2 py-1 font-mono text-sm',
        pre: 'bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6 overflow-x-auto',
        blockquote: 'border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-6 text-gray-600 dark:text-gray-400'
    };


    // Process the content by adding classes
    const processedContent = content.replace(
        /<(h1|h2|h3|p|img|ul|ol|li|code|pre|blockquote)([^>]*)>/g,
        (match, tag: ValidTags, attributes) => {
            // Special handling for images
            if (tag === 'img') {
                return `<img${attributes} class="${styleMap[tag]}" loading="lazy"`;
            }
            // Special handling for paragraphs with images
            if (tag === 'p' && attributes.includes('<img')) {
                return `<p${attributes} class="my-8">`;
            }
            // Default handling
            return `<${tag}${attributes} class="${styleMap[tag]}">`;
        }
    );

    return (
        <div
            className={cn("markdown-content", className)}
            dangerouslySetInnerHTML={{ __html: processedContent }}
        />
    );
};

export default MarkdownContent;