export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col animate-pulse bg-background dark:bg-gray-900">
            {/* Navbar skeleton */}
            <div className="container mx-auto px-4 py-4">
                <div className="h-16 bg-gray-200 rounded-lg" />
            </div>

            <main className="flex-1 container mx-auto px-4 py-8 sm:py-16">
                <div className="relative">
                    {/* Background project name skeleton */}
                    <div className="absolute left-0 w-full overflow-hidden">
                        <div className="md:h-32 h-16 w-3/4 ml-auto bg-gray-20 rounded-lg my-14" />
                    </div>

                    {/* Foreground title skeleton */}
                    <div className="relative md:my-32 my-20 w-3/4">
                        <div className="space-y-4">
                            <div className="h-12 md:h-24 bg-gray-200 rounded-lg" />
                            <div className="h-8 md:h-16 bg-gray-200 rounded-lg w-2/3" />
                        </div>
                    </div>
                </div>

                {/* Article content skeleton */}
                <article className="max-w-4xl mx-auto px-4 mt-16">
                    <div className="space-y-6">
                        {/* Content blocks */}
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-5/6" />
                        <div className="h-4 bg-gray-200 rounded w-2/3" />

                        {/* Element showcase skeleton */}
                        <div className="mt-16">
                            <div className="h-64 bg-gray-200 rounded-lg" />
                        </div>
                    </div>
                </article>
            </main>

            {/* Footer skeleton */}
            <div className="container mx-auto px-4 py-8">
                <div className="h-24 bg-gray-200 rounded-lg" />
            </div>
        </div>
    );
}