import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Tester',
    url: 'test.com',
    likes: 1,
    user: {
      id: '123',
      username: 'testUser',
      name: 'testUser'
    }
  }

  test('renders content', () => {
    render(<Blog blog={blog} user={blog.user} />)
    const element = screen.getByText(`${blog.title}, ${blog.author}`)
    expect(element).toBeDefined()
  })

  test('renders url, likes and user', async () => {
    render(<Blog blog={blog} user={blog.user} />)

    const user = userEvent.setup()
    const button = screen.getByText('View')

    await user.click(button)

    const url = screen.getByText(`${blog.url}`)
    const likes = screen.getByText(`likes ${blog.likes}`)
    const author = screen.getByText(`${blog.user.name}`)

    const elements = [url, likes, author]
    elements.forEach(element => expect(element).toBeDefined())
  })

  test('like works', async () => {
    const mockLikeBlog = vi.fn()

    render(<Blog blog={blog} user={blog.user} handleLikeBlog={mockLikeBlog}/>)

    const user = userEvent.setup()
    const viewButton = screen.getByText('View')

    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLikeBlog.mock.calls).toHaveLength(2)
  })

})

