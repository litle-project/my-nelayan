import React from "react"
import { render, screen } from "@testing-library/react"
import Empty from "@/components/Empty"
import "@testing-library/jest-dom"

describe("Empty Component", () => {
  test("renders without crashing", () => {
    render(<Empty />)
    
    const image = screen.getByAltText("empty")
    expect(image).toBeInTheDocument()
    
    expect(screen.getByText("No Content Found")).toBeInTheDocument()
  })
})
