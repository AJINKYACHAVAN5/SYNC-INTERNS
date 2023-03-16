import { connectToDatabase } from '../../utils/dbConnect' //pass in the collection name
import { getSession } from 'next-auth/react'

export default async (req, res) => {

  // receives role & id of user
  const { db } = await connectToDatabase(process.env.MONGODB_DB)
  // get list of admin users
  const session = await getSession({ req })
  if (session) {
    let ObjectId = require('mongodb').ObjectId
    let o_id = new ObjectId(req.body._id)
    const upsertRole = await db.collection('users').updateOne(
      { _id: o_id }, //if role doesnt exist yet, create. if it does, update.
      {
        $set: {
          role: req.body?.selectedRole.name,
          name: req.body?.name,
          email: req.body?.email,
          image: req.body?.image,
        },
      },
      { upsert: true }
    )
    if (upsertRole) {
      console.log("🚀 ~ file: setRole.js:25 ~ upsertRole:", upsertRole)
      return res.status(200).json(upsertRole)
    }
  }
}
