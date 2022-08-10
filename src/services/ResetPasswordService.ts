import { hash } from 'bcrypt'

import { prisma } from '../prisma'

import AppError from '../errors/AppError'

interface IRequest {
  code: string
  password: string
}

export default class ResetPasswordService {
  public async execute({ code, password }: IRequest) {
    const token = await prisma.token.findFirst({
      where: {
        id: code,
      },
    })

    if (!token) {
      throw new AppError(
        'Esse link de redefinição de senha já expirou. Envie uma nova solicitação de recuperação de senha para obter um novo link.'
      )
    }

    const hashedPassword = await hash(password, 8)

    await prisma.user.update({
      where: {
        email: token.email,
      },
      data: {
        password: hashedPassword,
        have_password: true,
      },
    })

    await prisma.token.delete({
      where: {
        id: token.id,
      },
    })

    return true
  }
}
