import { Client } from 'pg'

// Connect to the default `postgres` DB to create `student` DB
const initClient = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '28601',
    port: 5432,
    database: 'postgres',
})

async function setupDatabase() {
    try {
        await initClient.connect()

        // Create the student database
        await initClient.query(`CREATE DATABASE student`)
        console.log('Database "student" created.')
    } catch (err) {
        if (err.code === '42P04') {
            console.log('Database "student" already exists.')
        } else {
            console.error('Error creating database:', err)
        }
    } finally {
        await initClient.end()
    }

    // Now connect to the `student` database
    const studentClient = new Client({
        user: 'postgres',
        host: 'localhost',
        password: '28601',
        port: 5432,
        database: 'student',
    })

    try {
        await studentClient.connect()

        // Create student table
        await studentClient.query(`
        CREATE TABLE IF NOT EXISTS student (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            age INTEGER,
            parentId INTEGER REFERENCES student(id) ON DELETE CASCADE
        )
        `)

        // Create marks table with ON DELETE CASCADE
        await studentClient.query(`
      CREATE TABLE IF NOT EXISTS marks (
        id SERIAL PRIMARY KEY,
        studentId INTEGER REFERENCES student(id) ON DELETE CASCADE,
        marks INTEGER NOT NULL
      )
    `)

        console.log('Tables "student" and "marks" created successfully.')
    } catch (err) {
        console.error('Error setting up tables:', err)
    } finally {
        await studentClient.end()
    }
}

setupDatabase()
