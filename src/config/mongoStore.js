import MongoStore from 'connect-mongo'

export const mongoStore = MongoStore.create({ mongoUrl: process.env.DB_CONNECTION_STRING })
