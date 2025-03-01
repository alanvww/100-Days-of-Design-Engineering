import Image from 'next/image';
import Link from 'next/link';
import * as motion from 'motion/react-client';

// Define a generic item type that can work for various use cases
export type GridItem = {
    id: string;
    title: string;
    slug?: string;
    image: string;
    year?: string;
    tagline?: string;
    // Add any other optional fields here as needed
};

export type GridProps = {
    items: GridItem[];
    title: string;
    baseUrl?: string;
    gridConfig?: {
        minItemWidth?: number;
        rowHeight?: number;
    };
};

export default function Grid({
    items,
    title,
    baseUrl = '/',
    gridConfig = {
        minItemWidth: 280,
        rowHeight: 280
    }
}: GridProps) {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
            },
        },
    };

    return (
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-16 py-8 sm:py-12">
            <motion.h1
                className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {title}
            </motion.h1>

            <motion.div
                className="grid grid-flow-dense gap-4"
                style={{
                    gridTemplateColumns: `repeat(auto-fill, minmax(${gridConfig.minItemWidth}px, 1fr))`,
                    gridAutoRows: `${gridConfig.rowHeight}px`
                }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {items.map((item, index) => {
                    // Determine if this item should be featured based on position
                    const isFeatureLarge = index % 8 === 0; // Every 8th item is large feature
                    const isFeatureMedium = index % 5 === 3; // Every 5th item (starting at 3) is medium feature
                    const isFeatureWide = index % 6 === 2; // Every 6th item (starting at 2) is wide
                    const isFeatureTall = index % 7 === 5; // Every 7th item (starting at 5) is tall

                    // Generate class based on feature type
                    let gridClass = '';

                    if (isFeatureLarge) {
                        gridClass = 'col-span-2 row-span-2';
                    } else if (isFeatureMedium) {
                        gridClass = 'col-span-2 row-span-1';
                    } else if (isFeatureWide) {
                        gridClass = 'col-span-2 row-span-1';
                    } else if (isFeatureTall) {
                        gridClass = 'col-span-1 row-span-2';
                    } else {
                        gridClass = 'col-span-1 row-span-1';
                    }

                    // On smaller screens, don't span multiple columns
                    const responsiveClass = `${gridClass} sm:col-span-1 md:${gridClass}`;

                    return (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            className={responsiveClass}
                        >
                            <Link
                                href={
                                    // item.slug ? `${baseUrl}/${item.slug}` : 
                                    '#'}
                                className="group relative block h-full overflow-hidden rounded-lg"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    priority={index < 4}
                                />

                                <motion.div
                                    className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 sm:p-6"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <h2 className="text-lg sm:text-xl font-semibold text-white mb-1">
                                        {item.title}
                                    </h2>
                                    {item.year && (
                                        <p className="text-sm text-zinc-300">
                                            {item.year}
                                        </p>
                                    )}
                                    {item.tagline && (
                                        <p className="text-sm text-zinc-400 mt-2 line-clamp-2">
                                            {item.tagline}
                                        </p>
                                    )}
                                </motion.div>
                            </Link>
                        </motion.div>
                    );
                })}
            </motion.div>
        </main>
    );
}