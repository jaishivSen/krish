"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Type, Square, Circle, ImageIcon, Upload, Star, Heart, Triangle } from "lucide-react"
import type { DesignElement } from "./design-studio"

interface SidebarProps {
  activeTab: "templates" | "elements" | "text" | "uploads"
  onTabChange: (tab: "templates" | "elements" | "text" | "uploads") => void
  onAddElement: (element: Omit<DesignElement, "id">) => void
}

export function Sidebar({ activeTab, onTabChange, onAddElement }: SidebarProps) {
  const addTextElement = () => {
    onAddElement({
      type: "text",
      content: "Add your text",
      x: 200,
      y: 200,
      width: 200,
      height: 40,
      fontSize: 16,
      color: "#000000",
    })
  }

  const addShapeElement = (shape: "rectangle" | "circle" | "triangle") => {
    onAddElement({
      type: "shape",
      content: shape,
      x: 200,
      y: 200,
      width: 100,
      height: 100,
      backgroundColor: "#3b82f6",
      borderRadius: shape === "circle" ? 50 : shape === "rectangle" ? 8 : 0,
    })
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-4 gap-1">
          <Button
            variant={activeTab === "templates" ? "default" : "ghost"}
            size="sm"
            onClick={() => onTabChange("templates")}
            className="flex flex-col gap-1 h-auto py-2"
          >
            <Square className="w-4 h-4" />
            <span className="text-xs">Templates</span>
          </Button>
          <Button
            variant={activeTab === "elements" ? "default" : "ghost"}
            size="sm"
            onClick={() => onTabChange("elements")}
            className="flex flex-col gap-1 h-auto py-2"
          >
            <Star className="w-4 h-4" />
            <span className="text-xs">Elements</span>
          </Button>
          <Button
            variant={activeTab === "text" ? "default" : "ghost"}
            size="sm"
            onClick={() => onTabChange("text")}
            className="flex flex-col gap-1 h-auto py-2"
          >
            <Type className="w-4 h-4" />
            <span className="text-xs">Text</span>
          </Button>
          <Button
            variant={activeTab === "uploads" ? "default" : "ghost"}
            size="sm"
            onClick={() => onTabChange("uploads")}
            className="flex flex-col gap-1 h-auto py-2"
          >
            <Upload className="w-4 h-4" />
            <span className="text-xs">Uploads</span>
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        {activeTab === "text" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Add text</h3>
            <Button variant="outline" className="w-full justify-start gap-2" onClick={addTextElement}>
              <Type className="w-4 h-4" />
              Add a heading
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" onClick={addTextElement}>
              <Type className="w-4 h-4" />
              Add a subheading
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" onClick={addTextElement}>
              <Type className="w-4 h-4" />
              Add body text
            </Button>
          </div>
        )}

        {activeTab === "elements" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Shapes</h3>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" className="aspect-square p-2" onClick={() => addShapeElement("rectangle")}>
                <Square className="w-6 h-6" />
              </Button>
              <Button variant="outline" className="aspect-square p-2" onClick={() => addShapeElement("circle")}>
                <Circle className="w-6 h-6" />
              </Button>
              <Button variant="outline" className="aspect-square p-2" onClick={() => addShapeElement("triangle")}>
                <Triangle className="w-6 h-6" />
              </Button>
            </div>

            <h3 className="font-semibold text-sm mt-6">Icons</h3>
            <div className="grid grid-cols-4 gap-2">
              <Button variant="outline" className="aspect-square p-2">
                <Star className="w-5 h-5" />
              </Button>
              <Button variant="outline" className="aspect-square p-2">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" className="aspect-square p-2">
                <Circle className="w-5 h-5" />
              </Button>
              <Button variant="outline" className="aspect-square p-2">
                <Square className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        {activeTab === "uploads" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Upload media</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <ImageIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500 mb-2">Drag and drop images here</p>
              <Button size="sm">Upload images</Button>
            </div>
          </div>
        )}

        {activeTab === "templates" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Search templates</h3>
            <Input placeholder="Search templates..." />
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-gray-100 rounded border cursor-pointer hover:border-blue-500">
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                    Template {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
