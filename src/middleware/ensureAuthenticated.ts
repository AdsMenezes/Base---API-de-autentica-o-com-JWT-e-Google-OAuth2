import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers

  if (!authorization) {
    return response.status(401).json({
      error: 'token.invalid',
    })
  }

  const [, token] = authorization.split(' ')

  try {
    const { sub } = verify(token, `${process.env.JWT_SECRET}`) as IPayload

    request.user_id = sub

    return next()
  } catch {
    return response.status(401).json({
      error: 'token.expired',
    })
  }
}
