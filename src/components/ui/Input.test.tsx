import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input Component", () => {
  // Test 1: Basic Rendering
  test("renders an input element", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  // Test 2: Props & Attributes
  test("renders with correct type attribute", () => {
    render(<Input type="email" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "email");
  });

  test("accepts placeholder text", () => {
    render(<Input placeholder="Enter your email" />);
    const input = screen.getByPlaceholderText("Enter your email");
    expect(input).toBeInTheDocument();
  });

  // Test 3: User Interaction
  test("allows user to type in the input", async () => {
    const user = userEvent.setup();
    render(<Input data-testid="email-input" />);
    const input = screen.getByTestId("email-input");

    await user.type(input, "test@example.com");
    expect(input).toHaveValue("test@example.com");
  });

  // Test 4: Disabled State
  test("respects disabled attribute", () => {
    render(<Input disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  // Test 5: Custom Class Names
  test("applies custom className", () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-class");
  });

  // Test 6: Data Attributes (for design system integration)
  test("has correct data-slot attribute", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("data-slot", "input");
  });
});
