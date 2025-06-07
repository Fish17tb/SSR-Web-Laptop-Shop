import { prisma } from "config/prismaClient"

const getAllProduct = async () => {
const products = await prisma.product.findMany()
return products
}


export {
   getAllProduct 
}