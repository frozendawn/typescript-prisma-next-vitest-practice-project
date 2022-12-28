import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page, itemsPerPage } = req.body;
  const skip = page <= 0 ? 0 : page * itemsPerPage;
  const result = await prisma.item.findMany({
    skip,
    take: itemsPerPage
  });

  res.json({
    results: result
  })
}