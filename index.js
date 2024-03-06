import express from 'express'
import {config} from 'dotenv'
import cors from 'cors'
import getAwayHub from './routes/getAwayHub.js'
import users from './routes/users.js'
import login from './routes/login.js'
import cookieParser from 'cookie-parser'
import auth from './controller/auth.js'
config()

const PORT = process.env.PORT || 3306

const app = express()

app.use(cors(
    {
        credentials: true
    }
))

app.use(express.json())

app.use(express.static('views'))

app.use(cookieParser())

app.use('/login', auth, login)



app.use('/getAwayHub', getAwayHub)
app.use('/users', users)

app.listen(PORT,()=>{
    console.log(`It is running on http://localhost:${PORT}/`)
    })