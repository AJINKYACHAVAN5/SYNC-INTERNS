import React from 'react'
import PartyLottie from './PartyLottie'
import { useState, useEffect } from 'react'

function NewProjectSubmitButtons({buttonMessage, loading, visibleErrorString, handleSubmit, setShowNewTicket, showNewTicket, setShowEditProject,setShowProject, mutateProject, setMutateProject}) {
    const [party, setParty] = useState(false)
    useEffect(() => {
        async function sleep(){
            setTimeout(() => {
                setParty(false)
               
            }, 1000);
        }
        sleep()
    }, [party])
  return (
    <>
        <div className="relative flex justify-end pt-5">
            {
                party &&
                <div className='absolute w-40 -mt-14 pl-8'>
                    <PartyLottie />
                </div>
            }
            <button
                disabled={buttonMessage != "Submit"}
                onClick={() => {
                    setParty(true)
                    handleSubmit()}}
                type="submit"
                className="z-10 w-32 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-Verdigris hover:bg-opacity-90 focus:outline-none "
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
        </div>
        <div className="flex justify-end pr-1 pt-3">
            {
                visibleErrorString != null && <p className='text-red-700 text-lg'>{visibleErrorString}</p>
            }
        </div>
    </>
  )
}
export default NewProjectSubmitButtons