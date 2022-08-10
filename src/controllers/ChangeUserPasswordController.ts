import { Request, Response } from 'express'

import ChangeUserPasswordService from '../services/ChangeUserPasswordService'

export default class ChangeUserPasswordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { password, new_password } = request.body
    const { user_id } = request

    const service = new ChangeUserPasswordService()

    await service.execute({
      user_id,
      password,
      new_password,
    })

    return response.status(204).send()
  }
}
