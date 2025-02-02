"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function TextEditor() {
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("Untitled Document")

    // Calculate word count
    const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0

    return (
        <div className="min-h-screen bg-background p-4">
            <Card className="max-w-5xl mx-auto">
                <div className="border-b p-2 flex flex-wrap gap-2 items-center">
                    <TooltipProvider>
                        <div className="flex items-center gap-1 mr-4">
                            <Select defaultValue="normal">
                                <SelectTrigger className="w-[130px]">
                                    <SelectValue placeholder="Select font" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="normal">Normal Text</SelectItem>
                                    <SelectItem value="h1">Heading 1</SelectItem>
                                    <SelectItem value="h2">Heading 2</SelectItem>
                                    <SelectItem value="h3">Heading 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-1 border-r pr-2">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="w-8 h-8">
                                        <Bold className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Bold</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="w-8 h-8">
                                        <Italic className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Italic</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="w-8 h-8">
                                        <Underline className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Underline</TooltipContent>
                            </Tooltip>
                        </div>

                        <div className="flex items-center gap-1 border-r pr-2">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="w-8 h-8">
                                        <AlignLeft className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Align left</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="w-8 h-8">
                                        <AlignCenter className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Align center</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="w-8 h-8">
                                        <AlignRight className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Align right</TooltipContent>
                            </Tooltip>
                        </div>

                        <div className="flex items-center gap-1">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="w-8 h-8">
                                        <List className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Bullet list</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="w-8 h-8">
                                        <ListOrdered className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Numbered list</TooltipContent>
                            </Tooltip>
                        </div>
                    </TooltipProvider>
                </div>

                <CardContent className="p-0">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-8 py-4 text-2xl font-semibold bg-transparent border-none focus:outline-none"
                        placeholder="Document Title"
                    />

                    <div className="px-8 pb-4">
                        <div className="min-h-[calc(100vh-300px)] w-full">
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full h-full min-h-[calc(100vh-300px)] resize-none bg-transparent border-none focus:outline-none"
                                placeholder="Start typing..."
                            />
                        </div>
                    </div>
                </CardContent>

                <div className="border-t p-2 text-sm text-muted-foreground">
                    {wordCount} {wordCount === 1 ? "word" : "words"}
                </div>
            </Card>
        </div>
    )
}

