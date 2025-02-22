'use client';

import { Navbar } from '@/components/ui/Navbar';

export default function ContactPage() {
 

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 container mx-auto px-4 py-8 sm:py-16">
                <div className="relative">
                    <Navbar />
                    <div className='flex space-x-8 flex-row justify-center m-auto my-6'>
                        <p className='text-2xl font-bold text-gray-800'>...</p>
                    </div>
                </div>
            </main>
        </div>
    );
}