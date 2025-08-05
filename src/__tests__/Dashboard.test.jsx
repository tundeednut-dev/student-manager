import Dashboard from "../pages/Dashboard";
import {render, screen} from "@testing-library/react"
import { MemoryRouter} from "react-router-dom";
import { StudentProvider } from "../StudentContext";

describe('redirect to corresponding pages when buttons are clicked', () => {
    beforeEach(() => {
 render(
            <MemoryRouter>
                <StudentProvider>
                <Dashboard/>
                </StudentProvider>
            </MemoryRouter>
        )
    })
    test('redirect to student registration page when addstudent link is clicked', () => {
       
        const addStudentLink = screen.getByTestId(/addstudent/i)
        expect(addStudentLink).toHaveAttribute("href", "/regForm")
    })
     test('redirect to student list page when checkStudentList link is clicked', () => {

        const checkStudentList = screen.getByTestId(/checklist/i)
        expect(checkStudentList).toHaveAttribute("href", "/stulist")
    })
})
