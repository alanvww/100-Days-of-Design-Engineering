'use client';

import React, { useState } from 'react';
import HoldButton from './hold-button';

export default function HoldButtonDemo() {
    const [actionTriggered, setActionTriggered] = useState(false);

    const handleComplete = () => {
        setActionTriggered(true);
        // Reset after 2 seconds
        setTimeout(() => {
            setActionTriggered(false);
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
            <h1 className="text-2xl font-bold text-center">
                Hold Button Example
            </h1>

            <div className="flex flex-col items-center gap-4">
                <p className="text-center text-gray-600">
                    Press and hold the button for 3 seconds to trigger the action
                </p>

                <HoldButton
                    onComplete={handleComplete}
                    bgColor="bg-emerald-500"
                    className="px-6 font-semibold"
                >
                    Hold to Confirm
                </HoldButton>

                {actionTriggered && (
                    <div className="p-3 mt-4 text-white bg-green-500 rounded-md">
                        Action triggered successfully!
                    </div>
                )}
            </div>

            <div className="mt-8">
                <h2 className="mb-4 text-xl font-semibold">More Examples:</h2>

                <div className="flex flex-wrap gap-4 justify-center">
                    <HoldButton
                        onComplete={() => alert('Delete completed')}
                        bgColor="bg-red-500"
                        className="px-4"
                    >
                        Delete
                    </HoldButton>

                    <HoldButton
                        onComplete={() => alert('Sent!')}
                        bgColor="bg-purple-600"
                        width="w-32"
                    >
                        Send
                    </HoldButton>

                    <HoldButton
                        onComplete={() => alert('Custom duration')}
                        bgColor="bg-amber-500"
                        duration={2}
                        className="px-4"
                    >
                        Hold 2s
                    </HoldButton>

                    <HoldButton
                        onComplete={() => alert('Disabled button')}
                        bgColor="bg-gray-500"
                        disabled={true}
                        className="px-4"
                    >
                        Disabled
                    </HoldButton>
                </div>
            </div>
        </div>
    );
}