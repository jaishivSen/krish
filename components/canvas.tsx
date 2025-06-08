"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import type { DesignElement } from "./design-studio"

interface CanvasProps {
  elements: DesignElement[]
  selectedElement: string | null
  onSelectElement: (id: string | null) => void
  onUpdateElement: (id: string, updates: Partial<DesignElement>) => void
  onDeleteElement: (id: string) => void
}

export function Canvas({ elements, selectedElement, onSelectElement, onUpdateElement, onDeleteElement }: CanvasProps) {
  const [draggedElement, setDraggedElement] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.preventDefault()
    const element = elements.find((el) => el.id === elementId)
    if (!element) return

    const rect = e.currentTarget.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setDraggedElement(elementId)
    onSelectElement(elementId)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedElement || !canvasRef.current) return

    const canvasRect = canvasRef.current.getBoundingClientRect()
    const newX = e.clientX - canvasRect.left - dragOffset.x
    const newY = e.clientY - canvasRect.top - dragOffset.y

    onUpdateElement(draggedElement, { x: newX, y: newY })
  }

  const handleMouseUp = () => {
    setDraggedElement(null)
  }

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onSelectElement(null)
    }
  }

  const selectedElementData = elements.find((el) => el.id === selectedElement)

  return (
    <div className="flex-1 flex flex-col bg-gray-100">
      <div className="flex-1 flex items-center justify-center p-8">
        <div
          ref={canvasRef}
          className="bg-white shadow-lg relative"
          style={{ width: 800, height: 600 }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={handleCanvasClick}
        >
          {elements.map((element) => (
            <div
              key={element.id}
              className={`absolute cursor-move select-none ${
                selectedElement === element.id ? "ring-2 ring-blue-500" : ""
              }`}
              style={{
                left: element.x,
                top: element.y,
                width: element.width,
                height: element.height,
              }}
              onMouseDown={(e) => handleMouseDown(e, element.id)}
            >
              {element.type === "text" && (
                <div
                  contentEditable
                  suppressContentEditableWarning
                  className="w-full h-full outline-none"
                  style={{
                    fontSize: element.fontSize,
                    color: element.color,
                    display: "flex",
                    alignItems: "center",
                  }}
                  onBlur={(e) => {
                    onUpdateElement(element.id, { content: e.target.textContent || "" })
                  }}
                >
                  {element.content}
                </div>
              )}

              {element.type === "shape" && (
                <div
                  className="w-full h-full"
                  style={{
                    backgroundColor: element.backgroundColor,
                    borderRadius: element.borderRadius,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedElementData && (
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Element Properties</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDeleteElement(selectedElementData.id)}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-medium">X Position</label>
              <Input
                type="number"
                value={selectedElementData.x}
                onChange={(e) => onUpdateElement(selectedElementData.id, { x: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="text-xs font-medium">Y Position</label>
              <Input
                type="number"
                value={selectedElementData.y}
                onChange={(e) => onUpdateElement(selectedElementData.id, { y: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="text-xs font-medium">Width</label>
              <Input
                type="number"
                value={selectedElementData.width}
                onChange={(e) =>
                  onUpdateElement(selectedElementData.id, { width: Number.parseInt(e.target.value) || 0 })
                }
              />
            </div>
            <div>
              <label className="text-xs font-medium">Height</label>
              <Input
                type="number"
                value={selectedElementData.height}
                onChange={(e) =>
                  onUpdateElement(selectedElementData.id, { height: Number.parseInt(e.target.value) || 0 })
                }
              />
            </div>
          </div>

          {selectedElementData.type === "text" && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-xs font-medium">Font Size</label>
                <Input
                  type="number"
                  value={selectedElementData.fontSize || 16}
                  onChange={(e) =>
                    onUpdateElement(selectedElementData.id, { fontSize: Number.parseInt(e.target.value) || 16 })
                  }
                />
              </div>
              <div>
                <label className="text-xs font-medium">Color</label>
                <Input
                  type="color"
                  value={selectedElementData.color || "#000000"}
                  onChange={(e) => onUpdateElement(selectedElementData.id, { color: e.target.value })}
                />
              </div>
            </div>
          )}

          {selectedElementData.type === "shape" && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-xs font-medium">Background Color</label>
                <Input
                  type="color"
                  value={selectedElementData.backgroundColor || "#3b82f6"}
                  onChange={(e) => onUpdateElement(selectedElementData.id, { backgroundColor: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-medium">Border Radius</label>
                <Input
                  type="number"
                  value={selectedElementData.borderRadius || 0}
                  onChange={(e) =>
                    onUpdateElement(selectedElementData.id, { borderRadius: Number.parseInt(e.target.value) || 0 })
                  }
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
