'use client'
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Project } from '@/types/ProjectTypes';
import { ProjectList } from '@/components/ProjectList';
import { ProjectCard } from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { SquaresFour, Rows, CaretDown, CaretUp, ArrowsDownUp } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { Link, useTransitionRouter } from 'next-view-transitions';

interface ProjectViewProps {
  projects: Project[];
  initialPage?: number;
}

interface GroupedProjects {
  [key: string]: Project[];
}

const ProjectViewSwitcher: React.FC<ProjectViewProps> = ({ projects, initialPage = 1 }) => {
  const [viewMode, setViewMode] = useState<'paginated' | 'carousel'>('paginated');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Get the transition router
  const router = useTransitionRouter();

  // Track if transition is in progress
  const isTransitionInProgress = useRef(false);

  // Reset transition state on cleanup
  useEffect(() => {
    return () => {
      isTransitionInProgress.current = false;
    };
  }, []);

  // Group projects by project type
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

  // Sort projects by day number
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.day - b.day;
      }
      return b.day - a.day;
    });
  }, [projects, sortOrder]);

  // Handle sort order toggle
  const toggleSortOrder = () => {
    // Skip if a transition is already in progress
    if (isTransitionInProgress.current) return;

    isTransitionInProgress.current = true;
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');

    // Reset the transition flag after a delay
    setTimeout(() => {
      isTransitionInProgress.current = false;
    }, 300);
  };

  // Handle view mode toggle
  const changeViewMode = (mode: 'paginated' | 'carousel') => {
    // Skip if a transition is already in progress
    if (isTransitionInProgress.current) return;

    isTransitionInProgress.current = true;
    setViewMode(mode);

    // Reset the transition flag after a delay
    setTimeout(() => {
      isTransitionInProgress.current = false;
    }, 300);
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

  // CarouselView component
  const CarouselView = () => {
    // State to track which project groups are expanded
    const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({});

    // Track if carousel transition is in progress
    const isCarouselTransitionInProgress = useRef(false);

    // Toggle expanded state for project groups
    const toggleGroupExpansion = (projectType: string) => {
      // Skip if a transition is already in progress
      if (isCarouselTransitionInProgress.current) return;

      isCarouselTransitionInProgress.current = true;
      setExpandedGroups(prev => ({
        ...prev,
        [projectType]: !prev[projectType]
      }));

      // Reset the transition flag after a delay
      setTimeout(() => {
        isCarouselTransitionInProgress.current = false;
      }, 300);
    };

    // Animation variants
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.3,
          delayChildren: 0.1,
        }
      }
    };

    const sectionVariants = {
      hidden: { opacity: 0, y: 40 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 30,
          delay: i * 0.1,
        }
      })
    };

    const headingVariants = {
      hidden: { opacity: 0, x: -30 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          stiffness: 500,
          damping: 30
        }
      }
    };

    const carouselVariants = {
      hidden: { opacity: 0, scale: 0.98 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.4,
          staggerChildren: 0.08
        }
      }
    };

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
          delay: i * 0.05
        }
      })
    };

    const gridVariants = {
      collapsed: {
        height: 0,
        opacity: 0,
        transition: {
          height: { duration: 0.3, ease: "easeInOut" },
          opacity: { duration: 0.2 }
        }
      },
      expanded: {
        height: "auto",
        opacity: 1,
        transition: {
          height: { duration: 0.3, ease: "easeInOut" },
          opacity: { duration: 0.3, delay: 0.1 },
          staggerChildren: 0.05,
          delayChildren: 0.1
        }
      }
    };

    return (
      <motion.div
        className="space-y-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {Object.entries(groupedProjects).map(([projectType, projectGroup], sectionIndex) => {
          const isExpanded = expandedGroups[projectType] || false;

          return (
            <motion.div
              key={projectType}
              className="space-y-2 border border-zinc-200 dark:border-zinc-800 px-2 py-6 rounded-2xl transition-colors duration-300"
              variants={sectionVariants}
              custom={sectionIndex}
            >
              {/* Section heading */}
              <div className="flex justify-between items-center">
                <motion.h2
                  className="text-xl sm:text-3xl sm:ml-2 font-light px-6 p-1"
                  variants={headingVariants}
                >
                  {projectType}
                  <span className="mx-3 my-6 px-2 py-1 rounded-full text-sm align-middle justify-center bg-gray-200 dark:bg-gray-600 text-zinc-500 dark:text-zinc-200 font-normal">
                    {projectGroup.length}
                  </span>
                </motion.h2>

                <motion.button
                  className="hidden sm:flex mr-6 py-1 px-3 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-sm items-center gap-1 transition-colors duration-300"
                  onClick={() => toggleGroupExpansion(projectType)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isExpanded ? (
                    <>
                      <span>Collapse</span>
                      <CaretUp size={16} />
                    </>
                  ) : (
                    <>
                      <span>View All</span>
                      <CaretDown size={16} />
                    </>
                  )}
                </motion.button>
              </div>

              <AnimatePresence mode="wait">
                {/* Carousel view (shown when not expanded) */}
                {!isExpanded && (
                  <div className="relative" key={`carousel-${projectType}`}>
                    <div className="absolute left-0 top-0 bottom-0 w-3 md:w-9 bg-gradient-to-r from-background to-transparent dark:from-gray-900 z-10 pointer-events-none transition-colors duration-300"></div>
                    <div className="scrollbar-none -mx-4 px-4">
                      <motion.div
                        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
                        variants={carouselVariants}
                      >
                        {projectGroup.map((project, index) => (
                          <motion.div
                            key={`card-${project.day}`}
                            className="flex-none snap-start px-2 w-80"
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

                            <ProjectCard project={project} index={index} />

                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-3 md:w-9 bg-gradient-to-l from-background to-transparent dark:from-gray-900 z-10 pointer-events-none transition-colors duration-300"></div>
                  </div>
                )}

                {/* Grid view (shown when expanded) */}
                {isExpanded && (
                  <motion.div
                    key={`grid-${projectType}`}
                    className="overflow-hidden"
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    variants={gridVariants}
                  >
                    <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 px-4 pt-2">
                      {projectGroup.map((project, index) => (
                        <motion.div
                          key={`grid-item-${project.day}`}
                          className="w-full"
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
                          <ProjectCard project={project} index={index} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      <div className={`flex px-8 ${viewMode === 'paginated' ? 'flex-col-reverse gap-2 items-end md:flex-row justify-stretch md:justify-between' : 'justify-end'}`}>
        {viewMode === 'paginated' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant={'outline'}
              onClick={toggleSortOrder}
              className="flex items-center gap-2 bg-white dark:bg-gray-800 dark:border-gray-700 text-muted-foreground hover:text-foreground hover:bg-muted dark:text-white dark:hover:text-foreground dark:hover:bg-muted/80 transition-colors duration-300"
              disabled={isTransitionInProgress.current}
            >
              <ArrowsDownUp className="w-4 h-4" />
              <span>Sort Days: {sortOrder === 'asc' ? 'Earliest First' : 'Latest First'}</span>
            </Button>
          </motion.div>
        )}
        <div className="flex space-x-2 justify-end">
          <Button
            variant={viewMode === 'paginated' ? 'default' : 'destructive'}
            onClick={() => changeViewMode('paginated')}
            disabled={isTransitionInProgress.current}
            className={cn("flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-muted dark:text-white dark:hover:text-foreground dark:hover:bg-muted/80 transition-colors duration-300",
              viewMode === 'paginated' ? 'bg-gray-100 dark:bg-gray-300 dark:text-gray-900' : 'bg-white dark:bg-gray-800 border dark:border-gray-700'
            )}
          >
            <SquaresFour className="w-4 h-4" />
            <span>Days</span>
          </Button>
          <Button
            variant={viewMode === 'carousel' ? 'default' : 'secondary'}
            onClick={() => changeViewMode('carousel')}
            disabled={isTransitionInProgress.current}
            className={cn("flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-muted dark:text-white dark:hover:text-foreground dark:hover:bg-muted/80 transition-colors duration-300",
              viewMode === 'carousel' ? 'bg-gray-100 dark:bg-gray-300 dark:text-gray-900' : 'bg-white dark:bg-gray-800 border dark:border-gray-700'
            )}
          >
            <Rows className="w-4 h-4" />
            <span>Projects</span>
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'paginated' ? (
          <motion.div
            key="paginated"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={viewTransitionVariants}
          >
            <ProjectList
              initialProjects={sortedProjects}
              initialPage={initialPage}
              itemsPerPage={12}
            />
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