export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col animate-pulse bg-background dark:bg-gray-900">
            <main className="flex-1 container mx-auto px-4 py-8 sm:py-16">
                {/* Navbar skeleton */}
                <div className="h-16 bg-gray-200 dark:bg-gray-600 rounded-lg mb-8 sm:mb-16" /> {/* Added margin bottom */}

                <div className="relative">
                    {/* Background project name skeleton */}
                    <div className="absolute left-0 w-full overflow-hidden">
                        <div className="md:h-32 h-16 w-3/4 ml-auto bg-gray-200 dark:bg-gray-600 rounded-lg my-14" />
                    </div>

                    {/* Foreground title skeleton */}
                    <div className="relative md:my-32 my-20 w-3/4">
                        <div className="space-y-3"> {/* Reduced space */}
                            <div className="h-8 md:h-24 bg-gray-200 dark:bg-gray-600 rounded-lg" /> {/* Reduced mobile height */}
                            <div className="h-6 md:h-16 bg-gray-200 dark:bg-gray-600 rounded-lg w-2/3" /> {/* Reduced mobile height */}
                        </div>
                    </div>
                </div>

                {/* Article content skeleton */}
                <article className="max-w-4xl mx-auto px-4 mt-16">
                    <div className="space-y-6">
                        {/* Content blocks */}
                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3" />

                        {/* Element showcase skeleton */}
                        <div className="mt-16">
                            <div className="h-64 bg-gray-200 dark:bg-gray-600 rounded-lg" />
                        </div>
                    </div>

                    {/* Day Navigation Skeleton */}
                    <div className="mt-16">
                        <div className="h-10 bg-gray-200 dark:bg-gray-600 rounded-lg w-full" />
                    </div>

                    {/* Feedback Bar Skeleton */}
                    <div className="mt-12 mb-8">
                        <div className="h-12 bg-gray-200 dark:bg-gray-600 rounded-lg w-1/2 mx-auto" />
                    </div>
                </article>
            </main>

            {/* Footer skeleton */}
            <div className="container mx-auto px-4 py-8">
                <div className="h-24 bg-gray-200 dark:bg-gray-600 rounded-lg" />
            </div>
        </div>
    );
}