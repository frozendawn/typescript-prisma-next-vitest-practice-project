import type { NextApiRequest, NextApiResponse } from 'next'
import { generateJwtToken } from '../../utils/jwtTokenHelpers';
const jwt = require('jsonwebtoken');

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  
  if(req.method !== 'POST') {
    return res.status(405).json({ok: false, message: 'Only POST methods are allowd!'})
  }

  if(!req.body.refreshToken) {
    return res.status(401).json({ok: false, message: 'Invalid credentials.'})
  }
  
  try {
    const result = jwt.verify(req.body.refreshToken, process.env.JWT_SECRET)
    const newToken = await generateJwtToken({id: result.id ,username: result.username, email: result.email, role: result.role})
    res.status(200).json({
      ok: true,
      message: "New access token created.",
      accessToken: newToken,
      refreshToken: req.body.refreshToken
    })

  } catch (error) {
    console.log("ERROR IN: /api/refresh-token ", error)
    return res.status(500).json({
      ok: false,
      message: "Internal server error."
    })
  }

}