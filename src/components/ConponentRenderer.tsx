'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

interface ComponentRendererProps {
    codeString: string;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({ codeString }) => {
    const [Component, setComponent] = useState<React.ComponentType | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadComponent = async () => {
            try {
                const encodedCode = btoa(unescape(encodeURIComponent(codeString)));
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
    }, [codeString]);

    if (error) {
        return <div className="text-red-500 p-4">{error}</div>;
    }

    if (!Component) {
        return <div className="text-gray-500 p-4">Loading...</div>;
    }

    return <Component />;
};

export default ComponentRenderer;