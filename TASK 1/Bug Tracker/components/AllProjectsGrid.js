import useSWR, { useSWRConfig } from 'swr'
import { useState, useEffect } from 'react'
import ShowProject from './ShowProject'
import EditProject from './EditProject'
import { useAppContext } from '../context/contextState'
import ProjectsSkeleton from './ProjectsSkeleton'
import EmptyProjectState from './EmptyProjectState'
import EmptySpaceLottie from './EmptySpaceLottie'
import ProjectsListed from './ProjectsListed'

function getRandomID() {
  return Math.floor(Math.random() * (9999999999 - 1111111111 + 1) + 1111111111)
}

const fetcher = url => fetch(url).then(r => r.json().then(console.log("fetched data")))

export default function AllProjectsGrid({session}) {
  let context = useAppContext()
  const { data, error, isValidating } = useSWR(`/api/getProjectsByUser/${session?.user?.email}`, fetcher)
  const [currentProject, setCurrentProject] = useState(null)
  const [showTicket, setShowTicket] = useState(false) //ticket edit
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [showEdit, setShowEdit] = useState(false)
  const { mutate } = useSWRConfig()
  const [mutateProject, setMutateProject] = useState(false)
   
  useEffect(() => {
    mutate('/api/getProjects')
  }, [mutateProject])
  
  if (error) return <>error</>
  if (!data) return <ProjectsSkeleton />
  if (data) return (
    <>
      {
        context.showEditProject && 
        <EditProject 
          mutate={mutate}
          mutateProject={mutateProject}
          setMutateProject={setMutateProject}
          setShowEditProject={context.setShowEditProject}
          session={session}
          existingProject={
            context.searchBarSelectedProject == null ?
            data[currentProject]
            :
            context.searchBarSelectedProject
          }
        />
      }
   
      {
        context.showProject && !context.showEditProject && 
        (context.searchBarSelectedProject?.Title != null ||
          data[currentProject]?.Title != null) &&
          <ShowProject 
            projects={data}
            showEditProject={context.showEditProject}
            setShowEditProject={context.setShowEditProject}
            mutateProject={mutateProject} 
            setMutateProject={setMutateProject} 
            showEdit={showEdit} 
            setShowEdit={setShowEdit} 
            session={session} 
            project={
              context.searchBarSelectedProject == null ?
              data[currentProject]
              :
              context.searchBarSelectedProject
            } 
            setShowProject={context.setShowProject} 
            showTicket={showTicket} 
            setShowTicket={setShowTicket} 
            setSelectedTicket={setSelectedTicket} 
            selectedTicket={selectedTicket}
          /> 
        
      }
      {
        !context.showEditProject && !context.showProject ?
        <>
            {
              data?.length == 0 &&
              <>
                <h3 className="pb-4 pl-1  text-lg leading-6 font-medium text-gray-900">My Projects</h3>
                <EmptyProjectState />
                <div className='h-full flex justify-center '>
                  <div className='max-w-lg m-auto'>
                    <EmptySpaceLottie />
                  </div>
                </div>
              </>
            }
            { 
              data?.length > 0 && 
              <ProjectsListed 
                projects={data} 
                setCurrentProject={setCurrentProject}
                session={session}
              />
            }
        </>
          :
          null
      } 
    </>
  )
}
