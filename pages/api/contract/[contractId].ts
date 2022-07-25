import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { contractId } = req.query;
    const specificContract = await prisma.contract.findUnique({
      where: {
        id: Array.isArray(contractId) ? contractId[0] : contractId
      }
    })
    res.status(200).json(specificContract);
  }
  if (req.method === 'PUT') {
    try {
      const { contractDetails } = req.body;
      const { contractId } = req.query;
      const updatedContract = await prisma.contract.update({
        where: { id: Array.isArray(contractId) ? contractId[0] : contractId },
        data: { contractDetails}
      });
      res.status(200).json(updatedContract);
    } catch (err) {
      res.status(400).json( {message: err} );
    }
  }
}