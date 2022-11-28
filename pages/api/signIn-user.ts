import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../prisma/client';
import { generateJwtToken, generateJwtRefreshToken } from '../../utils/jwtTokenHelpers';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Only POST methods are allowd!' })
  }

  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ ok: false, message: 'Invalid credentials.' })
  }

  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email
    },
    select: {
      id: true,
      username: true,
      email: true,
      token: true,
      role: true
    }
  })

  if (user) {
    const accessToken = await generateJwtToken({ id: user.id, username: user.username, email: user.email, role: user.role });
    const refreshToken = await generateJwtRefreshToken({ id: user.id, username: user.username, email: user.email, role: user.role });

    if (!user.token) {
      await prisma.token.create({
        data: {
          accessToken,
          refreshToken,
          tokenReference: {
            connect: {
              id: user.id
            }
          }
        }
      })
    } else {
      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          token: {
            update: {
              accessToken,
              refreshToken
            }
          }
        },
        select: {
          token: true
        }
      })
      setCookie('refresh_token', refreshToken, {
        httpOnly: true,
        req,
        res,
        maxAge: 60 * 60 * 24
      })
    }

    return res.status(200).json({
      accessToken,
      refreshToken
    })
  }

  return res.status(200).json({
    ok: false,
    message: 'Invalid credentials.'
  })

}