"use client"

import { useState } from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { Canvas } from "./canvas"
import { TemplateLibrary } from "./template-library"

export interface DesignElement {
  id: string
  type: "text" | "shape" | "image"
  content: string
  x: number
  y: number
  width: number
  height: number
  fontSize?: number
  color?: string
  backgroundColor?: string
  borderRadius?: number
}

export function DesignStudio() {
  const [activeTab, setActiveTab] = useState<"templates" | "elements" | "text" | "uploads">("templates")
  const [elements, setElements] = useState<DesignElement[]>([])
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [showTemplates, setShowTemplates] = useState(true)

  const addElement = (element: Omit<DesignElement, "id">) => {
    const newElement: DesignElement = {
      ...element,
      id: Math.random().toString(36).substr(2, 9),
    }
    setElements((prev) => [...prev, newElement])
  }

  const updateElement = (id: string, updates: Partial<DesignElement>) => {
    setElements((prev) => prev.map((el) => (el.id === id ? { ...el, ...updates } : el)))
  }

  const deleteElement = (id: string) => {
    setElements((prev) => prev.filter((el) => el.id !== id))
    setSelectedElement(null)
  }

  const selectTemplate = () => {
    setShowTemplates(false)
    // Add some default elements for the template
    setElements([
      {
        id: "1",
        type: "text",
        content: "Your Title Here",
        x: 100,
        y: 100,
        width: 300,
        height: 60,
        fontSize: 32,
        color: "#000000",
      },
    ])
  }

  if (showTemplates) {
    return <TemplateLibrary onSelectTemplate={selectTemplate} />
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header elements={elements} onShowTemplates={() => setShowTemplates(true)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onAddElement={addElement} />
        <Canvas
          elements={elements}
          selectedElement={selectedElement}
          onSelectElement={setSelectedElement}
          onUpdateElement={updateElement}
          onDeleteElement={deleteElement}
        />
      </div>
    </div>
  )
}
