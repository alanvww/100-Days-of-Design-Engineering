import React, { JSX } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface UIElement {
    name: string;
    component: JSX.Element;
    code: string;
    day: number;
}

interface ElementShowcaseProps {
    day: number;
}

const elements: UIElement[] = [
    {
        name: 'Primary Button',
        component: (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Primary Button
            </button>
        ),
        code: `<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Primary Button
</button>`,
        day: 7
    },
    {
        name: 'Secondary Button',
        component: (
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                Secondary Button
            </button>
        ),
        code: `<button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
  Secondary Button
</button>`,
        day: 7
    },
    {
        name: 'Outline Button',
        component: (
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Outline Button
            </button>
        ),
        code: `<button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
  Outline Button
</button>`,
        day: 7
    },
    {
        name: 'Disabled Button',
        component: (
            <button className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded cursor-not-allowed" disabled>
                Disabled Button
            </button>
        ),
        code: `<button className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded cursor-not-allowed" disabled>
  Disabled Button
</button>`,
        day: 7
    },
];

const ElementShowcase: React.FC<ElementShowcaseProps> = ({ day }) => {
    // Filter elements based on the day parameter
    const filteredElements = elements.filter(element => element.day === day);

    // If no elements found for the given day, show a message
    if (filteredElements.length === 0) {
        return (
            <></>
        );
    }

    return (
        <div className="p-4">
            {filteredElements.map((element, index) => (
                <div key={index} className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">{element.name}</h2>
                    <Tabs defaultValue="preview" className="w-full">
                        <TabsList>
                            <TabsTrigger value="preview">Preview</TabsTrigger>
                            <TabsTrigger value="code">Code</TabsTrigger>
                        </TabsList>
                        <TabsContent value="preview" className="p-4 border rounded">
                            {element.component}
                        </TabsContent>
                        <TabsContent value="code" className="p-4 border rounded">
                            <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
                                <code>{element.code}</code>
                            </pre>
                        </TabsContent>
                    </Tabs>
                </div>
            ))}
        </div>
    );
};

export default ElementShowcase;