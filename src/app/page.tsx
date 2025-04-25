
import { getAllProjectsAction } from '@/app/actions/projects';
import { ProjectFrontmatter } from '@/lib/markdown';
import { Footer } from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import ProjectViewSwitcher from "@/components/ProjectViewSwitcher";
import * as motion from "motion/react-client";


export default async function Home() {
    const projects: ProjectFrontmatter[] = await getAllProjectsAction();

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <main className="flex-1 container mx-auto px-4 py-8 sm:py-16">
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
                        className="text-base md:text-lg text-left text-muted-foreground dark:text-gray-200 px-2 md:px-10"
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
