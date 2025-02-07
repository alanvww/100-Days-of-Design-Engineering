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
              <div className="flex overflow-x-auto space-x-4 pb-4 snap-x snap-mandatory">
                {projectGroup.map((project) => (
                  <div key={project.day} className="p-8">
                    <ProjectCard project={project} />
                  </div>
                ))}
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
          className="flex items-center space-x-2"
        >
          <LayoutGrid className="w-4 h-4" />
          <span>Days</span>
        </Button>
        <Button
          variant={viewMode === 'carousel' ? 'default' : 'outline'}
          onClick={() => setViewMode('carousel')}
          className="flex items-center space-x-2"
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