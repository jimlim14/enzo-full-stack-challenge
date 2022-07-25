// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { Customer } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const customers: Customer[] = await prisma.customer.findMany({
        include: {
          contracts: true,
        } 
      });
      res.status(200).json(customers);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  } 
  if (req.method === 'POST') {
    try {
      const { name, email } = req.body;
      const customer = await prisma.customer.create({
        data: {
          name,
          email,
        }
      });
      res.status(200).json(customer)
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err })
    }
  }
}
