import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

describe('CreateBlogForm', () => {
    test('creates blog with correct data', async () => {
        const mockHandleCreateBlog = vi.fn()
        const user = userEvent.setup()

        render(<CreateBlogForm handleCreateBlog={mockHandleCreateBlog} />)

        const titleInput = screen.getByPlaceholderText('Title...')
        const authorInput = screen.getByPlaceholderText('Author...')
        const urlInput = screen.getByPlaceholderText('Url...')

        const createButton = screen.getByText('Create Blog')

        await user.type(titleInput, 'testBlog')
        await user.type(authorInput, 'Test Author')
        await user.type(urlInput, 'testblog.com')

        await user.click(createButton)

        expect(mockHandleCreateBlog.mock.calls).toHaveLength(1)
        expect(mockHandleCreateBlog.mock.calls[0][0]).toStrictEqual({
            title: 'testBlog',
            author: 'Test Author',
            url: 'testblog.com',
        })
    })
})
