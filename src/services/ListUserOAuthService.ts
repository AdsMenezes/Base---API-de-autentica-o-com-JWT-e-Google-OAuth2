import { prisma } from '../prisma'

export default class ListUserOAuthService {
  public async execute(user_id: string) {
    const oauth = await prisma.oAuth.findFirst({
      where: {
        user_id,
      },
    })

    return oauth
  }
}
