import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/client";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const userData = req.body

  if (!userData.username || !userData.email || !userData.password || !userData.role) {
    return res.status(400).json({
      message: "Provide username, email, password and role!",
      success: false
    })
  }

  const user = await prisma.user.create({
    data: {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      role: userData.role
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true
    }
  })

  return res.status(200).json({
    message: "Successfully created.",
    success: true,
    user
  })

}