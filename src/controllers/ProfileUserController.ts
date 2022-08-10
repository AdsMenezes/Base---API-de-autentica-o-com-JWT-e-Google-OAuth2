import { Request, Response } from 'express'

import ProfileUserService from '../services/ProfileUserService'

export default class ProfileUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request

    const service = new ProfileUserService()

    const result = await service.execute(user_id)

    return response.json(result)
  }
}
