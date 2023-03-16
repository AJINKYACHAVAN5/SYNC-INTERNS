import { connectToDatabase } from '../../utils/dbConnect' //pass in the collection name
import { getSession } from "next-auth/react"

export default async (req, res) => {
    if (req.method === 'POST') {    
            const session = await getSession({ req })
            if (session) {
                const { db } = await connectToDatabase(process.env.MONGODB_DB);
                const newProject = await db
                .collection("projects")
                .insertOne(req.body)
                if (newProject){
                    return res.status(200).json(newProject)   
                }
            }
        }
}







