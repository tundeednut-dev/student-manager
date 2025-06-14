// src/__tests__/Login.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../pages/LoginPage";

// Optional: mock useNavigate to avoid crash during test
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Login Page", () => {
  test("renders Full Name input", () => {
    render(<Login />);
    const fullNameInput = screen.getByLabelText(/full name/i);
    expect(fullNameInput).toBeInTheDocument();
  });

  test("shows error when fields are empty on submit", () => {
    render(<Login />);
    const button = screen.getByRole("button", { name: /sign up/i });
    fireEvent.click(button);
    expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
  });

  test("shows error if password is weak", () => {
    render(<Login />);
    
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "Josh Dev" },
    });

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "joshdev" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "weak" }, // weak password
    });

    const button = screen.getByRole("button", { name: /sign up/i });
    fireEvent.click(button);

    expect(
      screen.getByText(
        /password must have at least 8 characters, one uppercase letter, and one lowercase letter/i
      )
    ).toBeInTheDocument();
  });
});
