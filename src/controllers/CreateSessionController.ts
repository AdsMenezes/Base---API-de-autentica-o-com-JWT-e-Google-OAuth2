import { Request, Response } from 'express'

import CreateSessionService from '../services/CreateSessionService'

export default class CreateSessionController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const service = new CreateSessionService()

    const session = await service.execute({ email, password })

    return response.json(session)
  }
}
