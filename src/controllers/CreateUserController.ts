import { Request, Response } from 'express'

import CreateUserService from '../services/CreateUserService'

export default class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, phone, email, password } = request.body

    const service = new CreateUserService()

    const user = await service.execute({ name, phone, email, password })

    return response.status(201).json(user)
  }
}
