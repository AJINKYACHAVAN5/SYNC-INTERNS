import React from 'react'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import AllUsersGrid from './AllUsersGrid'
import TicketList from './TicketList'
import BreadCrumb from './BreadCrumb'
import {PencilAltIcon } from '@heroicons/react/solid'
import ShowTicket from './ShowTicket'
import EmptyTicketState from './EmptyTicketState'
import { useState } from 'react'
import NewTicket from '../components/NewTicket'
import AllTicketsFilter from './AllTicketsFilter'
import { useAppContext } from '../context/contextState'
import { useToast } from '@chakra-ui/react'

function ShowProject({project, setShowProject, showTicket, setShowTicket, selectedTicket, setSelectedTicket, session, showEdit, setShowEdit, mutateProject, setMutateProject, setShowEditProject, showEditProject, projects}) {
  const toast = useToast()
  let context = useAppContext()
  const [showNewTicket, setShowNewTicket] = useState(false)
  const [selectedArray, setSelectedArray] = useState([
    "Additional Info Required",
    "Resolved",
    "In Progress",
    "Open"
  ])

  return (
    <>
    {
      showNewTicket && 
      <NewTicket 
        setShowNewTicket={setShowNewTicket}
        showNewTicket={showNewTicket}
        _projects={projects}
      />
    }
    {
      showTicket && !showNewTicket && 
      <>
        <ShowTicket 
        mutateProject={mutateProject} 
        setMutateProject={setMutateProject} 
        session={session} 
        showTicket={showTicket} 
        setShowTicket={setShowTicket} 
        ticket={project.Tickets[selectedTicket]} 
        project={project} 
        showEdit={showEdit} 
        setShowEdit={setShowEdit}
        /> 
     </>
    }
      {
        !showTicket && !showNewTicket &&
        <div className='pb-28'>
            <div className="bg-white shadow overflow-hidden sm:rounded-md flex justify-between px-4 py-5 sm:px-6 rounded-md">
                <div>
                    <h3 className="pt-6 pb-1 text-lg leading-6 font-medium text-gray-900">{project.Title}</h3>
                    <p className='pb-3 text-black pt-1 text-sm'>{project.Description}</p>
                </div>
                <div 
                  onClick={()=> {
                    if (context?.role == "Admin" || context?.role == "Project Manager" ) {
                      setShowEditProject(true)
                    } else {
                      toast({
                        title: `You Need Permission to Perform This Action`,
                        status: 'error',
                        isClosable: true,
                      })
                    }
                    
                  }}
                  className='pt-8'>
                    <PencilAltIcon className='hover:cursor-pointer text-black h-5 pl-4'/>
                    <h1 className='text-gray-500 pl-3 text-sm'>Edit</h1>
                </div>
            </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              {
                !showTicket && !showNewTicket &&
                <>
                    <h3 className="pl-1 pt-9 pb-1 text-lg leading-6 font-medium text-gray-900"> Members</h3>
                    <AllUsersGrid users={project.Members}/>
                </>
              }
            </div>
            <div>
              {
                project?.Tickets?.length > 0 && !showNewTicket &&
                <>
                  <h3 className="md:pt-9 pb-1 pl-1pb-1 text-lg leading-6 font-medium text-gray-900">All Tickets</h3>
                  <AllTicketsFilter 
                    session={session}
                    selectedArray={selectedArray}
                    setSelectedArray={setSelectedArray}
                  />
                  <TicketList
                    tickets={project.Tickets} 
                    showTicket={showTicket} 
                    setShowTicket={setShowTicket} 
                    setShowProject={setShowProject} 
                    setSelectedTicket={setSelectedTicket} 
                    selectedArray={selectedArray}
                    setSelectedArray={setSelectedArray}
                  />
                </>
              }
                {
                  !showNewTicket && !project?.Tickets?.length &&
                  <div className=''>
                    <h3 className="md:pt-9 pb-1 pl-1pb-1 text-lg leading-6 font-medium text-gray-900">All Tickets</h3>
                    <EmptyTicketState
                      projects={projects} 
                      session={session}
                      showNewTicket={showNewTicket}
                      setShowNewTicket={setShowNewTicket}
                    />
                  </div>
                }
              </div>
          </div>
        </div>
      }
    </>
  )
}
export default ShowProject