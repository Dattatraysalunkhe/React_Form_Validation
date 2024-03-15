import express from 'express'
import dotenv from "dotenv"
import {DB_Connect} from '../Api/DataBase/index.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config({
    path:'./.env'
})


const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN
}))

app.use(express.json({
    limit:"50kb"
}))


app.use(express.static("public"))

app.use(express.urlencoded())

app.use(cookieParser())

DB_Connect()

app.listen(process.env.PORT || 9000 , () => {

    console.log(`Server is runing port ${process.env.PORT}`)
})

import authRouter from '../api/routes/auth.routes.js'

app.use('/api/auth',authRouter)