import { Request, Response } from 'express'

import CreateSessionWithGoogleService from '../services/CreateSessionWithGoogleService'

export default class CreateSessionWithGoogleController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { code } = request.body

    const service = new CreateSessionWithGoogleService()

    const session = await service.execute(code)

    return response.json(session)
  }
}
