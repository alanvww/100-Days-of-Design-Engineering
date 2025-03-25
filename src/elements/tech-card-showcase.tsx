import TechCard from './tech-card';

export default function TechCardShowcase() {
    return (
        <div className="container md:grid md:grid-cols-2 gap-4 p-4">
            <TechCard
                name="No.1"
                comment="Example #1"
                iconUrl="https://placehold.co/100x100.png"
                link="#"
                platforms={["A", "B", "C"]}
            />

            <TechCard
                name="No.2"
                comment="Example #2"
                iconUrl="https://placehold.co/100x100.png"
                link="#"
                platforms={["A"]}
            />

            <TechCard
                name="No.3"
                comment="Example #3"
                iconUrl="https://placehold.co/100x100.png"
                link="#"
                platforms={["A", "B"]}
            />
        </div>
    );
}