'use client'

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransitionRouter } from 'next-view-transitions'
import { Project } from "@/types/ProjectTypes";
import { ProjectCard } from "./ProjectCard";
import { motion } from "motion/react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis, // Import PaginationEllipsis
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface ProjectPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    siblingCount?: number; // Optional: Number of pages around the current page
}

interface PaginatedProjectsProps {
    projects: Project[];
}

const ITEMS_PER_PAGE = 12;

const ProjectPagination: React.FC<ProjectPaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    siblingCount = 1 // Default to 1 sibling page on each side
}) => {
    const router = useTransitionRouter();

    const handlePageClick = (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
        e.preventDefault();
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
            const url = new URL(window.location.href);
            url.searchParams.set('page', page.toString());
            router.push(url.pathname + url.search);
        }
    };

    // Logic to generate pagination range with ellipses
    const paginationRange = (): (number | '...')[] => {
        const totalPageNumbers = siblingCount + 5; // siblingCount + firstPage + lastPage + currentPage + 2*ellipsis

        // Case 1: Number of pages is less than the page numbers we want to show
        if (totalPageNumbers >= totalPages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

        // We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPages.
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        // Case 2: No left dots to show, but right dots to be shown
        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 2 + 2 * siblingCount;
            const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
            return [...leftRange, '...', totalPages];
        }

        // Case 3: No right dots to show, but left dots to be shown
        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 2 + 2 * siblingCount;
            const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + 1 + i);
            return [firstPageIndex, '...', ...rightRange];
        }

        // Case 4: Both left and right dots to be shown
        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);
            return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
        }

        // Default case (should not happen with the logic above, but for safety)
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    };

    const pages = paginationRange();

    return (
        <Pagination className="my-2 py-6">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => handlePageClick(e, currentPage - 1)}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        aria-disabled={currentPage === 1}
                    />
                </PaginationItem>

                {pages.map((page, index) => (
                    <PaginationItem key={index}>
                        {page === '...' ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                href="#"
                                onClick={(e) => handlePageClick(e, page as number)}
                                isActive={currentPage === page}
                                aria-current={currentPage === page ? "page" : undefined}
                                className={currentPage === page ? "dark:bg-gray-800 dark:border-gray-700 dark:text-white " : ""}
                            >
                                {page}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => handlePageClick(e, currentPage + 1)}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        aria-disabled={currentPage === totalPages}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

// Component that uses useSearchParams
const ProjectPaginator: React.FC<PaginatedProjectsProps> = ({ projects }) => {
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState<number>(() => {
        const pageParam = searchParams.get('page');
        const parsedPage = pageParam ? parseInt(pageParam, 10) : 1;
        return isNaN(parsedPage) ? 1 : parsedPage;
    });

    const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
            const url = new URL(window.location.href);
            url.searchParams.set('page', '1');
            window.history.replaceState({}, '', url.pathname + url.search);
        }
    }, [projects.length, currentPage, totalPages]);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProjects = projects.slice(startIndex, endIndex);

    // Animation variants for staggered grid
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
        <>
            <motion.section
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={currentPage} // Re-animate when page changes
            >
                {currentProjects.map((project, index) => (
                    <motion.div
                        key={project.day}
                        variants={itemVariants}
                        custom={index}
                    >
                        <ProjectCard project={project} />
                    </motion.div>
                ))}
            </motion.section>

            <ProjectPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </>
    );
};

// Main component that wraps the paginator with Suspense
export const PaginatedProjects: React.FC<PaginatedProjectsProps> = ({ projects }) => {
    return (
        <Suspense fallback={<div className="py-10 text-center text-zinc-600 dark:text-zinc-300">Loading projects...</div>}>
            <ProjectPaginator projects={projects} />
        </Suspense>
    );
};
