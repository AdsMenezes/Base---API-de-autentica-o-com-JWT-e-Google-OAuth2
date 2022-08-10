import { compare, hash } from 'bcrypt'

import { prisma } from '../prisma'

import AppError from '../errors/AppError'

interface IRequest {
  user_id: string
  password: string
  new_password: string
}

export default class ChangeUserPasswordService {
  public async execute({
    user_id,
    password,
    new_password,
  }: IRequest): Promise<void> {
    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    })

    if (!user || !user.password) {
      throw new AppError(
        'Usuário não existe ou não possui uma senha cadastrada.'
      )
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('A senha está incorreta.')
    }

    const hashedPassword = await hash(new_password, 8)

    await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        password: hashedPassword,
      },
    })
  }
}
