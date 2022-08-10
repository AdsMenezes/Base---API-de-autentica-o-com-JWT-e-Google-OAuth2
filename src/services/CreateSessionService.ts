import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { prisma } from '../prisma'

import AppError from '../errors/AppError'

interface IRequest {
  email: string
  password: string
}

export default class CreateSessionService {
  public async execute({ email, password }: IRequest) {
    const user = await prisma.user.findFirst({
      where: { email },
    })

    if (!user || !user.password) {
      throw new AppError('E-mail ou senha está incorreto.')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('E-mail ou senha está incorreto.')
    }

    const token = sign({}, `${process.env.JWT_SECRET}`, {
      subject: user.id,
      expiresIn: '1d',
    })

    return { user, token }
  }
}
