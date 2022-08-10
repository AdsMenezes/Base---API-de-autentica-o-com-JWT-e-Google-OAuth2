import { prisma } from '../prisma'

interface IRequest {
  user_id: string
  name: string
  phone: string
  filename?: string
}

export default class UpdateProfileUserService {
  public async execute({ user_id, name, phone, filename }: IRequest) {
    const user = await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        name,
        phone,
        picture: filename && `${process.env.API_URL}/avatar/${filename}`,
      },
    })

    return user
  }
}
