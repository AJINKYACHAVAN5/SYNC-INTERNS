

import { connectToDatabase } from '../../utils/dbConnect' //pass in the collection name
import { getSession } from "next-auth/react"
const ObjectId = require('mongodb').ObjectId

// updateOne({_id: good_id}).   
export default async (req, res) => {
    if (req.method === 'POST') { 
            var id = req.body.projectID
            var good_id = new ObjectId(id);
            const session = await getSession({ req })
            if (session) {
                const { db } = await connectToDatabase(process.env.MONGODB_DB);
                const newTicket = await db.collection("projects").updateOne({_id: good_id}, 
                        {$push: {
                            Tickets: req.body.TicketObject, 
                            
                        }})
                if (newTicket){
                    return res.status(200).json(newTicket)   
                }
            }
        }
}







