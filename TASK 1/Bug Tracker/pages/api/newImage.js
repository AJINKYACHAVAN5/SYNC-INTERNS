

import { connectToDatabase } from '../../utils/dbConnect' //pass in the collection name
import { getSession } from "next-auth/react"

export default async (req, res) => {
    if (req.method === 'POST') { 
            var id = req.body.projectID    
            const session = await getSession({ req })
            if (session) {
                const { db } = await connectToDatabase(process.env.MONGODB_DB);
                const newImage = await db.collection("projects").updateOne({My_ID: req.body.ProjectID}, 
                    {$push: {
                        [`Images-${req.body.TicketID}`]: {image:req.body.Image, title: req.body.ImageTitle, Description: req.body.Description}
                    }},{upsert: true})                       
                if (newImage){
                    return res.status(200).json(newImage)   
                }
            }
        }
}







