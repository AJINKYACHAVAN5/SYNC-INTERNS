import { connectToDatabase } from '../../utils/dbConnect' //pass in the collection name
import { getSession } from "next-auth/react"

export default async (req, res) => {
    if (req.method === 'GET') {
        const session = await getSession({ req })
        if (session) {
        const { db } = await connectToDatabase(process.env.MONGODB_DB);
        const allProjectsArray = await db.collection('projects').find().toArray()
        if (allProjectsArray) {
            return res.status(200).json(allProjectsArray)    
        }             
        }
    }
}