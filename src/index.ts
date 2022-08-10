import 'dotenv/config'

import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'

import cors from 'cors'
import path from 'path'

import routes from './routes'
import AppError from './errors/AppError'

const app = express()

app.use(cors())
app.use('/avatar', express.static(path.resolve(__dirname, '..', 'temp')))
app.use(express.json())
app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  if (err instanceof SyntaxError) {
    return response.status(400).json({
      status: 'Error',
      message: 'Bad Request!',
    })
  }

  console.error(err)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error!',
  })
})

app.listen(process.env.PORT || 3333, () => {
  console.log('👋 Server started')
})
