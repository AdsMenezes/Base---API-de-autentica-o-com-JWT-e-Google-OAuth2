import axios from 'axios'

import { prisma } from '../prisma'

import AppError from '../errors/AppError'

interface IRequest {
  user_id: string
  google_code: string
}

interface IGoogleTokenResponse {
  id_token: string
}

interface IGoogleTokenInfoResponse {
  sub: string
  name: string
  email: string
  picture: string
}

export default class LinkGoogleService {
  public async execute({ user_id, google_code }: IRequest) {
    const userOAuthAlreadyExists = await prisma.oAuth.findFirst({
      where: {
        user_id,
      },
    })

    if (userOAuthAlreadyExists) {
      throw new AppError('Link already exists.')
    }

    const tokenResponse = await axios.post<IGoogleTokenResponse>(
      `https://oauth2.googleapis.com/token?code=${google_code}&client_id=${process.env.GOOGLE_CLIENT}&client_secret=${process.env.GOOGLE_SECRET}&redirect_uri=https%3A%2F%2Fbase-autenticacao-no-react-com-context-api-e-hooks.vercel.app&grant_type=authorization_code`
    )

    const tokenInfoResponse = await axios.post<IGoogleTokenInfoResponse>(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${tokenResponse.data.id_token}`
    )

    const { sub } = tokenInfoResponse.data

    const tokenAlreadyExists = await prisma.oAuth.findFirst({
      where: {
        token: sub,
      },
    })

    if (tokenAlreadyExists) {
      throw new AppError(
        'Já existe um outro usuário vinculado com esta conta do Google.'
      )
    }

    const oauth = await prisma.oAuth.create({
      data: {
        provider: 'google',
        token: sub,
        user_id,
      },
    })

    return oauth
  }
}
