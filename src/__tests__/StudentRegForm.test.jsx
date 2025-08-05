import StudentRegForm from '../pages/StudentRegForm';
import {render, screen, waitFor, fireEvent} from "@testing-library/react"
import userEvent from '@testing-library/user-event';
import { StudentContext, StudentProvider } from '../StudentContext';
import { MemoryRouter } from 'react-router-dom';

   const mockStoreStudent = jest.fn((student) => {
  localStorage.setItem("student", JSON.stringify(student));
});

const renderWithMockContext = () => {

     const mockContextValue = {
            studentList: [],
            edStudent: {},
            setEdStudent: jest.fn(),
            setStudentList: jest.fn(),
            storeStudent: mockStoreStudent,
        }

         render(
            <MemoryRouter>
            <StudentContext.Provider value= {mockContextValue}>
            <StudentRegForm/>
            </StudentContext.Provider>
            </MemoryRouter>
        ) 
 
          jest.spyOn(Storage.prototype, "setItem")

}

const userInput = async () => {

  await userEvent.type(screen.getByLabelText("First Name"), "Olatunde")
       await userEvent.type(screen.getByLabelText("Last Name"), "Oludele")
       await userEvent.type(screen.getByLabelText("Date of Birth"), "2025-07-20")
       await userEvent.type(screen.getByLabelText("Age"), "20")
       await userEvent.selectOptions(screen.getByLabelText("Gender"), "Male")
       await userEvent.click(screen.getByLabelText("Select Country"))
       await userEvent.click(screen.getByText("Nigeria"))
       await userEvent.type(screen.getByLabelText("Email"), "olatundejosh135@gmail.com")
       await userEvent.type(screen.getByLabelText("Phone Number"), "07078202979")
       await userEvent.type(screen.getByLabelText("Course"), "Computer Engineering")

}

describe("Functionality of StudentRegForm Page", () => {

  jest.setTimeout(10000) 

    test("show functionality of inputs", async () => { 

        renderWithMockContext()

       await userInput()

      expect(screen.getByDisplayValue("Olatunde")).toBeInTheDocument(); 
    expect(screen.getByDisplayValue("Oludele")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2025-07-20")).toBeInTheDocument(); 
    expect(screen.getByDisplayValue("20")).toBeInTheDocument();
    expect(screen.getByDisplayValue("olatundejosh135@gmail.com")).toBeInTheDocument()
    expect(screen.getByDisplayValue("07078202979")).toBeInTheDocument()
    expect(screen.getByDisplayValue("Computer Engineering")).toBeInTheDocument()
    expect(screen.getByText("Nigeria")).toBeInTheDocument();
    expect(screen.getByRole("option", {name: "Male"}).selected).toBe(true)

       
    })

    test("shows error if input field is empty after submit", async () => {

         renderWithMockContext()

       await userEvent.clear(screen.getByLabelText("First Name"))
       await userEvent.clear(screen.getByLabelText("Last Name"))
        await userEvent.clear(screen.getByLabelText("Date of Birth"))
        await userEvent.clear(screen.getByLabelText("Age"))
         await userEvent.clear(screen.getByLabelText("Email"))
         await userEvent.clear(screen.getByLabelText("Phone Number"))
         await userEvent.clear(screen.getByLabelText("Course"))
       await userEvent.selectOptions(screen.getByLabelText("Gender"), "")
       fireEvent.keyDown(screen.getByLabelText("Select Country"),
                                {key: "Backspace", code: "Backspace"}
    )
       await userEvent.click(screen.getByRole('button', {name: "Submit"}))

       expect(screen.getByText("firstName is required")).toBeInTheDocument() 
       expect(screen.getByText("lastName is required")).toBeInTheDocument() 
       expect(screen.getByText("dob is required")).toBeInTheDocument() 
       expect(screen.getByText("email is required")).toBeInTheDocument() 
       expect(screen.getByText("phone is required")).toBeInTheDocument() 
       expect(screen.getByText("course is required")).toBeInTheDocument() 
       expect(screen.getByText("gender is required")).toBeInTheDocument() 
       expect(screen.getByText("country is required")).toBeInTheDocument()
    }) 

    test("registers student when submit button is clicked", async () => {
       localStorage.clear()
        renderWithMockContext()
 
       await userInput()

       await userEvent.click(screen.getByRole('button', {name: /submit/i}))

       await waitFor(() => {expect(mockStoreStudent).toHaveBeenCalledWith({
            firstName: "Olatunde",
            lastName: "Oludele",
            dob: "2025-07-20",
            age: "20",
            gender: "Male",
            country: "Nigeria",
            email: "olatundejosh135@gmail.com",
            phone: "07078202979",
            course: "Computer Engineering" 
    })
    })

    expect(await screen.findByText(/student added/i)).toBeInTheDocument();


    })
})

