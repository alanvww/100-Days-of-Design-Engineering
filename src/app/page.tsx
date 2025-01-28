import Image from "next/image";
import Link from "next/link";
import { getAllProjects } from '@/lib/markdown';

const ProjectCard = ({ project }) => (
    <Link href={`/days/${project.day}`}>
        <div className="group relative transition-all">
            <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                    src={project.image}
                    alt={`Day ${project.day}`}
                    width={400}
                    height={400}
                    className="object-cover"
                />
                <div className="transition-all absolute  inset-0 hover:bg-black/30 flex justify-items-start justify-start">
                    <span className="text-4xl m-4 font-bold text-white">
                        Day {project.day}
                    </span>
                </div>
            </div>
        </div>
    </Link>
);

export default async function Home() {
    const projects = await getAllProjects();

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1 className="text-4xl font-bold">100 Days of Design Engineering</h1>
                <p className="text-lg text-center sm:text-left">
                    Showcase of Alan&lsquo;s design engineering journey over 100 days.
                </p>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <ProjectCard key={project.day} project={project} />
                    ))}
                </section>
            </main>
        </div>
    );
}
