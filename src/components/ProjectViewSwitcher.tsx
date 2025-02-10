'use client'
import React, { useState, useMemo } from 'react';
import { Project } from '@/types/ProjectTypes';
import { PaginatedProjects } from '@/components/PaginatedProjects';
import { ProjectCard } from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { LayoutGrid, ScrollText, ArrowUpDown } from 'lucide-react';

interface ProjectViewProps {
  projects: Project[];
}

interface GroupedProjects {
  [key: string]: Project[];
}

const ProjectViewSwitcher: React.FC<ProjectViewProps> = ({ projects }) => {
  const [viewMode, setViewMode] = useState<'paginated' | 'carousel'>('paginated');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const groupedProjects = useMemo(() => {
    return projects.reduce((acc: GroupedProjects, project) => {
      const projectType = project.project;
      if (!acc[projectType]) {
        acc[projectType] = [];
      }
      acc[projectType].push(project);
      return acc;
    }, {});
  }, [projects]);

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.day - b.day;
      }
      return b.day - a.day;
    });
  }, [projects, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  const CarouselView = () => {
    return (
      <div className="space-y-12">
        {Object.entries(groupedProjects).map(([projectType, projectGroup]) => (
          <div key={projectType} className="space-y-4">
            <h2 className="text-2xl font-semibold px-4">{projectType}</h2>
            <div className="relative">
              <div className="scrollbar-none -mx-4 px-4">
                <div className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4">
                  {projectGroup.map((project) => (
                    <div
                      key={project.day}
                      className="flex-none snap-start px-2 first:pl-4 last:pr-4 w-80"
                    >
                      <ProjectCard project={project} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className={`flex  items-center px-4 ${viewMode === 'paginated' ? 'justify-between' : 'justify-end'}`}>
        {viewMode === 'paginated' && (
          <Button
            variant="outline"
            onClick={toggleSortOrder}
            className="flex items-center gap-2"
          >
            <ArrowUpDown className="w-4 h-4" />
            <span>Sort Days: {sortOrder === 'asc' ? 'Earliest First' : 'Latest First'}</span>
          </Button>
        )}
        <div className="flex space-x-2">
          <Button
            variant={viewMode === 'paginated' ? 'default' : 'outline'}
            onClick={() => setViewMode('paginated')}
            className="flex items-center gap-2"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Days</span>
          </Button>
          <Button
            variant={viewMode === 'carousel' ? 'default' : 'outline'}
            onClick={() => setViewMode('carousel')}
            className="flex items-center gap-2"
          >
            <ScrollText className="w-4 h-4" />
            <span>Projects</span>
          </Button>
        </div>
      </div>
      {viewMode === 'paginated' ? (
        <PaginatedProjects projects={sortedProjects} />
      ) : (
        <CarouselView />
      )}
    </div>
  );
};

export default ProjectViewSwitcher;