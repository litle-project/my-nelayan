import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import Button from "@/components/Button"

describe("Button Component", () => {
  test("renders button with default label", () => {
    render(<Button handler={() => {}} />)
    expect(screen.getByText("Button")).toBeInTheDocument()
  })

  test("renders button with custom label", () => {
    render(<Button label="Click Me" handler={() => {}} />)
    expect(screen.getByText("Click Me")).toBeInTheDocument()
  })

  test("calls handler function on click", () => {
    const mockHandler = jest.fn()
    render(<Button handler={mockHandler} />)
    
    const button = screen.getByRole("button")
    fireEvent.click(button)
    expect(mockHandler).toHaveBeenCalledTimes(1)
  })

  test("disables button when loading", () => {
    render(<Button loading={{ status: true, message: "Loading..." }} handler={() => {}} />)
    
    const button = screen.getByRole("button")
    expect(button).toBeDisabled()
  })

  test("shows spinner when loading", () => {
    render(<Button loading={{ status: true, message: "Loading..." }} handler={() => {}} />)
    
    const spinner = screen.getByAltText("loading_icon")
    expect(spinner).toBeVisible()
  })

  test("hides spinner when not loading", () => {
    render(<Button handler={() => {}} />)
    
    const spinner = screen.getByAltText("loading_icon")
    expect(spinner).toHaveClass("hidden")
  })
})
