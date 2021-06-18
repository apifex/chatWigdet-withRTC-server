import mongoose from 'mongoose'

const connectionString =  process.env.MONGOURL

export const connectToDb = async () => {
    try {
        console.log('connecting to database ...')
        await mongoose.connect(connectionString, 
            {useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
            })
        return true
    } catch (error) {
        console.log('Error when connecting to database')
        return false
    }
}

const db = mongoose.connection

export default db