
import { getAllProjects } from '@/lib/markdown';
import { Footer } from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import ProjectViewSwitcher from "@/components/ProjectViewSwitcher";
import { Project } from "@/types/ProjectTypes";
import * as motion from "motion/react-client";

async function getProjects(): Promise<Project[]> {
    const projects = await getAllProjects();
    return projects;
}

export default async function Home() {
    const projects = await getProjects();

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 container mx-auto px-4 md:px-8 md:py-8 py-16">
                <div className="md:space-y-6 space-y-8 mb-12">
                    <Navbar />
                    <motion.h1
                        className="text-3xl md:text-6xl text-left px-2 md:px-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                            delay: 0.2
                        }}
                    >
                        100 Days of Design Engineering
                    </motion.h1>
                    <motion.p
                        className="text-base md:text-lg text-left text-gray-600 px-2 md:px-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                            delay: 0.3
                        }}
                    >
                        Showcase of Alan&apos;s design engineering journey over 100 days.
                    </motion.p>
                </div>

                <ProjectViewSwitcher projects={projects} />
            </main>

            <Footer />
        </div>
    );
}
