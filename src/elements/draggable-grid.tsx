import { createSwapy } from 'swapy'
import { useEffect, useRef, useState } from 'react'
import { DotsSixVertical } from '@phosphor-icons/react'

export default function DraggableGrid() {
    const swapy = useRef<ReturnType<typeof createSwapy> | null>(null)
    const container = useRef(null)

    const [pressedStates, setPressedStates] = useState({
        elementA: false,
        elementB: false,
        elementC: false
    });

    // Handler factory function to update specific element
    const handleMouseEvents = (elementId: string) => ({
        onMouseDown: () => setPressedStates(prev => ({ ...prev, [elementId]: true })),
        onMouseUp: () => setPressedStates(prev => ({ ...prev, [elementId]: false })),
        onMouseLeave: () => setPressedStates(prev => ({ ...prev, [elementId]: false }))
    });


    useEffect(() => {
        // If container element is loaded
        if (container.current) {
            swapy.current = createSwapy(container.current, { animation: 'spring' })

            // Your event listeners
            swapy.current.onSwap((event) => {
                console.log('swap', event);
            })
        }

        return () => {
            // Destroy the swapy instance on component destroy
            swapy.current?.destroy()
        }
    }, [])

    return (
        <div className='h-fit'>
            <div ref={container} className='flex flex-col gap-4 text-white rounded-4xl transition-all duration-300 '>
                <div data-swapy-slot="a" className='w-full h-64 border rounded-4xl'>
                    <div  {...handleMouseEvents('elementA')} data-swapy-item="a" className={`flex items-center justify-center w-full h-full bg-red-500 rounded-4xl border shadow-sm cursor-grab transition-opacity duration-300 ${pressedStates.elementA ? 'opacity-75 scale-90 cursor-grabbing' : ''}`}>
                        <DotsSixVertical size={32} />
                        <div >A</div>
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>

                    <div data-swapy-slot="b" className='w-full h-36 border rounded-4xl'>
                        <div  {...handleMouseEvents('elementB')} data-swapy-item="b" className={`flex items-center justify-center w-full h-full bg-blue-500 rounded-4xl border shadow-sm cursor-grab transition-opacity duration-300 ${pressedStates.elementB ? 'opacity-75 scale-90 cursor-grabbing' : ''}`}>
                            <DotsSixVertical size={32} />
                            <div >B</div>
                        </div>
                    </div>

                    <div data-swapy-slot="c" className='w-full h-36 border rounded-4xl'>
                        <div  {...handleMouseEvents('elementC')} data-swapy-item="c" className={`flex items-center justify-center w-full h-full bg-purple-500 rounded-4xl border shadow-sm cursor-grab transition-opacity duration-300 ${pressedStates.elementC ? 'opacity-75 scale-90 cursor-grabbing' : ''}`}>
                            <DotsSixVertical size={32} />
                            <div >C</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}