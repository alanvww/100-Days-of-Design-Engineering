import Image from "next/image";
import { Link } from 'next-view-transitions'
import { Project } from "@/types/ProjectTypes";
import { Suspense } from "react";

// Utility functions for generating color data URL
const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1: number, e2: number, e3: number) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63);

const rgbDataURL = (r: number, g: number, b: number) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

// Function to convert hex to RGB
const hexToRGB = (hex: string) => {
    // Remove the hash if present
    hex = hex.replace(/^#/, '');

    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
};

const ProjectCardSkeleton = () => (
    <div className="cursor-pointer px-2 md:px-4 min-w-full w-80 md:w-80">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-200 animate-pulse">
            <div className="p-3 h-full flex flex-col justify-between">
                <div className="text-md bg-gray-300 rounded-full w-24 h-10" />
                <div className="text-lg sm:text-xl bg-gray-300 w-48 h-8" />
            </div>
        </div>
    </div>
);

interface ProjectCardProps {
    project: Project; // Assuming Project type has a color property of type string
}

const ProjectCardContent: React.FC<ProjectCardProps> = ({ project }) => {
    // Convert hex color to RGB and generate data URL
    const rgb = hexToRGB(project.color);
    const blurDataURL = rgbDataURL(rgb.r, rgb.g, rgb.b);

    return (
        <Link href={`/days/${project.day}`} className="cursor-pointer px-2 md:px-4 min-w-full w-80 md:w-80">
            <div className="cursor-pointer px-2 md:px-4 min-w-full w-80 md:w-80">
                <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                        src={project.image}
                        alt={`Day ${project.day}`}
                        width={400}
                        height={400}
                        quality={50}
                        sizes="(min-width: 640px) 400px, 100vw"
                        className="object-cover w-full h-full"
                        priority={true}
                        placeholder='blur'
                        blurDataURL={blurDataURL}
                    />
                    <div className="group absolute inset-0 bg-transparent hover:bg-gray-800/70 transition-all duration-300">
                        <div className="p-3 h-full flex flex-col justify-between">
                            <span className="text-md text-white bg-gray-900/60 rounded-full w-fit px-3 py-2">
                                Day {project.day}
                            </span>
                            <span className="text-lg sm:text-xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {project.title}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
    <Suspense fallback={<ProjectCardSkeleton />}>
        <ProjectCardContent project={project} />
    </Suspense>
);