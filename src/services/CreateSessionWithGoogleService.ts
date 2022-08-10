import axios from 'axios'

import { sign } from 'jsonwebtoken'

import { prisma } from '../prisma'
import AppError from '../errors/AppError'

interface IGoogleTokenResponse {
  id_token: string
}

interface IGoogleTokenInfoResponse {
  sub: string
  name: string
  email: string
  picture: string
}

export default class CreateSessionWithGoogleService {
  public async execute(google_code: string) {
    try {
      const tokenResponse = await axios.post<IGoogleTokenResponse>(
        `https://oauth2.googleapis.com/token?code=${google_code}&client_id=${process.env.GOOGLE_CLIENT}&client_secret=${process.env.GOOGLE_SECRET}&redirect_uri=https%3A%2F%2Fbase-autenticacao-no-react-com-context-api-e-hooks.vercel.app&grant_type=authorization_code`
      )

      const tokenInfoResponse = await axios.post<IGoogleTokenInfoResponse>(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${tokenResponse.data.id_token}`
      )

      const { sub, email, name, picture } = tokenInfoResponse.data

      const oauth = await prisma.oAuth.findFirst({
        where: {
          token: sub,
        },
        include: {
          user: true,
        },
      })

      let user

      if (!oauth) {
        user = await prisma.user.findFirst({
          where: {
            email,
          },
        })

        if (!user) {
          user = await prisma.user.create({
            data: {
              name,
              phone: '',
              email,
              picture,
              have_password: false,
            },
          })
        }

        await prisma.oAuth.create({
          data: {
            provider: 'google',
            token: sub,
            user_id: user.id,
          },
        })
      } else {
        user = oauth.user
      }

      const token = sign({}, `${process.env.JWT_SECRET}`, {
        subject: user.id,
        expiresIn: '1d',
      })

      return { user, token }
    } catch (err) {
      throw new AppError('Ocorreu um erro ao se autenticar com Google.')
    }
  }
}
