import Image from "next/image";
import Link from "next/link";
import { getAllProjects } from '@/lib/markdown';
import { Footer } from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";

interface ProjectCardProps {
    project: {
        day: number;
        image: string;
        title: string;
        color: string;
    };
}

const ProjectCard = ({ project }: ProjectCardProps) => (
    <Link href={`/days/${project.day}`}>
        <div className="cursor-pointer sm:w-full px-4 sm:px-0 w-80">
            <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                    src={project.image}
                    alt={`Day ${project.day}`}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                    priority={project.day <= 6} // Prioritize loading for first 6 images
                />
                <div className="group absolute inset-0 bg-transparent hover:bg-gray-800/70 transition-all duration-300">
                    <div className="p-4 h-full flex flex-col justify-between">
                        <span className="text-2xl sm:text-4xl font-bold text-white">
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

export default async function Home() {
    const projects = await getAllProjects();

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 container mx-auto px-4 py-8 sm:py-16">
                <div className="space-y-6 sm:space-y-8 mb-12">
                <Navbar />
                    <h1 className="text-3xl md:text-8xl text-left">
                        100 Days of Design Engineering
                    </h1>
                    <p className="text-base sm:text-lg text-left text-gray-600 max-w-3xl">
                        Showcase of Alan&apos;s design engineering journey over 100 days.
                    </p>
                </div>

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
                    {projects.map((project) => (
                        <ProjectCard key={project.day} project={project} />
                    ))}
                </section>
            </main>

            <Footer />
        </div>
    );
}