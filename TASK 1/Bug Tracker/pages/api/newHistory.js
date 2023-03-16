

import { connectToDatabase } from '../../utils/dbConnect' //pass in the collection name
import { getSession } from "next-auth/react"
import moment from 'moment'
import { isImportEqualsDeclaration } from 'typescript'

function getUserNameFromUserID(userID, allUserObjects, type){
    let name = null
    if (type = "oldValue") { //object structured different for old/new value objects that contain members
        for (const [key, value] of Object.entries(allUserObjects)) {
            if(value == userID){
                name = allUserObjects.name
            }
        }
    }
    if (type = "newValue" && typeof allUserObjects != "undefined") {
        allUserObjects.forEach(userObject => {
            if(userObject._id == userID){
                name = userObject.name
            }
    })
    }
    return name
}

function getNameFromEmail(str){
    if (str){
      let indexOfAt = str.indexOf("@")
      return str.substring(0, indexOfAt)
    }
  }

  function findOldValueFromNewValue(oldObject, keyName, newValue){
    let oldValue = null
    for (const [key, value] of Object.entries(oldObject)) {
        if (key == keyName) {
            oldValue = value
        }
    return oldValue
}
}

export default async (req, res) => {
    if (req.method === 'POST') { 
            const session = await getSession({ req })
            if (session) {
                const fieldsToUpdate = []
                const fieldsToUpdateMembersOnly = {}
                for (const [key, value] of Object.entries(req.body.editedValues)) {
                    if (value != null 
                    && key != 'selectedProjectID' 
                    && key!= 'TicketID') { 
                        fieldsToUpdate.push({key: key, value: value})
                        if (key == "MembersAdded" ){
                            fieldsToUpdateMembersOnly.MembersAdded  = value
                        }
                        if (key == "MembersRemoved" ){
                            fieldsToUpdateMembersOnly.MembersRemoved = value
                        }
                    }
                  }
                const { db } = await connectToDatabase(process.env.MONGODB_DB);
                // for each field that has been updated (not null),
                // find the old value in the old object
                // track the updated field name, old value, new value
                if (fieldsToUpdate?.length > 0){ //this is for updating status, title, descr, type, priority
                    for (const field of fieldsToUpdate) {    
                        if (field.key != "MembersAdded" && field.key != 'MembersRemoved') {
                            const newHistory = await db.collection("projects").updateOne({My_ID: req.body.ProjectID}, 
                                {$push: {
                                    [`History-${req.body.existingTicket.TicketID}`]: 
                                    {
                                        PropertyChanged: field.key, 
                                        OldValue: req.body.existingTicket[field.key],
                                        NewValue: field.value,
                                        Owner: session?.user?.name ? session?.user?.name :
                                        getNameFromEmail(session.user.email),
                                        CreatedAt: moment()
                                    }
                                }},{upsert: true})
                        if (newHistory){
                            if (!fieldsToUpdateMembersOnly?.MembersRemoved) { //if no member updates, then send the return response
                                return res.status(200).json(newHistory)   
                            } 
                        }
                    }
                }      
            }
                if (fieldsToUpdateMembersOnly?.MembersRemoved || fieldsToUpdateMembersOnly?.MembersAdded){ //this is for updating members only
                    const newHistory = await db.collection("projects").updateOne({My_ID: req.body.ProjectID}, 
                            {$push: {
                                [`History-${req.body.existingTicket.TicketID}`]: 
                                {
                                    PropertyChanged: "Members", 
                                    OldValue: getUserNameFromUserID(fieldsToUpdateMembersOnly.MembersRemoved, req.body.existingTicket.Members, "oldValue"),
                                    NewValue: getUserNameFromUserID(fieldsToUpdateMembersOnly.MembersAdded, req.body.selectedUserObjects, "newValue"),
                                    Owner: session?.user?.name ? session?.user?.name :
                                    getNameFromEmail(session.user.email),
                                    CreatedAt: moment()
                                }
                            }},{upsert: true})
                    if (newHistory){
                        return res.status(200).json(newHistory)   
                    }
                }
        }
    }
}








