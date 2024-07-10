const loginWith = async (page, username, password) => {
    await page.getByTestId('username').waitFor()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'New Blog' }).waitFor()
    await page.getByRole('button', { name: 'New Blog' }).click()
    await page.getByPlaceholder('Title...').fill(title)
    await page.getByPlaceholder('Author...').fill(author)
    await page.getByPlaceholder('Url...').fill(url)
    await page.getByRole('button', { name: 'Create Blog' }).click()
}

const blogList = [
    {
        title: "Test Blog 1",
        author: "Author 1",
        url: "http://testblog1.html",
        likes: 150
    },
    {
        title: "Test Blog 2",
        author: "Author 2",
        url: "http://testblog2.html",
        likes: 220
    },
    {
        title: "Test Blog 3",
        author: "Author 3",
        url: "http://testblog3.html",
        likes: 180
    },
    {
        title: "Test Blog 4",
        author: "Author 4",
        url: "http://testblog4.html",
        likes: 190
    },
    {
        title: "Test Blog 5",
        author: "Author 5",
        url: "http://testblog5.html",
        likes: 170
    },
    {
        title: "Test Blog 6",
        author: "Author 6",
        url: "http://testblog6.html",
        likes: 210
    }
]


module.exports = { loginWith, createBlog, blogList }