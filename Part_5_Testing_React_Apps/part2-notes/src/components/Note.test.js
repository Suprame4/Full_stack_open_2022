import React from 'react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Note from './Note'

describe("test", () => {
    test("renders content", () => {
        const note = {
            content: 'Component testing is done with react-testing-library',
            important: true
        }
        render(<Note note={note}/>)

        const element = screen.getByText('Component testing is done with react-testing-library')

        expect(element).toBeDefined()
    })

    test("render content part 2 with a CSS selector", () => {
        const note = {
            content: 'Component testing is done with react-testing-library',
            important: true
          }
        
          const { container } = render(<Note note={note}/>);

          const div = container.querySelector('.note')
          expect(div).toHaveTextContent(
            'Component testing is done with react-testing-library'
          )
    })

    test('clicking the button calls event handler once', async () => {
        const note = {
            content: 'Component testing is done with react-testing-library',
            important: true
        }

        const mockHandler = jest.fn()

        render(
            <Note note={note} toggleImportance={mockHandler}/>
        )

        const user = userEvent.setup()
        const button = screen.getByText('make not important')
        await user.click(button)

        expect(mockHandler.mock.calls).toHaveLength(1)
    })
}) 