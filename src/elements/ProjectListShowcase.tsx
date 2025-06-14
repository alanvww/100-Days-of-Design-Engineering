'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { X } from '@phosphor-icons/react';

interface Project {
    id: number;
    name: string;
    description: string;
    // Add other relevant fields like imageUrl, link, etc. if needed
}

// Sample project data (replace with actual JSON loading if needed)
const sampleProjects: Project[] = [
    { id: 1, name: "Project Alpha", description: "This is the description for Project Alpha. It showcases innovative features." },
    { id: 2, name: "Project Beta", description: "Project Beta focuses on user experience and intuitive design." },
    { id: 3, name: "Project Gamma", description: "A project exploring cutting-edge technology and performance optimization." },
    { id: 4, name: "Project Delta", description: "Delta aims to solve complex problems with elegant solutions." },
];

export default function ProjectListShowcase() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Load projects (using sample data for now)
    useEffect(() => {
        // In a real scenario, you might fetch this data:
        // fetch('/path/to/projects.json')
        //   .then(res => res.json())
        //   .then(data => setProjects(data))
        //   .catch(error => console.error("Error loading projects:", error));
        setProjects(sampleProjects);
    }, []);

    const openModal = (project: Project) => {
        setSelectedProject(project);
    };

    const closeModal = () => {
        setSelectedProject(null);
    };

    // Modal animation variants
    const backdropVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.9, y: 20 },
    };

    return (
        <div className="p-4 bg-gradient-to-br from-red-200 to-purple-300 dark:from-red-900 dark:to-purple-900 rounded-lg min-h-[300px]">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Project Showcase</h2>
            <ul className="space-y-3">
                {projects.map((project) => (
                    <li
                        key={project.id}
                        onClick={() => openModal(project)}
                        className="p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <h3 className="font-medium text-gray-900 dark:text-white">{project.name}</h3>
                    </li>
                ))}
            </ul>

            {/* Floating Window (Modal) */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={closeModal} // Close on backdrop click
                    >
                        <motion.div
                            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                        >
                            <button
                                onClick={closeModal}
                                className="absolute cursor-pointer top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{selectedProject.name}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{selectedProject.description}</p>
                            {/* Add more project details here */}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}