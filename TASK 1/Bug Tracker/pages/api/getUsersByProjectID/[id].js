

import { connectToDatabase } from '../../../utils/dbConnect' //pass in the collection name
import { getSession } from "next-auth/react"

export default async (req, res) => {
    if (req.method === 'GET') { 
        const {
            query: { id },
            method
        } = req
        const session = await getSession({ req })
        if (session) {
            const { db } = await connectToDatabase(process.env.MONGODB_DB);
            const project = await db.collection("projects").findOne({"My_ID": parseInt(id)})          
                
            
            if (project){
                let members = project.Members
                return res.status(200).json(members)   
            } else {
                return res.status(200).json({data:"no results"})   
            }
        }
    }
}







