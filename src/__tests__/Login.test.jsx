import { render, screen, fireEvent, waitFor} from "@testing-library/react";
import {MemoryRouter, useNavigate } from "react-router-dom";
import Login from "../pages/LoginPage";

const mockNavigate = jest.fn()
 jest.mock('react-router-dom', () => (
  {...jest.requireActual('react-router-dom'),
     useNavigate: () => mockNavigate,
 })
)


describe("Login Page : UI Rendering", () => {
  test("shows that input field is in the document", () => {
   
    render(
      <MemoryRouter>
        <Login/>
      </MemoryRouter>
    )
    const fullNameInput = screen.getByLabelText(/full name/i);
    const userNameInput  = screen.getByLabelText(/username/i)
    const passWordInput = screen.getByLabelText(/password/i)
    const banner = screen.getByAltText(/Banner/i)
    const visibilityButton = screen.getByRole('button', {name: 'Toggle Password Visibility'})
    fireEvent.change(passWordInput, {target: {value: "joshTunes007"}})
    fireEvent.click(visibilityButton)
    expect(passWordInput.type).toBe("text")
    expect(banner).toBeInTheDocument()
    expect(passWordInput).toBeInTheDocument()
    expect(userNameInput).toBeInTheDocument()
    expect(fullNameInput).toBeInTheDocument();
  });

  test('shows that input field are functional', () => {
 render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  const fullNameInput = screen.getByLabelText(/full name/i);
  const userNameInput = screen.getByLabelText(/username/i);
  const passWordInput = screen.getByLabelText(/password/i);
  const emailInput = screen.getByLabelText(/email/i);
  const submitButton = screen.getByRole('button', { name: 'Sign Up' });

  fireEvent.change(fullNameInput, { target: { value: "Josh Olatunde" } });
  fireEvent.change(userNameInput, { target: { value: "josh007" } });
  fireEvent.change(passWordInput, { target: { value: "JoshTunes007" } });
  fireEvent.change(emailInput, { target: { value: "olatundejosh135@gmail.com" } })

  fireEvent.click(submitButton)

  expect(fullNameInput).toHaveValue("Josh Olatunde")
  expect(userNameInput).toHaveValue("josh007")
  expect(passWordInput).toHaveValue("JoshTunes007")
  expect(emailInput).toHaveValue("olatundejosh135@gmail.com")
})

})

describe('Login Page: Form Validation', () => {
 test('shows an error when fullname field is empty', () => {
  render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  const fullNameInput = screen.getByLabelText(/full name/i);
  const userNameInput = screen.getByLabelText(/username/i);
  const passWordInput = screen.getByLabelText(/password/i);
  const emailInput = screen.getByLabelText(/email/i);
  const submitButton = screen.getByRole('button', { name: 'Sign Up' });

  fireEvent.change(fullNameInput, { target: { value: ""  } });
  fireEvent.change(userNameInput, { target: { value: "josh007" } });
  fireEvent.change(passWordInput, { target: { value: "JoshTunes007" } });
  fireEvent.change(emailInput, { target: { value: "olatundejosh1352gmail.com" } }); // Leave this empty

  fireEvent.click(submitButton);

  expect(screen.getByText(/Fullname is required/i)).toBeInTheDocument();
});

 test('shows an error when username field is empty', () => {
  render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  const fullNameInput = screen.getByLabelText(/full name/i);
  const userNameInput = screen.getByLabelText(/username/i);
  const passWordInput = screen.getByLabelText(/password/i);
  const emailInput = screen.getByLabelText(/email/i);
  const submitButton = screen.getByRole('button', { name: 'Sign Up' });

  fireEvent.change(fullNameInput, { target: { value: "Josh Olatunde" } });
  fireEvent.change(userNameInput, { target: { value: "" } });
  fireEvent.change(passWordInput, { target: { value: "JoshTunes007"  } });
  fireEvent.change(emailInput, { target: { value: "olatundejosh1352gmail.com" } });

  fireEvent.click(submitButton);

  expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
});

 test('shows an error when password field is empty', () => {
  render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  const fullNameInput = screen.getByLabelText(/full name/i);
  const userNameInput = screen.getByLabelText(/username/i);
  const passWordInput = screen.getByLabelText(/password/i);
  const emailInput = screen.getByLabelText(/email/i);
  const submitButton = screen.getByRole('button', { name: 'Sign Up' });

  fireEvent.change(fullNameInput, { target: { value: "Josh Olatunde" } });
  fireEvent.change(userNameInput, { target: { value: "josh007" } });
  fireEvent.change(passWordInput, { target: { value: "" } });
  fireEvent.change(emailInput, { target: { value: "olatundejosh1352gmail.com" } }); 

  fireEvent.click(submitButton);

  expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
});


test('shows an error when email field is empty', () => {
  render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  const fullNameInput = screen.getByLabelText(/full name/i);
  const userNameInput = screen.getByLabelText(/username/i);
  const passWordInput = screen.getByLabelText(/password/i);
  const emailInput = screen.getByLabelText(/email/i);
  const submitButton = screen.getByRole('button', { name: 'Sign Up' });

  fireEvent.change(fullNameInput, { target: { value: "Josh Olatunde" } });
  fireEvent.change(userNameInput, { target: { value: "josh007" } });
  fireEvent.change(passWordInput, { target: { value: "JoshTunes007" } });
  fireEvent.change(emailInput, { target: { value: "" } })

  fireEvent.click(submitButton);

  expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
});

})

describe('Login Page: Storage', () => {
  beforeEach(async () => {
  localStorage.clear();
  jest.spyOn(Storage.prototype, 'setItem')
  })
  test('stores authtoken in localStorge and navigate to dashboard', async () => {
   render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const fullNameInput = screen.getByLabelText(/full name/i);
  const userNameInput = screen.getByLabelText(/username/i);
  const passWordInput = screen.getByLabelText(/password/i);
  const emailInput = screen.getByLabelText(/email/i);
  const submitButton = screen.getByRole('button', { name: 'Sign Up' });

  fireEvent.change(fullNameInput, { target: { value: "Josh Olatunde" } });
  fireEvent.change(userNameInput, { target: { value: "josh007" } });
  fireEvent.change(passWordInput, { target: { value: "JoshTunes007" } });
  fireEvent.change(emailInput, { target: { value: "olatundejosh135@gmail.com" } })

  fireEvent.click(submitButton);

  await waitFor(() => {
    (expect(localStorage.setItem).toHaveBeenCalledWith(
      "userInfo",
      JSON.stringify({
        fullName: "Josh Olatunde",
        userName: "josh007",
        email: "olatundejosh135@gmail.com",
        password: "JoshTunes007"
      })
    ))
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
  })
  })
});
