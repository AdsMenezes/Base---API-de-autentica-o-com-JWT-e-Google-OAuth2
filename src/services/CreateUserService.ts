import { hash } from 'bcrypt'

import { prisma } from '../prisma'

import AppError from '../errors/AppError'

interface IRequest {
  name: string
  phone: string
  email: string
  password: string
}

export default class CreateSessionService {
  public async execute({ name, phone, email, password }: IRequest) {
    const userEmailAlreadyExists = await prisma.user.findFirst({
      where: { email },
    })

    if (userEmailAlreadyExists) {
      throw new AppError(
        'Já existe um usuário utilizando este endereço de e-mail.'
      )
    }

    const hashedPassword = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        phone,
        email,
        password: hashedPassword,
        have_password: true,
      },
    })

    return user
  }
}
