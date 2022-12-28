import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/client";
import { generateJwtToken, verifyJwtToken } from "../../utils/jwtTokenHelpers"
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import { shopItem } from '../../types/shopItem';

//Use the newly create verifyJwtToken helper instead of try catching everywhere

type userInputType = {
  accessToken: string;
  category: string;
  name: string;
  imageUrl: string;
  price: string;
  description: string;
}

type createItemResponse = {
  success: boolean;
  message: string | unknown;
  data?: shopItem
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<createItemResponse>) {
  const userInput: userInputType = req.body;
  let token;
  const refreshTokenCookie = getCookie('refresh_token', { req, res });

  if (!verifyJwtToken(userInput.accessToken) || refreshTokenCookie) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/refresh-token`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ refreshToken: refreshTokenCookie })
    })

    const data = await response.json();
    token = await verifyJwtToken(data.accessToken)
  }

  if (!token) {
    return res.json({
      message: "Invalid credentials.",
      success: false
    })
  }

  const categoryId = await prisma.category.findUnique({
    where: {
      name: userInput.category
    },
    select: {
      id: true
    }
  })

  if (!categoryId) {
    return res.json({
      message: "The provided category is invalid.",
      success: false,
    })
  }

  const item = await prisma.item.create({
    data: {
      name: userInput.name,
      description: userInput.description,
      imageUrl: userInput.imageUrl,
      price: userInput.price,
      categoryReference: {
        connect: {
          id: categoryId.id
        }
      },
      userReference: {
        connect: {
          id: token.id
        }
      }
    },
    include: {
      categoryReference: true
    }
  })

  item ? res.json({
    message: "Item created.",
    success: true,
    data: {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      imageUrl: item.imageUrl,
      category: item?.categoryReference?.name
    }
  }) :
    res.json({
      message: "Error occured while creating the item.",
      success: false
    })
}