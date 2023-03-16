import { getEventListeners } from "events"
import { useState } from 'react'
import Image from 'next/image'

function getNameFromEmail(str){
    if (str){
      let indexOfAt = str.indexOf("@")
      return str.substring(0, indexOfAt)
    }
  }
  
  export default function AllUsersAlpha({users, selectedUserID, setSelectedUserID, editedValues, setEditedValues, existingProject}) {    
      function handleRemove(id) {
        setSelectedUserID(selectedUserID.filter(function(e) { return e !== id }))
      }
      function handleSelect(id){
        setSelectedUserID([...selectedUserID, id])
      }   

    return (
      <nav className="h-full overflow-y-auto" aria-label="Directory">
        {Object.keys(users).map((letter) => (
          <div key={letter} className="relative">
            <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500 rounded-md">
              <h3>{letter}</h3>
            </div>
            <ul role="list" className="relative z-0 divide-y divide-gray-200">
              {users[letter].map((person) => (
                <li 

                onClick={() => {
                    // if its not already selected, select it
                    if (!selectedUserID.includes(person._id)) {
                        handleSelect(person._id)
                        if (existingProject){ //only true for edit ticket
                          setEditedValues({...editedValues, MembersAdded: person._id})
                        }
                    }
                    // if its already selected, un-select it
                    else {
                        handleRemove(person._id)
                        if (existingProject){ //only true for edit ticket
                          setEditedValues({...editedValues, MembersRemoved: person._id})
                        }
                    }
                }}
                key={person.id} className="bg-white">
                  <div className={`${selectedUserID.includes(person._id) ? "bg-Tan bg-opacity-70" : ""} relative px-6 py-5 flex space-x-3 rounded-md `}>
                    <div className="flex-shrink-0">
                        {
                            person?.image ? 
                            <div className='relative h-10 w-10 rounded-full object-cover'>
                                <Image
                                className='rounded-full'
                                
                                src={person.image}
                                layout="fill"
                                objectFit="cover"
                                />
                            </div>
                            :
                            <span className="h-10 w-10 rounded-full text-black bg-Timberwolf py-3 px-4 font-bold "  >{person?.email[0].toLocaleUpperCase()}</span>
                        }
                    </div>
                    <div className="flex-1 min-w-0">
                      <a href="#" className="focus:outline-none">
                        {/* Extend touch target to entire panel */}
                        <span className="absolute inset-0" aria-hidden="true" />
                        {
                            person?.name ?
                            <p className="text-sm font-medium text-gray-900">{person.name}</p>
                            :
                            <p className="text-sm font-medium text-gray-900">{getNameFromEmail(person?.email)}</p>
                        }
                        <p className="text-sm text-gray-500 truncate">{person.role}</p>
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    )
  }
  