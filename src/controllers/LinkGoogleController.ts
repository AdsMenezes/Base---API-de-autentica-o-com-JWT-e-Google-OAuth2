import { Request, Response } from 'express'

import LinkGoogleService from '../services/LinkGoogleService'

export default class LinkGoogleController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { code } = request.body
    const { user_id } = request

    const service = new LinkGoogleService()

    const result = await service.execute({
      user_id,
      google_code: code,
    })

    return response.status(203).json(result)
  }
}
