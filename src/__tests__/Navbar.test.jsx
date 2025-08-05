import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import Navbar from '../components/Navbar'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => (
    {...jest.requireActual('react-router-dom'),
        useNavigate: () => mockNavigate
    }
))



describe("Navbar and SideBar Behaviour", () => {
    beforeEach(() => {
  render(
        <MemoryRouter>
        <Navbar/>
        </MemoryRouter>
    )
    })
test('shows hambuger, cancel button and toggles sidebar when buttons are clicked on mobile screens', async() => {

    global.innerWidth = 600;
    global.dispatchEvent(new Event("resize"))

  
    const hamburger = screen.getByRole('button', {name: /hamburger/i})
    fireEvent.click(hamburger)
    await waitFor(() => expect(screen.getByTestId(/mobile-logo/i)).toBeInTheDocument())
    const cancel = screen.getByRole('button', {name: /cancel/i})
    fireEvent.click(cancel)
    await waitFor(() => expect(screen.queryByTestId(/mobile-logo/i)).not.toBeInTheDocument())
})

test('should not display hambuger menu on desktop', () => {

    global.innerWidth = 1024;
    global.dispatchEvent(new Event("resize"))

    const hambuger = screen.getByRole("button", {name: /hamburger/i})
    expect(hambuger).not.toHaveClass("hidden")
})

test("redirect to dashBoard when dashBoard button is clicked is clicked", () => {
    
    render(
        <MemoryRouter initialEntries={['/']}>
            <Routes>
                <Route path='/' element= {<Navbar/>}/>
                <Route path='/dashboard' element= {<div>Dashboard</div>}/>
            </Routes>
        </MemoryRouter>
    )

    const dashBoardButton = screen.getAllByRole("link", {name: /dashboard/i})
    fireEvent.click(dashBoardButton[0])
    expect(screen.getAllByText(/Dashboard/i)[0]).toBeInTheDocument()
})

test("redirect to addStudentPage when the addStudent link is clicked", () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <Routes>
                <Route path='/' element= {<Navbar/>}/>
                <Route path='/regForm' element= {<div>Add Student</div>}/>
            </Routes>
        </MemoryRouter>
    )

    const addStudentButton = screen.getAllByRole('link', {name: /Add Student/})
    fireEvent.click(addStudentButton[0])
    expect(screen.getAllByText(/Add Student/i)[0]).toBeInTheDocument()
})
test("redirect to checkStudentList page when the corresponding link is clicked", () => {
    <MemoryRouter initialEntries={['/']}>
        <Routes>
            <Route path='/' element= {<Navbar/>}/>
            <Route path='/stulist' element= {<div>Check Student List</div>}/>
        </Routes>
    </MemoryRouter>

    const checkStudentListLink = screen.getAllByRole('link', {name: /Check Student List/})
    fireEvent.click(checkStudentListLink[0])
    expect(screen.getAllByText(/Check Student List/i)[0]).toBeInTheDocument()
})
})
