import { Request, Response } from 'express'

import DeleteUserAccountService from '../services/DeleteUserAccountService'

export default class DeleteUserAccountController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body
    const { user_id } = request

    const service = new DeleteUserAccountService()

    await service.execute({
      user_id,
      user_email: email,
    })

    return response.status(204).send()
  }
}
