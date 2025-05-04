'use client';

import { useChat, type Message } from '@ai-sdk/react';
import { ToolInvocation } from 'ai';
import { ProjectCard } from '@/components/ProjectCard';
import type { Project } from '@/types/ProjectTypes';
import { useRef, useEffect } from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { cn } from '@/lib/utils';
import { Input } from "@/components/ui/input"; // Import shadcn Input
import { Button } from "@/components/ui/button"; // Import shadcn Button for consistency

export default function ChatPage() {
    // Add append function from useChat
    const { messages, input, handleInputChange, handleSubmit, isLoading, error, append } = useChat({
        api: '/api/chat',
    });

    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <main className="flex-1 container mx-auto px-4 py-8 sm:py-16 flex flex-col">
                <div className="relative">
                    <Navbar />
                </div>
                <div className="flex flex-col w-full max-w-4xl mx-auto flex-grow mt-8">
                    <div className="flex flex-col flex-grow overflow-hidden">
                        {/* Chat Message Area */}
                        <div ref={chatContainerRef} className="flex-grow bg-white dark:bg-zinc-800 rounded-lg p-4 mb-4 overflow-y-auto space-y-4">
                            {messages.length > 0
                                ? messages
                                    // Filter out internal action messages before rendering
                                    .filter(m => !(m.role === 'user' && typeof m.content === 'string' && m.content.startsWith('SHOW_MORE_ACTION::')))
                                    .map((m: Message, index: number) => { // Add index here (index might be less useful now after filtering)
                                        const projectInvocations = m.toolInvocations?.filter(
                                            (inv) => inv.toolName === 'displayProjectCard'
                                        ) ?? [];
                                        const hasProjects = projectInvocations.length > 0;

                                        return (
                                            <div key={m.id} className={cn(
                                                "whitespace-pre-wrap p-4 rounded-xl flex flex-col shadow-sm",
                                                m.role === 'user'
                                                    ? 'bg-blue-50 dark:bg-blue-900/50 text-gray-900 dark:text-blue-100 text-left ml-auto max-w-[85%]'
                                                    : 'bg-gray-100 dark:bg-zinc-700 text-gray-900 dark:text-zinc-100 text-left mr-auto',
                                                hasProjects ? 'w-full max-w-full' : 'max-w-[85%]'
                                            )}>
                                                {/* Text Content */}
                                                {m.content && <p className={cn("leading-relaxed", hasProjects ? 'mb-3' : '')}>{m.content}</p>}

                                                {/* Project Card Carousel */}
                                                {hasProjects && (
                                                    <div className="relative">
                                                        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-gray-100 dark:from-zinc-700 to-transparent z-10 pointer-events-none"></div>
                                                        <div className="scrollbar-none overflow-x-auto scroll-smooth snap-x snap-mandatory">
                                                            <div className="flex space-x-3 px-4 pb-2">
                                                                {projectInvocations.map((toolInvocation: ToolInvocation) => {
                                                                    const projectData = toolInvocation.args as Project;
                                                                    if (projectData && typeof projectData === 'object' && projectData.day !== undefined && projectData.title && projectData.image && projectData.color && projectData.project) {
                                                                        return (
                                                                            <div key={toolInvocation.toolCallId} className="flex-none snap-start w-64">
                                                                                <ProjectCard project={projectData} />
                                                                            </div>
                                                                        );
                                                                    } else {
                                                                        return (
                                                                            <div key={toolInvocation.toolCallId} className="flex-none snap-start w-64 p-4 bg-red-100 dark:bg-red-900/50 rounded-lg">
                                                                                <p className="text-red-600 dark:text-red-300 text-xs">Error: Invalid project data format.</p>
                                                                            </div>
                                                                        );
                                                                    }
                                                                })}
                                                            </div>
                                                        </div>
                                                        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-gray-100 dark:from-zinc-700 to-transparent z-10 pointer-events-none"></div>
                                                    </div>
                                                )}

                                                {/* Show More Button - Conditionally render if exactly 3 project cards were shown */}
                                                {m.role === 'assistant' && projectInvocations.length === 3 && (
                                                    <div className="mt-3 text-center"> {/* Added margin and centering */}
                                                        <Button
                                                            variant="outline" // Less prominent style
                                                            size="sm"
                                                            onClick={async (e) => { // Make async if needed, though append is likely sync
                                                                e.preventDefault();

                                                                // 1. Find the preceding user message
                                                                const precedingUserMessage = messages[index - 1];
                                                                if (!precedingUserMessage || precedingUserMessage.role !== 'user' || typeof precedingUserMessage.content !== 'string') {
                                                                    console.error("Could not find preceding user message for context.");
                                                                    // Optionally, show an error to the user or fallback
                                                                    return;
                                                                }
                                                                const originalQuery = precedingUserMessage.content;

                                                                // 2. Get the days shown in *this* assistant message
                                                                const shownDays = projectInvocations
                                                                    .map(inv => (inv.args as Project)?.day)
                                                                    .filter((day): day is number => typeof day === 'number');

                                                                if (shownDays.length === 0) {
                                                                    console.error("Could not extract shown days from the current message.");
                                                                    return;
                                                                }

                                                                // 3. Call append with the context embedded in the content
                                                                const showMorePayload = {
                                                                    originalQuery: originalQuery,
                                                                    shownDays: shownDays
                                                                };
                                                                await append({
                                                                    role: 'user',
                                                                    // Use a prefix and JSON string; this message content won't be displayed directly
                                                                    // if the backend handles it correctly and doesn't echo it.
                                                                    // The backend should ideally generate the "Showing more..." text.
                                                                    content: `SHOW_MORE_ACTION::${JSON.stringify(showMorePayload)}`,
                                                                    // Remove the data field
                                                                });
                                                            }}
                                                            disabled={isLoading}
                                                            className="mx-auto bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors duration-200"
                                                        >
                                                            Show More Projects
                                                        </Button>
                                                    </div>
                                                )}

                                                {/* Other Tool Invocations */}
                                                {m.toolInvocations?.filter(inv => inv.toolName !== 'displayProjectCard').map(toolInvocation => (
                                                    <div key={toolInvocation.toolCallId} className="text-xs text-gray-500 dark:text-zinc-400 italic mt-2">Tool call: {toolInvocation.toolName}</div>
                                                ))}
                                            </div>
                                        );
                                    })
                                : <p className="text-center text-gray-500 dark:text-zinc-400">Ask me about a specific day or topic (e.g., "Tell me about day 18", "Show me projects about WebGL").</p>}

                            {/* Loading Indicator */}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="p-3 rounded-lg bg-gray-100 dark:bg-zinc-700">
                                        <svg className="animate-spin h-5 w-5 text-gray-500 dark:text-zinc-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </div>
                                </div>
                            )}
                            {/* Error Message */}
                            {error && (
                                <div className="text-red-600 dark:text-red-300 p-3 rounded-lg bg-red-100 dark:bg-red-900/50 mt-2 self-start shadow-sm">
                                    Error: {error.message}
                                </div>
                            )}
                        </div>

                        {/* Input Form - Using shadcn Input and Button */}
                        <form onSubmit={handleSubmit} className="flex gap-3 my-auto py-2 px-1 items-center"> {/* Added items-center */}
                            <Input
                                className="flex-grow" // Keep flex-grow for layout
                                value={input}
                                placeholder="Ask about a specific day..."
                                onChange={handleInputChange}
                                disabled={isLoading}
                            // Removed styling classes handled by shadcn component
                            />
                            <Button
                                type="submit"
                                disabled={isLoading}
                                size="lg" // Use shadcn size prop
                                className="flex items-center justify-center" // Keep flex centering for spinner
                            >
                                {isLoading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    'Send'
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}