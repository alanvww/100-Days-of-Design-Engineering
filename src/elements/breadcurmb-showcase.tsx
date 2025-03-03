import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


export default function BreadcrumbShowcase() {
    return (
        <div className="aspect-square width-full flex flex-col items-center justify-center space-y-4 bg-amber-700">
            <Breadcrumb className="bg-gray-100 px-5 py-3 rounded-2xl">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink className="cursor-pointer">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbLink className="cursor-pointer">About</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbLink className="cursor-pointer">Services</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}