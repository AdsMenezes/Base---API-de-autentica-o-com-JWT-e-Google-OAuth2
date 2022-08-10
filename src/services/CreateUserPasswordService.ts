import { hash } from 'bcrypt'

import { prisma } from '../prisma'

import AppError from '../errors/AppError'

interface IRequest {
  user_id: string
  password: string
}

export default class CreateUserPasswordService {
  public async execute({ user_id, password }: IRequest): Promise<void> {
    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    })

    if (!user || user.password) {
      throw new AppError(
        'O usuário não existe ou já possui uma senha cadastrada.'
      )
    }

    const hashedPassword = await hash(password, 8)

    await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        password: hashedPassword,
        have_password: true,
      },
    })
  }
}
