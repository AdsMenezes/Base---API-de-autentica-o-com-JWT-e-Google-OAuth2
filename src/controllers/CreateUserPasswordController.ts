import { Request, Response } from 'express'

import CreateUserPasswordService from '../services/CreateUserPasswordService'

export default class CreateUserPasswordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { password } = request.body
    const { user_id } = request

    const service = new CreateUserPasswordService()

    await service.execute({
      user_id,
      password,
    })

    return response.status(204).send()
  }
}
