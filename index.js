import express from 'express'
import {config} from 'dotenv'
import cors from 'cors'
import getAwayHub from './routes/getAwayHub.js'
import users from './routes/users.js'
import cart from './routes/cart.js'
import loginRouter from './routes/login.js'
import cookieParser from 'cookie-parser'
import {auth} from './middleware/authenticate.js'
import { authenticate } from './middleware/cartAuth.js'
import signUp from './routes/signUp.js'

config()

const PORT = process.env.PORT || 3306

const app = express()

app.use(cors(
    {
    origin: 'http://localhost:8080',
    credentials: true
    }
))

app.use(express.json())

app.use(express.static('views'))

app.use(cookieParser())

app.use('/login', auth, loginRouter)

app.use('/cart', cart)
// , authenticate
app.use('/getAwayHub', getAwayHub)
// ,authenticate took this out so that i could see products 

app.use('/users',authenticate,users)

app.use('/signUp', signUp)

app.listen(PORT,()=>{
    console.log(`It is running on http://localhost:${PORT}/`)
    })