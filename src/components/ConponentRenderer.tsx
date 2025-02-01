'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

interface ComponentRendererProps {
    codeString: string;
    wrapCode?: (code: string) => string; // Optional function to wrap code
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({
    codeString,
    wrapCode = (code) => code, // Default to no wrapping
}) => {
    const [Component, setComponent] = useState<React.ComponentType | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadComponent = async () => {
            try {
                const wrappedCode = wrapCode(codeString); // Wrap the code if needed
                const encodedCode = btoa(unescape(encodeURIComponent(wrappedCode)));
                const dataUrl = `data:text/javascript;base64,${encodedCode}`;

                const Component = await dynamic(
                    () => import(dataUrl).then((module) => module.default),
                    { ssr: false }
                );

                setComponent(() => Component);
            } catch (e) {
                console.error('Error rendering code:', e);
                setError('Failed to render the provided code.');
            }
        };

        loadComponent();
    }, [codeString, wrapCode]);

    if (error) {
        return <div className="text-red-500 p-4">{error}</div>;
    }

    if (!Component) {
        return <div className="text-gray-500 p-4">Loading...</div>;
    }

    return <Component />;
};

export default ComponentRenderer;