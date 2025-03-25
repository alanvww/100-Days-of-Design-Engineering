import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

interface TechCardProps {
    name: string;
    comment: string;
    iconUrl: string;
    link: string;
    platforms?: string[];
}

const TechCard: React.FC<TechCardProps> = ({ name, comment, iconUrl, link, platforms = [] }) => {
    return (
        <motion.section
            whileHover={{ borderColor: 'rgba(255, 255, 255, 0)' }}
            className="group border-2 item flex flex-col rounded-lg bg-gradient-to-tr from-red-500 to-purple-500 h-full w-full md:w-auto my-2 md:m-3"
        >
            <motion.span
                className="rounded-md border-gray-border p-3 h-full bg-white"
            >
                <section className="flex flex-row gap-2 m-2">
                    <Image
                        className="rounded-md object-contain m-2 h-12"
                        src={iconUrl}
                        width={50}
                        height={50}
                        alt={`${name} logo`}
                    />
                    <Link
                        href={link}
                        className="flex flex-row justify-center"
                    >
                        <h2 className="text-xl font-bold tracking-tight lg:leading-[3.7rem] my-auto leading-tight group-hover:bg-clip-text group-hover:bg-gradient-to-tr from-red-500 to-purple-500 group-hover:text-transparent">
                            {name}
                        </h2>
                    </Link>
                </section>

                {platforms && platforms.length > 0 && (
                    <ul className="flex flex-wrap items-center gap-2 my-2 mx-4">
                        {platforms.map((platform, id) => (
                            <li
                                key={id}
                                className="bg-white border  border-gray-200 text-gray-500 rounded-md px-2 py-1"
                            >
                                {platform}
                            </li>
                        ))}
                    </ul>
                )}

                <p className="pl-2 m-2 text-gray-500">{comment}</p>
            </motion.span>
        </motion.section>
    );
};

export default TechCard;