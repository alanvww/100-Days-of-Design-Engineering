'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { XLogo, LinkedinLogo, GithubLogo, Envelope } from '@phosphor-icons/react';

// types/index.ts

export type SocialLinks = {
    twitter?: string;
    linkedin?: string;
    github?: string;
};

export type ContactDetails = {
    education?: string;
    experience?: string;
    skills?: string;
    bio?: string;
};

export interface ContactData {
    name: string;
    title: string;
    profileImage: string;
    email?: string;
    socials?: SocialLinks;
    details?: ContactDetails;
}


interface ContactCardProps {
    name: string;
    title: string;
    profileImage: string;
    email?: string;
    socials?: SocialLinks;
    details?: ContactDetails;
}

const contactData: ContactData = {
    name: "Jane Smith",
    title: "Full Stack Developer",
    profileImage: "https://placehold.co/400x400.png", // Place your image in the public folder
    email: "jane.smith@example.com",
    socials: {
        twitter: "https://twitter.com/janesmith",
        linkedin: "https://linkedin.com/in/janesmith",
        github: "https://github.com/janesmith"
    },
    details: {
        education: "M.S. Computer Science, Stanford University",
        experience: "5+ years in web development, previously at Google and Microsoft",
        skills: "React, Next.js, TypeScript, Node.js, GraphQL, TailwindCSS",
        bio: "Full stack developer passionate about creating intuitive user experiences and scalable applications. Loves hiking and playing chess in free time."
    }
};

const secondContact: ContactData = {
    name: "John Doe",
    title: "UI/UX Designer",
    profileImage: "https://placehold.co/400x400.png",
    email: "john.doe@example.com",
    socials: {
        twitter: "https://twitter.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe"
    },
    details: {
        education: "B.A. Design, Rhode Island School of Design",
        experience: "3+ years at creative agencies, specializing in mobile interfaces",
        skills: "Figma, Adobe XD, Sketch, Prototyping, User Research",
        bio: "Designer with a focus on creating accessible and beautiful interfaces. Coffee enthusiast and amateur photographer."
    }
};

const ContactCardLayout: React.FC<ContactCardProps> = ({
    name,
    title,
    profileImage,
    email,
    socials = {},
    details = {}
}) => {
    const [isFlipped, setIsFlipped] = useState<boolean>(false);

    const toggleFlip = (): void => {
        setIsFlipped(!isFlipped);
    };

    // Animation variants
    const cardVariants = {
        front: {
            rotateY: 0,
            transition: { duration: 0.5 }
        },
        back: {
            rotateY: 180,
            transition: { duration: 0.5 }
        }
    };

    const contentVariants = {
        front: {
            opacity: 1,
            transition: { delay: 0.2, duration: 0.3 }
        },
        back: {
            opacity: 0,
            transition: { duration: 0.3 }
        }
    };

    const detailsVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            transition: { duration: 0.3 }
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    // Render social media icons
    const renderSocialIcons = () => {
        return (
            <div className="flex space-x-3 mt-3">
                {socials.twitter && (
                    <a href={socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="XLogo">
                        <XLogo className="h-5 w-5 text-gray-600 hover:text-blue-400 transition-colors" />
                    </a>
                )}
                {socials.linkedin && (
                    <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <LinkedinLogo className="h-5 w-5 text-gray-600 hover:text-blue-600 transition-colors" />
                    </a>
                )}
                {socials.github && (
                    <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <GithubLogo className="h-5 w-5 text-gray-600 hover:text-gray-900 transition-colors" />
                    </a>
                )}
                {email && (
                    <a href={`mailto:${email}`} aria-label="Email">
                        <Envelope className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
                    </a>
                )}
            </div>
        );
    };

    return (
        <motion.div
            className="relative w-72 h-96 perspective-1000 cursor-pointer"
            onHoverStart={toggleFlip}
            onHoverEnd={toggleFlip}
            onClick={toggleFlip}
        >
            <motion.div
                className="w-full h-full relative preserve-3d shadow-lg rounded-2xl bg-white"
                variants={cardVariants}
                animate={isFlipped ? 'back' : 'front'}
            >
                {/* Front side */}
                <motion.div
                    className="absolute w-full h-full backface-hidden rounded-2xl p-6 flex flex-col items-center"
                    variants={contentVariants}
                    animate={isFlipped ? 'back' : 'front'}
                >
                    <div className="w-36 h-36 relative rounded-full overflow-hidden border-4 border-gray-100 shadow-sm mb-4">
                        <Image
                            src={profileImage}
                            alt={`${name}'s profile`}
                            fill
                            sizes="(max-width: 144px) 100vw, 144px"
                            className="object-cover"
                            priority
                        />
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 text-center">{name}</h2>
                    <p className="text-gray-600 text-center mt-1">{title}</p>

                    {renderSocialIcons()}

                    <div className="mt-4 w-full">
                        <motion.div
                            className="bg-gray-50 rounded-xl p-3 text-center text-sm text-gray-500"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Hover to see more details
                        </motion.div>
                    </div>
                </motion.div>

                {/* Back side */}
                <motion.div
                    className="absolute w-full h-full backface-hidden rounded-2xl p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rotateY-180 overflow-hidden"
                    variants={contentVariants}
                    animate={isFlipped ? 'front' : 'back'}
                >
                    <div className="flex flex-col h-full">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
                        <p className="text-gray-600 mb-4">{title}</p>

                        <motion.div
                            className="flex-1 overflow-y-auto"
                            variants={detailsVariants}
                            initial="hidden"
                            animate={isFlipped ? 'visible' : 'hidden'}
                        >
                            {details.education && (
                                <motion.div className="mb-4" variants={itemVariants}>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Education</h3>
                                    <p className="text-sm text-gray-600">{details.education}</p>
                                </motion.div>
                            )}

                            {details.experience && (
                                <motion.div className="mb-4" variants={itemVariants}>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Experience</h3>
                                    <p className="text-sm text-gray-600">{details.experience}</p>
                                </motion.div>
                            )}

                            {details.skills && (
                                <motion.div className="mb-4" variants={itemVariants}>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Skills</h3>
                                    <p className="text-sm text-gray-600">{details.skills}</p>
                                </motion.div>
                            )}

                            {details.bio && (
                                <motion.div variants={itemVariants}>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-1">About</h3>
                                    <p className="text-sm text-gray-600">{details.bio}</p>
                                </motion.div>
                            )}
                        </motion.div>

                        {renderSocialIcons()}
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};



export default function ContactCard() {
    return (
        <div className='flex flex-col space-x-8 space-y-3 md:flex-row justify-center m-auto my-6'>
            <ContactCardLayout {...contactData} />
            <ContactCardLayout {...secondContact} />
        </div>
    );
}

