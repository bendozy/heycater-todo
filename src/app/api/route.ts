import { NextApiRequest } from "next"

export const dynamic = 'force-dynamic' // defaults to auto


export async function GET(req: NextApiRequest) {
  const forwarded = req.headers['x-forwarded-for']
  const clientIp = forwarded ? (Array.isArray(forwarded) ? forwarded[0] : forwarded).split(/, /)[0] : req.connection.remoteAddress
  
  return Response.json({ clientIp })
}