import { prisma } from '../prisma'

import AppError from '../errors/AppError'

interface IRequest {
  user_id: string
  user_email: string
}

export default class DeleteUserAccountService {
  public async execute({ user_id, user_email }: IRequest) {
    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    })

    if (!user) {
      throw new AppError('O usuário não existe.')
    }

    if (user.email !== user_email) {
      throw new AppError(
        'E-mail informado não corresponde com e-mail do usuário.'
      )
    }

    await prisma.user.delete({
      where: {
        id: user_id,
      },
      include: {
        oauth: true,
      },
    })
  }
}
