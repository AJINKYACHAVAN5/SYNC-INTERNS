import React from 'react'
import TicketList from './TicketList'
import useSWR, { useSWRConfig } from 'swr'
import ShowTicket from './ShowTicket'
import { useState, useEffect } from 'react'
import EditTicket from './EditTicket'
import { useAppContext } from '../context/contextState'
import { parseConfigFileTextToJson } from 'typescript'
import EmptyTicketState from './EmptyTicketState'
import EmptySpaceLottie from './EmptySpaceLottie'
import EmptyProjectState from './EmptyProjectState'
import AllTicketsFilter from './AllTicketsFilter'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getNameFromEmail(str){
  if (str){
    let indexOfAt = str.indexOf("@")
    return str.substring(0, indexOfAt)
  }
}

function getData(endpoint){
  const { data, error, isValidating } = useSWR(endpoint, fetcher)
  const data1 =  { data :data}
  return data1.data
}

const fetcher = url => fetch(url).then(r => r.json().then(console.log("fetched data")))

function AllTickets({session}) {
  let context = useAppContext()
    const { data, error, isValidating } = useSWR(`api/getTicketsByUserID/${session?.user?.email}`, fetcher)
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [selectedProject, setSelectedProject] = useState(null)
    const { mutate } = useSWRConfig()
    const [mutateProject, setMutateProject] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [theParentProjectID, setTheParentProjectID] = useState(null)
    const projects = getData(`/api/getProjectsByUser/${session?.user?.email}`)
    const [selectedArray, setSelectedArray] = useState([
      "Additional Info Required",
      "Resolved",
      "In Progress",
      "Open"
    ])
    useEffect(() => {
      mutate(`api/getTicketsByUserID/${session?.user?.email}`)
    }, [mutateProject])

    function findProjectByProjectID(projectsArray, projectID){
      let returnObject
      projectsArray.forEach(project  => {
  
        if (parseInt(project.My_ID) == parseInt(projectID)) {
          returnObject = project
        }
      })
      return returnObject
    }

    useEffect(() => {
      if (data?.ProjectsForUser && data?.TicketsForUser[selectedTicket]?.ParentProjectID){
        const selectedProjectObject = findProjectByProjectID(data.ProjectsForUser, data.TicketsForUser[selectedTicket].ParentProjectID)
        setSelectedProject(selectedProjectObject)
      }
    }, [selectedTicket])

  return (
    <>
      {
        data?.TicketsForUser?.length == 0 && !context.showTicket && projects?.length > 0 &&
        <>
          <h3 className="pl-1 pb-4 text-lg leading-6 font-medium text-gray-900">{` ${session.user?.name ? capitalizeFirstLetter(session.user.name) : capitalizeFirstLetter(getNameFromEmail(session.user.email))}'s Tickets`}</h3>
          <EmptyTicketState fromAllTicketsPage={true}/>
          <div className='h-full flex justify-center '>
            <div className='max-w-lg m-auto'>
              <EmptySpaceLottie />
            </div>
          </div>
        </>
      }
      {
        data?.TicketsForUser?.length == 0 && !context.showTicket && projects?.length == 0 &&
        <>
          <h3 className="pl-1 pb-4 text-lg leading-6 font-medium text-gray-900">{` ${session.user?.name ? capitalizeFirstLetter(session.user.name) : capitalizeFirstLetter(getNameFromEmail(session.user.email))}'s Tickets`}</h3>
          <EmptyProjectState 
            customTitle={"Create a Project Before Creating a Ticket"} 
            fromAllTicketsPage={true}
          />
          <div className='h-full flex justify-center '>
            <div className='max-w-lg m-auto'>
              <EmptySpaceLottie />
            </div>
          </div>
        </>
      }
      {
        data?.TicketsForUser.length > 0 && !context.showTicket && 
        <>
          <h3 className="pl-1 pb-4 text-lg leading-6 font-medium text-gray-900">{` ${session.user?.name ? capitalizeFirstLetter(session.user.name) : capitalizeFirstLetter(getNameFromEmail(session.user.email))}'s Tickets`}</h3>
          <AllTicketsFilter 
            selectedArray={selectedArray}
            setSelectedArray={setSelectedArray}
          />
          <TicketList
            setTheParentProjectID={setTheParentProjectID}
            setSelectedProject={setSelectedProject}
            data={data}
            findProjectByProjectID={findProjectByProjectID}
            selectedTicket={selectedTicket}
            setSelectedTicket={setSelectedTicket}
            showTicket={context.showTicket}
            setShowTicket={context.setShowTicket}
            tickets={data.TicketsForUser}
            selectedArray={selectedArray}
          />
        </>
        }    
        {
          data && context.showTicket && selectedProject &&       
          <ShowTicket
            theParentProjectID={theParentProjectID} 
            ticket={data.TicketsForUser[selectedTicket]}
            showTicket={context.showTicket} 
            setShowTicket={context.setShowTicket}
            project={selectedProject}
            session={session}
            mutateProject={mutateProject} 
            setMutateProject={setMutateProject}
            showEdit={showEdit} 
            setShowEdit={setShowEdit}
          />
        }       
    </>
  )
}

export default AllTickets