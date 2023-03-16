import React from 'react'
import useSWR, { useSWRConfig } from 'swr'
import SelectUsers from './SelectUsers'
import SelectRole from './SelectRole'
import AllUsersGrid from './AllUsersGrid'
import { useState, useEffect } from 'react'
import PartyLottie from './PartyLottie'

const fetcher = url => fetch(url).then(r => r.json().then(console.log("fetched data")))

const roles = [
    {
      id: 1,
      name: 'Admin'
    },
    {
      id: 2,
      name: 'Project Manager'
    },
    {
      id: 3,
      name: 'Developer'
    },
    {
      id: 3,
      name: 'User'
    },
   
  ]

const defaultUser = [{
    name: "Alex",
    image: "/images/alex.jpg",
    email: "alex@email.com"
  }]
  
function RoleAssignment({session}) {
    const [party, setParty] = useState(false)
    const { data, error, isValidating } = useSWR('/api/getUsersAdminRequired', fetcher)
    const { mutate } = useSWRConfig()
    const [selectedRole, setSelectedRole] = useState(roles[0])
    const [selectedUser, setSelectedUser] = useState(data?.length ? data[0] : defaultUser[0])
    const [buttonMessage, setButtonMessage] = useState("Submit")
    const [loading, setLoading] = useState(false)
    const [reFetch, setRefetch] = useState(false)

    useEffect(() => {
        async function sleep(){
            setTimeout(() => {
                setParty(false)
               
            }, 1000);
        }
        sleep()
    }, [party])
    

    useEffect(() => {
        async function sleep(){
            setTimeout(() => {
                setButtonMessage("Submit")
            }, 5000);
        }
    if (buttonMessage != "Submit") {
        sleep()
        
    }
    }, [buttonMessage])

    useEffect(() => {
        mutate('/api/getUsersAdminRequired')
    }, [reFetch])

    async function handleSubmit(){
        setParty(true)
        setLoading(true)
        let submitRole = await fetch ('/api/setRole', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({...selectedUser, selectedRole}) 
        })

        if (submitRole.ok) {
            setButtonMessage("Updated")
        } else {
            setButtonMessage(submitRole.statusText)

        }
        setLoading(false) 
        setRefetch(!reFetch)  //triggers mutate to update swr data     
    }
   
    if (data?.error) return (
    <>
        <div class="flex h-screen">
            <div class="m-auto pb-96">
                <h3 className='text-black text-lg'>{data.error}</h3>
            </div>
        </div>
    </>
    ) 
        
    if (!data?.error) return (
        <>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-10'>
                <div>
                    {/* first column */}
                    {
                        data ? 
                    
                    <SelectUsers 
                        users={data} 
                        session={session} 
                        selected={selectedUser} 
                        setSelected={setSelectedUser}
                    />
                    :
                    <div className='h-14 animate-pulse bg-gray-300 w-full rounded-lg'></div>
                    }
                </div>
                <div>
                    {/* second column */}
                    {
                        data ? 
                    <SelectRole 
                        selected={selectedRole} 
                        setSelected={setSelectedRole} 
                        roles={roles}
                    />
                    :
                    <div className='h-14 animate-pulse bg-gray-300 w-full rounded-lg'></div>
                    }
                </div>
                <div className='md:pt-8'>
                    {/* third column */}
                    {
                        data ? 
                    <button
                        disabled={buttonMessage != "Submit"}
                        onClick={()=> handleSubmit()}
                        type="button"
                        className=" w-full items-center text-center py-3 border border-transparent text-base font-medium rounded-md text-white bg-Verdigris  hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-Verdigris"
                    >
                        {
                            !loading ? 
                            buttonMessage
                            :
                            <svg class="animate-spin mx-auto h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="purple" strokeWidth="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        }
                    </button>
                    :
                    <div className='md:-mt-8 h-14 animate-pulse bg-gray-300 w-full rounded-lg'></div>
                    }
                </div>
                </div>
                <div className='pt-4 pb-32'>
                    {/* all users  */}
                    {
                        data ? 
                        <>
                            <h3 className="pb-2 text-lg leading-6 font-medium text-gray-900">All Users</h3>
                            <AllUsersGrid users={data}/>
                        </>

                    :
                    <div className='h-72 animate-pulse bg-gray-300 w-full rounded-lg'></div>
                    }
                </div>  
        </>
    )
}

export default RoleAssignment


