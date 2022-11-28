// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../prisma/client';

interface userData {
  username: string,
  email: string,
  password: string
}

export interface createUserResponseInterface {
  success: boolean,
  message: string | unknown,
  data?: {
    id: string,
    username: string,
    email: string
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<createUserResponseInterface>
) {


  const userData: userData = req.body;

  if (!userData.username || !userData.email || !userData.password) {
    return res.status(400).json({
      message: "You need to provide username, email, password.",
      success: false
    })
  }

  if (await prisma.user.findUnique({
    where: {
      email: userData.email
    }
  })) {
    return res.json({
      message: "Email already taken!",
      success: false
    })
  }

    const user = await prisma.user.create({data: {
      ...userData,
    },
    select: {
      id: true,
      username: true,
      email: true,
    }
  })

  if (user) {
    return res.json({
      message: "Created new user.",
      success: true,
      data: {
        ...user
      }
    })
  }
}
