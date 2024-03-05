import express from 'express'
import {config} from 'dotenv'
import cors from 'cors'
import getAwayHub from './routes/getAwayHub.js'
import users from './routes/users.js'
config()

const PORT = process.env.PORT || 3306

const app = express()

app.use(cors())

app.use(express.json())

app.use(express.static('views'))

app.use('getAwayHub', getAwayHub)
app.use('/users', users)