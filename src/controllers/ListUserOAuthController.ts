import { Request, Response } from 'express'

import ListUserOAuthService from '../services/ListUserOAuthService'

export default class ListUserOAuthController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request

    const service = new ListUserOAuthService()

    const result = await service.execute(user_id)

    return response.json(result)
  }
}
