

import { connectToDatabase } from '../../utils/dbConnect' //pass in the collection name
import { getSession } from "next-auth/react"
const ObjectId = require('mongodb').ObjectId

// u
export default async (req, res) => {
    if (req.method === 'POST') { 
            var id = req.body.projectID
            var md_id = new ObjectId(id);
            const session = await getSession({ req })
            if (session) {
                const { db } = await connectToDatabase(process.env.MONGODB_DB);
                const newComment = await db.collection("projects").updateOne({My_ID: req.body.ProjectID}, 
                    {$push: {
                        [`Comments-${req.body.TicketID}`]: req.body.Comment
                    }},{upsert: true})                      
                if (newComment){
                    return res.status(200).json(newComment)   
                }
            }
           
        }
}







