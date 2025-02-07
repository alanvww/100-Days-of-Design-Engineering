import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/ProjectTypes";

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
    <Link href={`/days/${project.day}`} className="cursor-pointer px-2 md:px-4 min-w-full w-80 md:w-80">
        <div className="cursor-pointer px-2 md:px-4 min-w-full w-80 md:w-80">
            <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                    src={project.image}
                    alt={`Day ${project.day}`}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                    priority={project.day <= 6}
                />
                <div className="group absolute inset-0 bg-transparent hover:bg-gray-800/70 transition-all duration-300">
                    <div className="p-3 h-full flex flex-col justify-between">
                        <span className="text-md text-white bg-opacity-65 bg-gray-900  rounded-full w-fit px-3 py-2">
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