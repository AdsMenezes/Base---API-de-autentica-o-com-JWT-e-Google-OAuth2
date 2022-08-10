import { prisma } from '../prisma'

interface IRequest {
  oauth_id: string
  user_id: string
}

export default class UnlinkGoogleService {
  public async execute({ oauth_id, user_id }: IRequest) {
    await prisma.oAuth.delete({
      where: {
        id: oauth_id,
        user_id,
      },
    })
  }
}
