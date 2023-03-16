

import { connectToDatabase } from '../../utils/dbConnect' //pass in the collection name
import { getSession } from "next-auth/react"

export default async (req, res) => {
    if (req.method === 'POST') {            
        const session = await getSession({ req })
        if (session) {
            let editTicket = null
            const { db } = await connectToDatabase(process.env.MONGODB_DB);
            editTicket = await db.collection("projects").updateOne({My_ID:req.body.My_ID},
            {
                $set: {
                    Title: req.body.Title,
                    Description: req.body.Description,
                    Members: req.body.Members
                }
            }
        )  
        if (editTicket != null){
            return res.status(200).json(editTicket)   
        } else {
            return res.data({error: "error updating"})   
        }
      }   
   }
}







