import { MemoryRouter, Routes, Route } from "react-router-dom";
import StudentList from "../pages/StudentList";
import { StudentContext } from "../StudentContext";
import { render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import EditPage from "../pages/EditPage";

  const mockSetStudentList = jest.fn();

    const mockedValues =  {
        studentList: [
             {
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
        ],
        edStudent: {},
        setEdStudent: jest.fn((entry) => mockedValues.edStudent = entry),
        setStudentList: mockSetStudentList
    }

describe("Functionality of Student List", () => {

    beforeEach(() => {
 render(
    
         <MemoryRouter initialEntries={['/']}>
            <StudentContext.Provider value={mockedValues}>
            <Routes>
        <Route path="/" element= {<StudentList/>}/>
        <Route path="/edit" element= {<EditPage/>}/> 
            </Routes>
            </StudentContext.Provider>
        </MemoryRouter>
       ) 

    })

    test("redirect to Edit Page when edit button is clicked", async () => {
      
       await userEvent.click(await screen.findByRole("link", {name: /Edit/}))
        expect(await screen.findByText("Student Profile (Edit)")).toBeInTheDocument()

    })

    test("delete student when delete button is clicked", async () => {
        await userEvent.click(await screen.findByRole('button', {name: /Delete/}))
        expect(mockSetStudentList).toHaveBeenCalled()
    })
    
})
