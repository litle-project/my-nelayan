import { render, screen, fireEvent } from "@testing-library/react";
import Input from "@/components/Input";

describe("Input Component", () => {
  test("renders input with default placeholder", () => {
    render(<Input handler={() => {}} />);
    expect(screen.getByPlaceholderText("Input here")).toBeInTheDocument();
  });

  test("renders input with custom placeholder", () => {
    render(<Input placeholder="Enter text" handler={() => {}} />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  test("calls handler function on input change", () => {
    const mockHandler = jest.fn();
    render(<Input handler={mockHandler} />);
    
    const input = screen.getByPlaceholderText("Input here");
    fireEvent.change(input, { target: { value: "Hello" } });
    
    expect(mockHandler).toHaveBeenCalledWith("Hello");
  });

  test("calls eventKey function when Enter is pressed", () => {
    const mockEventKey = jest.fn();
    render(<Input handler={() => {}} eventKey={mockEventKey} />);
    
    const input = screen.getByPlaceholderText("Input here");
    fireEvent.change(input, { target: { value: "Test Input" } });
    fireEvent.keyUp(input, { key: "Enter" });
    
    expect(mockEventKey).toHaveBeenCalledWith("Test Input");
  });

  test("displays error message when error prop is provided", () => {
    render(<Input handler={() => {}} error="Required field" />);
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });
});
