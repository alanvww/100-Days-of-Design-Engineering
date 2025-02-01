'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { createRoot } from 'react-dom/client';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);

interface CodePreviewProps {
    codeString: string;
}

const CodePreview: React.FC<CodePreviewProps> = ({ codeString }) => {
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const previewRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const renderComponent = async () => {
            if (!codeString || !previewRef.current) return;

            try {
                // Create a new blob and URL for the code
                const blob = new Blob([codeString], { type: 'text/javascript' });
                const url = URL.createObjectURL(blob);

                // Dynamically import the code as a module
                const newModule = await import(url);
                const Component = newModule.default;

                if (typeof Component === 'function') {
                    // Use createRoot to render the component
                    const root = createRoot(previewRef.current);
                    root.render(<Component />);
                } else {
                    throw new Error(
                        'The imported module does not export a React component by default.'
                    );
                }

                // Clean up the URL
                URL.revokeObjectURL(url);
            } catch (e) {
                console.error('Error rendering code:', e);
                setError('Failed to render the provided code.');
            }
        };

        renderComponent();
    }, [codeString]);

    const handleCopy = async () => {
        // Copy the original codeString, not the formatted one
        await navigator.clipboard.writeText(codeString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-2xl mx-auto rounded-lg border border-gray-200">
            {/* Preview Section */}
            <div
                className="min-h-[200px] p-10 flex items-center justify-center border-b border-gray-200 bg-white"
                ref={previewRef}
            >
                {error ? (
                    <div className="text-red-500 p-4">{error}</div>
                ) : (
                    <div className="text-gray-500">Live Preview</div>
                )}
            </div>

            {/* Code Section */}
            <div className="relative bg-gray-50 rounded-b-lg">
                <div className="absolute right-4 top-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleCopy}
                        className="h-8 w-8 bg-white"
                    >
                        {copied ? (
                            <Check className="h-4 w-4 text-green-500" />
                        ) : (
                            <Copy className="h-4 w-4" />
                        )}
                    </Button>
                </div>
                <SyntaxHighlighter
                    language="tsx"
                    style={oneDark}
                    wrapLines={true}
                    wrapLongLines={true}
                >
                    {codeString}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodePreview;