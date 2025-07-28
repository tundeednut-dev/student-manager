import HeroSection from "../pages/HeroSection"
import {render, screen} from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"



    test('redirect to sign up page after button is clicked', () => {
        render(
            <MemoryRouter>
            <HeroSection/>
            </MemoryRouter>
        )
    const startButton = screen.getByRole("button", {name: /get started/i})
    })

    