// get role

import { connectToDatabase } from '../../../utils/dbConnect' //pass in the collection name
import { getSession } from 'next-auth/react'

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req
  if (req.method === 'GET') {
    const session = await getSession({ req })
    if (session?.user?.email == 'admin@email.com') {
      return res.status(200).json({ role: 'Admin' })
    }
    if (session?.user?.email == 'developer@email.com') {
      return res.status(200).json({ role: 'Developer' })
    }
    if (session?.user?.email == 'user@email.com') {
      return res.status(200).json({ role: 'User' })
    }
    if (session?.user?.email == 'manager@email.com') {
      return res.status(200).json({ role: 'Manager' })
    }

    if (session) {
      const { db } = await connectToDatabase(process.env.MONGODB_DB)
      const project = await db.collection('users').findOne({ email: id })
      if (project) {
        return res.status(200).json({ role: project.role })
      }
    }
    return res.status(200).json({ data: 'No Session' })
  }
}
