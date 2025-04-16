'use client'

import { useMemo, useState, useTransition } from 'react';
import { Project } from "@/types/ProjectTypes";
import { ProjectCard } from "./ProjectCard";
import { motion } from "motion/react";
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface ProjectListProps {
    initialProjects: Project[];
    initialPage?: number;
    itemsPerPage?: number;
}

// Separate component that uses the `use()` hook
function ProjectListContent({
    projects,
    currentPage
}: {
    projects: Project[];
    currentPage: number;
}) {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        }
    };

    return (
        <motion.section
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={`page-${currentPage}`}
        >
            {projects.map((project, index) => (
                <motion.div
                    key={project.day}
                    variants={itemVariants}
                    custom={index}
                >
                    <ProjectCard project={project} index={index} />
                </motion.div>
            ))}
        </motion.section>
    );
}

// Fallback component for ErrorBoundary
function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
    return (
        <div className="p-4 bg-red-50 border border-red-300 rounded-md text-red-700">
            <p className="text-lg font-semibold">Something went wrong:</p>
            <p className="mb-4">{error.message}</p>
            <button
                className="px-4 py-2 bg-red-600 text-white rounded-md"
                onClick={resetErrorBoundary}
            >
                Try again
            </button>
        </div>
    );
}

// Main component
export function ProjectList({
    initialProjects,
    initialPage = 1,
    itemsPerPage = 12
}: ProjectListProps) {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [isPending, startTransition] = useTransition();

    // Calculate pagination based on initial projects
    const totalPages = Math.ceil(initialProjects.length / itemsPerPage);

    // Calculate current page projects without using `use()`
    const currentProjects = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return initialProjects.slice(startIndex, endIndex);
    }, [initialProjects, currentPage, itemsPerPage]);

    // Handle page change
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            startTransition(() => {
                setCurrentPage(newPage);

                // Update URL without full navigation
                const url = new URL(window.location.href);
                url.searchParams.set('page', newPage.toString());
                window.history.pushState({}, '', url.toString());
            });
        }
    };

    return (
        <div className="space-y-6">
            {/* Loading indicator */}
            {isPending && (
                <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
                    Loading...
                </div>
            )}

            {/* Projects grid with error boundary */}
            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => setCurrentPage(1)}
            >
                <ProjectListContent
                    projects={currentProjects}
                    currentPage={currentPage}
                />
            </ErrorBoundary>

            {/* Pagination UI */}
            <Pagination className="my-8">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(currentPage - 1);
                            }}
                            className={currentPage === 1 || isPending ? "pointer-events-none opacity-50" : ""}
                            aria-disabled={currentPage === 1 || isPending}
                        />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                        <PaginationItem key={pageNum}>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(pageNum);
                                }}
                                isActive={pageNum === currentPage}
                                aria-current={pageNum === currentPage ? "page" : undefined}
                                className={`${
                                    isPending ? "pointer-events-none opacity-50" : ""
                                } ${
                                    pageNum === currentPage
                                        ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-white dark:hover:text-white dark:bg-gray-800 dark:border dark:border-gray-700 dark:text-white " // Active styles (light: primary, dark: gray)
                                        : "dark:hover:text-white hover:text-gray-600  dark:hover:bg-gray-800" // Default hover styles
                                }`}
                                aria-disabled={isPending}
                            >
                                {pageNum}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(currentPage + 1);
                            }}
                            className={currentPage === totalPages || isPending ? "pointer-events-none opacity-50" : ""}
                            aria-disabled={currentPage === totalPages || isPending}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}