"use client"
import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface MarkdownContentProps {
    content: string;
    className?: string;
}

type ValidTags = 'h1' | 'h2' | 'h3' | 'p' | 'img' | 'ul' | 'ol' | 'li' | 'code' | 'pre' | 'blockquote';

const styleMap: Record<ValidTags, string> = {
    h1: 'text-4xl md:text-5xl mb-8 text-gray-900 dark:text-gray-100',
    h2: 'text-3xl md:text-4xl mb-6 text-gray-800 dark:text-gray-200',
    h3: 'text-2xl md:text-3xl mb-4 text-gray-800 dark:text-gray-200',
    p: 'text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300',
    img: 'rounded-lg shadow-lg w-full object-cover my-8',
    ul: 'list-disc list-inside mb-6 space-y-2',
    ol: 'list-decimal list-inside mb-6 space-y-2',
    li: 'text-lg text-gray-700 dark:text-gray-300',
    code: 'bg-gray-100 dark:bg-gray-800 rounded px-2 py-1 font-mono text-sm',
    pre: 'bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6 overflow-x-auto',
    blockquote: 'border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-6 text-gray-600 dark:text-gray-400'
};

interface CustomImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
}

const CustomImage = React.memo(function CustomImage({ 
    src, 
    alt, 
    width = 800, 
    height = 400 
}: CustomImageProps) {
    const [isLoaded, setIsLoaded] = React.useState(false);

    return (
        <div className={cn(
            "relative w-full h-auto",
            !isLoaded && "animate-pulse bg-gray-100 dark:bg-gray-800"
        )}>
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={cn(
                    styleMap.img,
                    "transition-opacity duration-300",
                    isLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setIsLoaded(true)}
                priority
            />
        </div>
    );
});

interface ImageAttributes {
    src: string;
    alt: string;
    width?: string;
    height?: string;
}

const extractAttributes = (attributeString: string): Record<string, string> => {
    const attrs: Record<string, string> = {};
    const regex = /(\w+)=["']([^"']*?)["']/g;
    let match;
    
    while ((match = regex.exec(attributeString)) !== null) {
        const [, key, value] = match;
        attrs[key] = value;
    }
    
    return attrs;
};

const parseImageTag = (imgTag: string): ImageAttributes | null => {
    const match = imgTag.match(/<img([^>]*)>/);
    if (!match) return null;

    const attrs = extractAttributes(match[1]);
    return {
        src: attrs.src || '',
        alt: attrs.alt || '',
        width: attrs.width,
        height: attrs.height
    };
};

const splitContentAroundImages = (content: string, baseIndex: number): React.ReactNode[] => {
    const parts = content.split(/(<img[^>]*>)/);
    return parts.map((part, index) => {
        const uniqueKey = `${baseIndex}-${index}`;
        
        if (part.startsWith('<img')) {
            const imgAttrs = parseImageTag(part);
            if (!imgAttrs) return null;
            
            return (
                <CustomImage
                    key={`img-${uniqueKey}`}
                    {...imgAttrs}
                    width={imgAttrs.width ? parseInt(imgAttrs.width) : undefined}
                    height={imgAttrs.height ? parseInt(imgAttrs.height) : undefined}
                />
            );
        }
        
        const trimmedText = part.trim();
        return trimmedText ? (
            <p key={`text-${uniqueKey}`} className={styleMap.p}>
                {trimmedText}
            </p>
        ) : null;
    }).filter(Boolean);
};

const parseContent = (htmlContent: string): React.ReactNode[] => {
    const elements: React.ReactNode[] = [];
    let currentIndex = 0;

    while (currentIndex < htmlContent.length) {
        const nextTagStart = htmlContent.indexOf('<', currentIndex);
        
        if (nextTagStart === -1) {
            const remainingText = htmlContent.slice(currentIndex).trim();
            if (remainingText) {
                elements.push(<p key={elements.length} className={styleMap.p}>{remainingText}</p>);
            }
            break;
        }

        const textContent = htmlContent.slice(currentIndex, nextTagStart).trim();
        if (textContent) {
            elements.push(<p key={elements.length} className={styleMap.p}>{textContent}</p>);
        }

        const tagEnd = htmlContent.indexOf('>', nextTagStart);
        if (tagEnd === -1) break;

        const fullTag = htmlContent.slice(nextTagStart + 1, tagEnd);
        const [tagName, ...attrParts] = fullTag.split(' ');
        const attributeString = attrParts.join(' ');
        const attrs = extractAttributes(attributeString);

        if (tagName === 'p') {
            // Find closing tag
            const closingTag = '</p>';
            const closingTagIndex = htmlContent.indexOf(closingTag, tagEnd);
            
            if (closingTagIndex === -1) {
                currentIndex = tagEnd + 1;
                continue;
            }

            const paragraphContent = htmlContent.slice(tagEnd + 1, closingTagIndex);
            // Handle paragraph content differently if it contains images
            if (paragraphContent.includes('<img')) {
                elements.push(...splitContentAroundImages(paragraphContent, elements.length));
            } else {
                elements.push(
                    <p key={elements.length} className={styleMap.p}>
                        {paragraphContent.trim()}
                    </p>
                );
            }

            currentIndex = closingTagIndex + closingTag.length;
        } else if (tagName === 'img') {
            const imgAttrs = parseImageTag(`<img ${attributeString}>`);
            if (imgAttrs) {
                elements.push(
                    <CustomImage
                        key={elements.length}
                        {...imgAttrs}
                        width={imgAttrs.width ? parseInt(imgAttrs.width) : undefined}
                        height={imgAttrs.height ? parseInt(imgAttrs.height) : undefined}
                    />
                );
            }
            currentIndex = tagEnd + 1;
        } else if (Object.keys(styleMap).includes(tagName)) {
            const Component = tagName as ValidTags;
            const closingTag = `</${tagName}>`;
            const closingTagIndex = htmlContent.indexOf(closingTag, tagEnd);
            
            if (closingTagIndex === -1) {
                currentIndex = tagEnd + 1;
                continue;
            }

            const innerContent = htmlContent.slice(tagEnd + 1, closingTagIndex);
            elements.push(
                React.createElement(
                    Component,
                    { 
                        key: elements.length,
                        className: styleMap[Component as ValidTags],
                        ...attrs
                    },
                    innerContent.trim()
                )
            );

            currentIndex = closingTagIndex + closingTag.length;
        } else {
            currentIndex = tagEnd + 1;
        }
    }

    return elements;
};

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content, className }) => {
    const elements = React.useMemo(() => parseContent(content), [content]);

    return (
        <div className={cn("markdown-content", className)}>
            {elements}
        </div>
    );
};

export default MarkdownContent;