import { prisma } from '../prisma'

import AppError from '../errors/AppError'

export default class ProfileUserService {
  public async execute(user_id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    })

    if (!user) {
      throw new AppError('User does not exist.')
    }

    return user
  }
}
