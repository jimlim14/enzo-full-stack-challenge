// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Contract, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const contracts: Contract[] = await prisma.contract.findMany();
      res.status(200).json(contracts);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  } 
  if (req.method === 'POST') {
    try {
      const { customerId, contractDetails } = req.body;
      const contract: Contract = await prisma.contract.create({
        data: {
          customerId,
          contractDetails,
        },
      });
      res.status(200).json(contract);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err });
    }
  }
}
