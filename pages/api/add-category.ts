import { NextApiRequest, NextApiResponse } from "next";
const jwt = require('jsonwebtoken');
import { getCookie } from "cookies-next";
import { prisma } from "../../prisma/client";
import { verifyJwtToken } from "../../utils/jwtTokenHelpers";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  let token = req.body.accessToken;
  let categoryName = req.body.categoryName;

  const refreshToken = getCookie("refresh_token", { req, res })

  if(!token || !categoryName) {
    return res.status(400).json({
      message: "You need to provide token and category."
    })
  }
  
  if(!verifyJwtToken(token) || refreshToken) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({refreshToken})
    })
    const data = await response.json();

    if (data.accessToken) {
      token = jwt.verify(data.accessToken, process.env.JWT_SECRET)

      if (token.role === 'ADMIN') {
        const category = await prisma.category.create({
          data: {
            name: categoryName
          }
        })

        return res.json({
          message: "Successfully created category",
          success: true,
          category
        })
      }
    }
  }

  return res.json({
    message: "Unauthorized!",
    success: false
  })

}