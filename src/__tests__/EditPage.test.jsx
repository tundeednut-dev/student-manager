import EditPage from "../pages/EditPage";
import { StudentContext } from "../StudentContext";
import {render, screen, waitFor} from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const mockedStudent = {
    
      id: 1,
      firstName: "Olatunde",
      lastName: "Oludele",
      dob: "2025-07-20",
      age: "20",
      gender: "Male",
      country: "Nigeria",
      email: "olatundejosh135@gmail.com",
      phone: "07078202979",
      course: "Computer Engineering"
    
}

const renderWithMockValues = (mockedValues) => {
  render(
    <MemoryRouter>
    <StudentContext value={mockedValues}>
      <EditPage/>
    </StudentContext>
    </MemoryRouter>
  )
}

test("show values on render",async () => {
  renderWithMockValues({
    edStudent: mockedStudent,
    setEdStudent: jest.fn(),
    studentList: [mockedStudent],
    setStudentList: jest.fn()
  })

  expect(await screen.getByLabelText(/First Name/i)).toHaveValue("Olatunde")
   expect(screen.getByLabelText(/Last Name/i)).toHaveValue("Oludele")
    expect(screen.getByLabelText(/Date of Birth/i)).toHaveValue("2025-07-20")
     expect(screen.getByLabelText(/Age/i)).toHaveValue(20)
      expect(screen.getByText("Nigeria")).toBeInTheDocument()
       expect(screen.getByLabelText(/Email/i)).toHaveValue("olatundejosh135@gmail.com")
        expect(screen.getByLabelText(/Course/i)).toHaveValue("Computer Engineering")
         expect(screen.getByLabelText(/Phone Number/i)).toHaveValue("07078202979")
})

test("show error when required field are empty", async () => {

  const emptyStudent = {
        
      id: 1,
      firstName: "",
      lastName: "",
      dob: "",
      age: "",
      gender: "",
      country: "",
      email: "",
      phone: "",
      course: ""
    
  }

  renderWithMockValues({
    edStudent: emptyStudent,
    setEdStudent: jest.fn(),
    studentList: [mockedStudent],
    setStudentList: jest.fn()
  })

  await userEvent.click(screen.getByRole("button", { name: /submit/i }));

  expect(screen.getByText(/firstName is required/i)).toBeInTheDocument();
  expect(screen.getByText(/lastName is required/i)).toBeInTheDocument();
  expect(screen.getByText(/dob is required/i)).toBeInTheDocument();
  expect(screen.getByText(/gender is required/i)).toBeInTheDocument();
  expect(screen.getByText(/age is required/i)).toBeInTheDocument();
  expect(screen.getByText(/country is required/i)).toBeInTheDocument();
  expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  expect(screen.getByText(/phone is required/i)).toBeInTheDocument();
  expect(screen.getByText(/course is required/i)).toBeInTheDocument();
});

test("submits form and shows success message", async () => {
  const mockSetStudentList = jest.fn((fn) => fn([mockedStudent]));

  renderWithMockValues({
    edStudent: mockedStudent,
    setEdStudent: jest.fn(),
    studentList: [mockedStudent],
    setStudentList: mockSetStudentList,
  });

  await userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitFor(() => {
    expect(screen.getByText(/Student Edited/i)).toBeInTheDocument();
  });

  expect(mockSetStudentList).toHaveBeenCalled();
});
