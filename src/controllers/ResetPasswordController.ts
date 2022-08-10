import { Request, Response } from 'express'

import ResetPasswordService from '../services/ResetPasswordService'

export default class ResetPasswordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { code, password } = request.body

    const service = new ResetPasswordService()

    const result = await service.execute({
      code,
      password,
    })

    return response.status(204).json(result)
  }
}
