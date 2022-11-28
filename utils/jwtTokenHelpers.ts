const jwt = require('jsonwebtoken');

const generateJwtToken = async (user: {id: string, username: string, email: string, role: 'USER' | 'ADMIN'}) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '10s' });
  return token;
}

const generateJwtRefreshToken = async (user: {id: string, username: string, email: string, role: 'USER' | 'ADMIN'}) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });
  return token;
}

const verifyJwtToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded

  } catch (error) {
  }
  return null
}


export {
  generateJwtToken,
  generateJwtRefreshToken,
  verifyJwtToken
}