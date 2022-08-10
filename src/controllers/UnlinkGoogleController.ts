import { Request, Response } from 'express'

import UnlinkGoogleService from '../services/UnlinkGoogleService'

export default class UnlinkGoogleController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { oauth_id } = request.body
    const { user_id } = request

    const service = new UnlinkGoogleService()

    await service.execute({ user_id, oauth_id })

    return response.status(204).send()
  }
}
