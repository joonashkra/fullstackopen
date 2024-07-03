const { test, afterEach, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require("../models/user")
const testHelper = require("./test_helper")

const api = supertest(app)

afterEach(async () => {
    await User.deleteMany({})
})

describe('creating users', () => { 
    test('should work with valid data', async () => { 
        const testUser = {
            username: "testUser123",
            password: "abcd1234"
        }

        await api
            .post('/api/users')
            .send(testUser)
            .expect(201)

        const users = await User.find({})
        assert(users.map(user => user.username).includes("testUser123"))
    })

    test('should not work with invalid data', async () => {
        const usersBefore = await User.find({})

        testHelper.badUsers.forEach(async badUser => {
            await api
                .post('/api/users')
                .send(badUser)
                .expect(400)
        })

        const usersAfter = await User.find({})
        assert.strictEqual(usersBefore.length, usersAfter.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})