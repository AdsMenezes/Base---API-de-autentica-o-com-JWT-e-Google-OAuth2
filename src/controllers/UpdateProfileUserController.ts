import { Request, Response } from 'express'

import UpdateProfileUserService from '../services/UpdateProfileUserService'

export default class UpdateProfileUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, phone } = request.body
    const { user_id } = request

    const service = new UpdateProfileUserService()

    const result = await service.execute({
      user_id,
      name,
      phone,
      filename: request.file?.filename,
    })

    return response.json(result)
  }
}
