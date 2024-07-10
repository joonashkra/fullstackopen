const { test, expect, beforeEach, describe } = require('@playwright/test')
const testHelper = require('./test_helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Test User',
        username: 'testUser123',
        password: 'abcd1234'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
      await expect(page.getByText('Log in to application')).toBeVisible()
  })

  describe('Login', () => { 
    test('works with valid credentials', async ({ page }) => { 
      testHelper.loginWith(page, 'testUser123', 'abcd1234')
      await expect(page.getByText('Logged in as testUser123')).toBeVisible()
    })
  
    test('fails with invalid credentials', async ({ page }) => { 
      testHelper.loginWith(page, 'testUser123', 'wrongPassword')
  
      await expect(page.getByText('Wrong username or password')).toBeVisible()
      await expect(page.getByText('Logged in as testUser123')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      testHelper.loginWith(page, 'testUser123', 'abcd1234')
    })
  
    test('a new blog can be created', async ({ page }) => {
      testHelper.createBlog(page, 'test blog', 'test author', 'testblog.com')
      await expect(page.getByText('test blog, test author')).toBeVisible()
      await expect(page.getByText('New blog "test blog" added.')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => { 
      testHelper.createBlog(page, 'test blog', 'test author', 'testblog.com')
      await page.getByRole('button', { name: 'View' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByTestId('blog-likes')).toContainText('likes 1')
    })

    test('a blog can be deleted with valid credentials', async ({ page }) => {
      testHelper.createBlog(page, 'test blog', 'test author', 'testblog.com')
      await page.getByRole('button', { name: 'View' }).click()
      page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button', { name: 'Delete' }).click()
      await expect(page.getByText('Deleted blog "test blog" succesfully.')).toBeVisible()
      await expect(page.getByText('test blog, test author')).not.toBeVisible()
    })

    test('a blog cant be deleted with invalid credentials', async ({ page, request }) => {
      testHelper.createBlog(page, 'test blog', 'test author', 'testblog.com')

      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Test User 2',
          username: 'testUser234',
          password: 'abcd2345'
        }
      })

      await page.getByRole('button', { name: 'Log out' }).click()
      await page.getByTestId('username').waitFor()
      testHelper.loginWith(page, 'testUser234', 'abcd2345')

      await page.getByRole('button', { name: 'View' }).waitFor()

      await page.getByRole('button', { name: 'View' }).click()
      expect(page.getByRole('button', { name: 'Delete' })).not.toBeVisible()
    })

    test('blogs are in descending order by likes', async ({ page }) => {
      for (const blog of testHelper.blogList) {
        testHelper.createBlog(page, blog.title, blog.author, blog.url)
        await expect(page.getByText(`${blog.title}, ${blog.author}`)).toBeVisible()
      }

      const blogs = await page.getByTestId('blog-element').all()

      for (let i = 0; i < blogs.length; i++) {
        const blog = blogs[i]
        await blog.getByRole('button', { name: 'View' }).click()
        await expect(blog.getByTestId('blog-likes')).toBeVisible()
        for (let j = 0; j <= i; j++) {
            await blog.getByRole('button', { name: 'like' }).click()
        }
      }

      await page.reload()

      for (let i = 0; i < blogs.length; i++) {
        const blog = blogs[i]
        await blog.getByRole('button', { name: 'View' }).click()
        await expect(blog.getByTestId('blog-likes')).toBeVisible()
        await expect(blog.getByTestId('blog-likes')).toContainText([`likes ${blogs.length-i} like`])
      }

    })
  })
})