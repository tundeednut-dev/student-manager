import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import Navbar from '../components/Navbar'
import { MemoryRouter } from 'react-router-dom'


test('sidebar should be toggled when buttons are clicked', async() => {

    render(
        <MemoryRouter>
        <Navbar/>
        </MemoryRouter>
    )

    const hamburger = screen.getByRole('button', {name: /hamburger/i})
    fireEvent.click(hamburger)
    await waitFor(() => expect(screen.getByTestId(/mobile-logo/i)).toBeInTheDocument())
    const cancel = screen.getByRole('button', {name: /cancel/i})
    fireEvent.click(cancel)
    await waitFor(() => expect(screen.queryByTestId(/mobile-logo/i)).not.toBeInTheDocument())
})
