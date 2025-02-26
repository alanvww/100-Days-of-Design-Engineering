'use client'
import React, { useState, useMemo } from 'react';
import { Project } from '@/types/ProjectTypes';
import { PaginatedProjects } from '@/components/PaginatedProjects';
import { ProjectCard } from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { LayoutGrid, ScrollText, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
    // Animation variants for the container of all sections
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          staggerChildren: 0.6, // Longer delay between groups
          delayChildren: 0.2,
          when: "beforeChildren"
        }
      }
    };

    // Animation variants for each section (project type)
    const sectionVariants = {
      hidden: { opacity: 0, y: 40 },
      visible: (i: number) => ({ 
        opacity: 1, 
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 30,
          delay: i * 0.2, // Additional delay based on section index
          staggerChildren: 0.1,
          when: "beforeChildren"
        }
      })
    };

    // Animation variants for the heading
    const headingVariants = {
      hidden: { opacity: 0, x: -30 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { 
          type: "spring",
          stiffness: 500,
          damping: 30,
          duration: 0.5 
        }
      }
    };

    // Animation variants for the carousel container
    const carouselVariants = {
      hidden: { opacity: 0, scale: 0.98 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: 0.4,
          staggerChildren: 0.08, // Stagger the appearance of items
          delayChildren: 0.1
        }
      }
    };

    // Animation variants for each project card
    const itemVariants = {
      hidden: { opacity: 0, scale: 0.8, y: 20 },
      visible: (i: number) => ({ 
        opacity: 1, 
        scale: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 25,
          delay: i * 0.05 // Additional delay based on item index
        }
      })
    };

    return (
      <motion.div 
        className="space-y-16" // Increased spacing between sections
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {Object.entries(groupedProjects).map(([projectType, projectGroup], sectionIndex) => (
          <motion.div 
            key={projectType} 
            className="space-y-4"
            variants={sectionVariants}
            custom={sectionIndex}
          >
            <motion.h2 
              className="text-2xl font-semibold px-4"
              variants={headingVariants}
            >
              {projectType}
            </motion.h2>
            <div className="relative">
              <div className="scrollbar-none -mx-4 px-4">
                <motion.div 
                  className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
                  variants={carouselVariants}
                >
                  {projectGroup.map((project, index) => (
                    <motion.div
                      key={project.day}
                      className="flex-none snap-start px-2 first:pl-4 last:pr-4 w-80"
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ 
                        scale: 1.03, 
                        transition: { 
                          type: "spring", 
                          stiffness: 400, 
                          damping: 10 
                        } 
                      }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  };


  // Animation variants for view transitions
  const viewTransitionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className={`flex px-8 ${viewMode === 'paginated' ? 'flex-col-reverse gap-2  items-end md:flex-row justify-stretch md:justify-between' : 'justify-end'}`}>
        {viewMode === 'paginated' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="outline"
              onClick={toggleSortOrder}
              className="flex items-center gap-2"
            >
              <ArrowUpDown className="w-4 h-4" />
              <span>Sort Days: {sortOrder === 'asc' ? 'Earliest First' : 'Latest First'}</span>
            </Button>
          </motion.div>
        )}
        <div className="flex space-x-2 justify-end">
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
      
      <AnimatePresence mode="popLayout">
        {viewMode === 'paginated' ? (
          <motion.div
            key="paginated"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={viewTransitionVariants}
          >
            <PaginatedProjects projects={sortedProjects} />
          </motion.div>
        ) : (
          <motion.div
            key="carousel"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={viewTransitionVariants}
          >
            <CarouselView />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectViewSwitcher;
