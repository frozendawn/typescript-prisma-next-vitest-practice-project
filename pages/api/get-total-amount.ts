import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../prisma/client';

export interface getTotalAmountResponse {
  totalAmount: number | null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<getTotalAmountResponse>) {
  const response = await prisma.item.count();
  let totalAmount: null | number = null;
  totalAmount = response ? response : totalAmount;

  res.json({
    totalAmount: totalAmount
  })
}