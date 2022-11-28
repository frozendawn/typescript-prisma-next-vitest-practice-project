import { expect, it, describe } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import Home from '../pages'

describe("Testing the Home component", () => {
  it('Should check if there is a div with content welcome in the Home component', () => {
    render(<Home />)
  
    const element = within(screen.getByTestId('home-element'));
    expect(element.getByText("Welcome")).toBeDefined()
  
  })
})