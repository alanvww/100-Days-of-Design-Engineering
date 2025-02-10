'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Project } from "@/types/ProjectTypes";
import { ProjectCard } from "./ProjectCard";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface ProjectPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

interface PaginatedProjectsProps {
    projects: Project[];
}

const ITEMS_PER_PAGE = 8;

const ProjectPagination: React.FC<ProjectPaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange
}) => {
    const router = useRouter();
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePageClick = (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
        e.preventDefault();
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
            const url = new URL(window.location.href);
            url.searchParams.set('page', page.toString());
            router.push(url.pathname + url.search);
        }
    };

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

                {pages.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            href="#"
                            onClick={(e) => handlePageClick(e, page)}
                            isActive={currentPage === page}
                            aria-current={currentPage === page ? "page" : undefined}
                        >
                            {page}
                        </PaginationLink>
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

export const PaginatedProjects: React.FC<PaginatedProjectsProps> = ({ projects }) => {
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

    return (
        <>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
                {currentProjects.map((project) => (
                    <ProjectCard key={project.day} project={project} />
                ))}
            </section>

            <ProjectPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </>
    );
};