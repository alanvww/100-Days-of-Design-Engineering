
import Grid, { GridItem } from './grid';

// Function to generate placeholder items with different colors
const generatePlaceholderItems = (count: number): GridItem[] => {
    const colors = [
        'FF5E5B', '39A0ED', '4CAF50', 'FFC107',
        '9C27B0', '3F51B5', 'FF9800', '795548',
        '607D8B', '673AB7', 'E91E63', '00BCD4'
    ];

    return Array.from({ length: count }, (_, i) => {
        const colorIndex = i % colors.length;

        return {
            id: `item-${i + 1}`,
            title: `Item ${i + 1}`,
            slug: `item-${i + 1}`,
            // Use a placeholder image with a solid color
            image: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23${colors[colorIndex]}'/%3E%3C/svg%3E`,
            year: `202${i % 5}`,
            tagline: `This is a placeholder description for item ${i + 1}`
        };
    });
};

export default function GridWithPlaceholders() {
    // Generate 12 placeholder items
    const placeholderItems = generatePlaceholderItems(12);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <Grid
                items={placeholderItems}
                title="Grid Layout Demo"
                baseUrl="/demo"
                gridConfig={{
                    minItemWidth: 280,
                    rowHeight: 280
                }}
            />
        </div>
    );
}