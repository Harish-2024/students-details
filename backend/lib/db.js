import { Sequelize } from 'sequelize'
import { config } from 'dotenv'

config()

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host:  process.env.POSTGRES_HOST,
    dialect: 'postgres',
    logging: false
})

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection to the database has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

export { connectToDatabase, sequelize }