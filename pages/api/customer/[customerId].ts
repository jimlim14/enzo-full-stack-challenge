import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { customerId } = req.query;
      const specificCustomer = await prisma.customer.findUnique({
        where: {
          id: Array.isArray(customerId) ? customerId[0] : customerId,
        },
        include: {
          contracts: true,
        }
      });
      res.status(200).json(specificCustomer);
    } catch (err) {
      res.status(400).json(err)
    }
  } 
  if (req.method === 'PUT') {
    try {
      const { phoneNumber } = req.body;
      const { customerId } = req.query;
      await prisma.customer.update({
          where: { id: Array.isArray(customerId) ? customerId[0] : customerId},
          data: { phoneNumber }
        })
      res.status(200);
    } catch(err) {
      res.status(400).json( {message: err});
    }
  }
}
