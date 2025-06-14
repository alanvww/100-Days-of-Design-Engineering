'use client'
import React, { useState, useMemo, useEffect } from 'react';
import Image from "next/image"; // Import Image
import { useRouter } from 'next/navigation'; // Import useRouter
import Confetti from 'react-confetti'; // Import Confetti
import { Project } from '@/types/ProjectTypes';
import { PaginatedProjects } from '@/components/PaginatedProjects';
import { ProjectCard } from '@/components/ProjectCard'; // Removed helper imports, not needed here anymore
import { Button } from '@/components/ui/button';
import { SquaresFour, Rows, CaretDown, CaretUp, ArrowsDownUp } from '@phosphor-icons/react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { cn } from '@/lib/utils';
import { pre } from 'motion/react-client';

interface ProjectViewProps {
  projects: Project[];
}

interface GroupedProjects {
  [key: string]: Project[];
}

const ProjectViewSwitcher: React.FC<ProjectViewProps> = ({ projects }) => {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'paginated' | 'carousel'>('paginated');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Effect to get window size for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handler for Day 100 click
  const handleDay100Click = () => {
    setShowConfetti(prev => !prev);
    setTimeout(() => {
      setShowConfetti(false);
    }, 7000);
  };

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

  // Create the combined list including the potential Day 100 placeholder
  const allDisplayProjects = useMemo(() => {
    const currentProjects = [...projects];
    if (projects.length === 99) {
      const day100Placeholder: Project = {
        day: 100,
        title: "🎉The Finale!",
        project: "Celebration",
        image: '/assets/day-100/1.png',
        color: '#FFD700',
      };
      currentProjects.push(day100Placeholder);
    }
    return currentProjects;
  }, [projects]);


  const sortedProjects = useMemo(() => {
    // Sort the combined list
    return [...allDisplayProjects].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.day - b.day;
      }
      return b.day - a.day;
    });
    // Depend on the combined list and sort order
  }, [allDisplayProjects, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  const CarouselView = () => {
    // State to track which project groups are expanded
    const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({});

    // Toggle expanded state for a specific group
    const toggleGroupExpansion = (projectType: string) => {
      setExpandedGroups(prev => ({
        ...prev,
        [projectType]: !prev[projectType]
      }));
    };

    // Animation variants for the container of all sections
    const containerVariants: Variants = {
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
    const sectionVariants: Variants = {
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
    const headingVariants: Variants = {
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
    const carouselVariants: Variants = {
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
    const itemVariants: Variants = {
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

    // Grid container variants for expanded view
    const gridVariants: Variants = {
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
        className="space-y-16" // Increased spacing between sections
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

              <AnimatePresence mode="sync">

                {/* Carousel view (shown when not expanded) */}
                {!isExpanded && (
                  <div className="relative" key="carousel">
                    <div className="absolute left-0 top-0 bottom-0 w-3 md:w-9 bg-gradient-to-r from-background to-transparent dark:from-gray-900 z-10 pointer-events-none transition-colors duration-300"></div>
                    <div className="scrollbar-none -mx-4 px-4">
                      <motion.div
                        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
                        variants={carouselVariants}
                      >
                        {/* Removed Day 100 filter */}
                        {projectGroup
                          .map((project, index) => (
                            <motion.div
                              key={project.day}
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
                              <ProjectCard project={project} />
                            </motion.div>
                          ))}
                      </motion.div>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-3 md:w-9 bg-gradient-to-l from-background to-transparent dark:from-gray-900 z-10 pointer-events-none transition-colors duration-300"></div>
                  </div>
                )}

                {/* Grid view (shown when expanded) */}
                <motion.div
                  key="grid"
                  className="overflow-hidden"
                  initial="collapsed"
                  animate={isExpanded ? "expanded" : "collapsed"}
                  variants={gridVariants}
                >
                  <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 px-4 pt-2">
                    {/* Removed Day 100 filter */}
                    {projectGroup
                      .map((project, index) => (
                        <motion.div
                          key={project.day}
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
                          <ProjectCard project={project} />
                        </motion.div>
                      ))}
                  </motion.div>
                </motion.div>
              </AnimatePresence>

            </motion.div>

          );
        })
        }
      </motion.div >

    );
  };


  // Animation variants for view transitions
  const viewTransitionVariants: Variants = {
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
    <div className="space-y-6 relative"> {/* Added relative positioning */}
      {/* Render Confetti at the top level */}
      {showConfetti && windowSize.width > 0 && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          tweenDuration={2800}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }} // Ensure it's full screen and above everything
        />
      )}
      <div className={`flex px-8 ${viewMode === 'paginated' ? 'flex-col-reverse gap-2  items-end md:flex-row justify-stretch md:justify-between' : 'justify-end'}`}>
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
              className="flex items-center gap-2    bg-white dark:bg-gray-800 dark:border-gray-700         text-muted-foreground hover:text-foreground hover:bg-muted dark:text-white dark:hover:text-foreground dark:hover:bg-muted/80 transition-colors duration-300"
            >
              <ArrowsDownUp className="w-4 h-4" />
              <span>Sort Days: {sortOrder === 'asc' ? 'Earliest First' : 'Latest First'}</span>
            </Button>
          </motion.div>
        )}
        <div className="flex space-x-2 justify-end ">
          <Button
            variant={viewMode === 'paginated' ? 'default' : 'destructive'}
            onClick={() => setViewMode('paginated')}
            className={cn("flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-muted dark:text-white dark:hover:text-foreground dark:hover:bg-muted/80 transition-colors duration-300",
              viewMode === 'paginated' ? 'bg-gray-100 dark:bg-gray-300 dark:text-gray-900' : 'bg-white dark:bg-gray-800 border dark:border-gray-700'
            )}
          >
            <SquaresFour className="w-4 h-4" />
            <span>Days</span>
          </Button>
          <Button
            variant={viewMode === 'carousel' ? 'default' : 'secondary'}
            onClick={() => setViewMode('carousel')}
            className={cn("flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-muted dark:text-white dark:hover:text-foreground dark:hover:bg-muted/80 transition-colors duration-300",
              viewMode === 'carousel' ? 'bg-gray-100 dark:bg-gray-300 dark:text-gray-900' : 'bg-white dark:bg-gray-800 border dark:border-gray-700'
            )}          >
            <Rows className="w-4 h-4" />
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
            {/* Pass the sorted list (potentially including Day 100) */}
            <PaginatedProjects
              projects={sortedProjects} // Pass the sorted array
              onDay100Click={handleDay100Click}
            // Removed totalFetchedProjects prop
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
