import { Request, Response } from 'express'

import ForgotPasswordService from '../services/ForgotPasswordService'

export default class ForgotPasswordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const service = new ForgotPasswordService()

    const result = await service.execute(email)

    return response.status(204).json(result)
  }
}
