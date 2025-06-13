
import Author from './models/author.js'
import Book from './models/book.js'
import User from './models/user.js'
import { PubSub } from 'graphql-subscriptions'
import jwt from 'jsonwebtoken'
const pubsub = new PubSub()
import { GraphQLError } from 'graphql'

const resolvers = {
  Query: {
    bookCount: async () => {
      return Book.collection.countDocuments()
    },
    authorCount: async () => {
      return Author.collection.countDocuments()
    },
    allBooks: async (root, args) => {
      const conditions = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        conditions.author = author._id
      }
      if (args.genre) conditions.genres = args.genre
      return await Book.find(conditions).populate('author')
    },
    allAuthors: async () => {
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
        if (!context.currentUser) {
          throw new GraphQLError('Unauthorized access', {
          extensions: {
              code: 'AUTH_ERROR',
            }
          })
        }

        let author = await Author.findOne({ name: args.author })

        if (!author) {
          author = new Author({ name: args.author, bookCount: 0 })
        }

        const newBook = new Book({ ...args, author: author.id })
        author.bookCount++

        try {
          await author.save()
          await newBook.save()
        } catch (error) {
          console.log(error)
          throw new GraphQLError('Saving book failed', {
          extensions: {
              code: 'BAD_USER_INPUT',
              error
            }
          })
        }

        pubsub.publish('BOOK_ADDED', { bookAdded: newBook.populate('author') })

        return newBook.populate('author')
    },
    editAuthor: async (root, args, context) => {
        if (!context.currentUser) {
          throw new GraphQLError('Unauthorized access', {
          extensions: {
              code: 'AUTH_ERROR'
            }
          })
        }

        const author = await Author.findOne({ name: args.name })
        if (!author) {
            return null
        } else {
          author.born = args.setBornTo
          try {
            const updatedAuthor = await author.save()
            return updatedAuthor
          } catch (error) {
            throw new GraphQLError('Saving author failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          }
        }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
        subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
    }
  }
}

export default resolvers