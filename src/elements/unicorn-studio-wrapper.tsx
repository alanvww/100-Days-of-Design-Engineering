'use client'

export default function UnicornStudioWrapper({ link }: { link: string }) {


    return (
            <div className="aspect-square">
                <iframe
                    src={link}
                    width="100%"
                    className="aspect-square overflow-hidden object-cover"
                    loading="lazy"
                ></iframe>
            </div>
    )
}
