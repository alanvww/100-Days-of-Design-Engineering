'use client'
import React, { useState, useMemo } from 'react';
import { Project } from '@/types/ProjectTypes';
import { PaginatedProjects } from '@/components/PaginatedProjects';
import { ProjectCard } from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { LayoutGrid, ScrollText } from 'lucide-react';

interface ProjectViewProps {
  projects: Project[];
}

interface GroupedProjects {
  [key: string]: Project[];
}

const ProjectViewSwitcher: React.FC<ProjectViewProps> = ({ projects }) => {
  const [viewMode, setViewMode] = useState<'paginated' | 'carousel'>('paginated');
  
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
  
  const CarouselView = () => {
    return (
      <div className="space-y-12">
        {Object.entries(groupedProjects).map(([projectType, projectGroup]) => (
          <div key={projectType} className="space-y-4">
            <h2 className="text-2xl font-semibold px-4">{projectType}</h2>
            <div className="relative">
              {/* Improved scroll container with better snapping behavior */}
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
      <div className="flex justify-end space-x-2 px-4">
        <Button
          variant={viewMode === 'paginated' ? 'default' : 'outline'}
          onClick={() => setViewMode('paginated')}
          className="flex items-center"
        >
          <LayoutGrid className="w-4 h-4" />
          <span>Days</span>
        </Button>
        <Button
          variant={viewMode === 'carousel' ? 'default' : 'outline'}
          onClick={() => setViewMode('carousel')}
          className="flex items-center"
        >
          <ScrollText className="w-4 h-4" />
          <span>Projects</span>
        </Button>
      </div>

      {viewMode === 'paginated' ? (
        <PaginatedProjects projects={projects} />
      ) : (
        <CarouselView />
      )}
    </div>
  );
};

export default ProjectViewSwitcher;