import Image from "next/image";
import { Link } from 'next-view-transitions'
import { Project } from "@/types/ProjectTypes";
import { Suspense } from "react";
import { motion } from "motion/react";
import { Scale } from "lucide-react";

// Utility functions for generating color data URL
const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1: number, e2: number, e3: number) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63);

export const rgbDataURL = (r: number, g: number, b: number) => // Exported
    `data:image/gif;base64,R0lGODlhAQABAPAA${triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

// Function to convert hex to RGB
export const hexToRGB = (hex: string) => { // Exported
    // Remove the hash if present
    hex = hex.replace(/^#/, '');

    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
};

const ProjectCardSkeleton = () => (
    <motion.div
        className="cursor-pointer px-2 md:px-4 min-w-full w-80 md:w-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse">
            <div className="p-3 h-full flex flex-col justify-between">
                <div className="text-md bg-gray-300 dark:bg-gray-700 rounded-full w-24 h-10" />
                <div className="text-lg sm:text-xl bg-gray-300 dark:bg-gray-700 w-48 h-8" />
            </div>
        </div>
    </motion.div>
);

interface ProjectCardProps {
    project: Project;
    className?: string;
}

const ProjectCardContent: React.FC<ProjectCardProps> = ({ project, className }) => {
    // Convert hex color to RGB and generate data URL
    const rgb = hexToRGB(project.color);
    const blurDataURL = rgbDataURL(rgb.r, rgb.g, rgb.b);

    // Animation variants
    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 30,
                duration: 0.4
            }
        },
        hover: {
            scale: 1.05,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 20
            }
        }
    } as const;

    const titleVariants = {
        rest: {
            opacity: 0,
            y: 10
        },
        hover: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.1,
                duration: 0.2
            }
        }
    };

    return (
        <Link href={project.day == 100 ? `#` : `/days/${project.day}`} className="group cursor-pointer px-2 md:px-4 min-w-full w-60 md:w-80">
            <motion.div
                className="cursor-pointer px-2 md:px-4 min-w-full"
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={cardVariants}
                layout
            >
                <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                        src={project.image}
                        alt={`Day ${project.day}`}
                        width={400}
                        height={400}
                        quality={50}
                        sizes="(min-width: 640px) 400px, 100vw"
                        className="object-cover w-full h-full group-hover:scale-150 transition-transform duration-300 ease-in-out"
                        priority={true}
                        placeholder='blur'
                        blurDataURL={blurDataURL}
                    />
                    <motion.div
                        className="absolute inset-0"
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                    >
                        <div className="h-full flex flex-col justify-between">
                            <motion.span
                                className="m-3 text-md text-white bg-gray-900/60 dark:bg-black/60 rounded-full w-fit px-3 py-2"
                                whileHover={{ scale: 1.05 }}
                            >
                                Day {project.day}
                            </motion.span>
                            <motion.span
                                className="p-3 text-lg sm:text-xl text-gray-900 dark:text-white bg-transparent group-hover:bg-gradient-to-b from-transparent from-0% to-30% to-background/80 dark:to-gray-900/80"
                                variants={titleVariants}
                            >
                                <span className="inline-block mt-6">
                                    {project.title}
                                </span>
                            </motion.span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </Link>
    );
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
    <Suspense fallback={<ProjectCardSkeleton />}>
        <ProjectCardContent project={project} />
    </Suspense>
);
