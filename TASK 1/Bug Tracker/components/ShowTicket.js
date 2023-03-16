import React from 'react'
import { PaperClipIcon, PencilAltIcon } from '@heroicons/react/solid'
import moment from 'moment'
import CommmentPostBox from './CommentPostBox'
import Comments from './Comments'
import { useState, useEffect } from 'react'
import ImageUploader from './ImageUploader'
import useSWR, { useSWRConfig } from 'swr'
import EditTicket from './EditTicket'
import History from './History'
import { useAppContext } from '../context/contextState'
import { useToast } from '@chakra-ui/react'

const fetcher = url => fetch(url).then(r => r.json().then(console.log("fetched data")))

function getNameFromEmail(str){
    if (str){
      let indexOfAt = str.indexOf("@")
      return str.substring(0, indexOfAt)
    }
  }

function ShowTicket({ShowTicket, setShowTicket, ticket, project, session, showEdit, setShowEdit, mutateProject, setMutateProject, theParentProjectID}) {
  const toast = useToast()
  let context = useAppContext()
  const [mutateNewComment, setMutateNewComment] = useState(false)
  const { data, error, isValidating } = useSWR(`/api/getImages/${project.My_ID}-${ticket.TicketID}`, fetcher)
  const { mutate } = useSWRConfig()
  const [mutateImage, setMutateImage] = useState(false)

  useEffect(() => {
    mutate(`/api/getComments/${project.My_ID}-${ticket.TicketID}`)
  }, [mutateNewComment])

  useEffect(() => {
    mutate(`/api/getImages/${project.My_ID}-${ticket.TicketID}`)
  }, [mutateImage])

    function stringifyMembers(membersArray){
        let returnString = ''
        membersArray.forEach(function (member, i) {
            let name = member?.name ? member.name : getNameFromEmail(member.email)
            if (i == (membersArray.length - 1)){
                returnString += name
            } else {
                returnString += name + ", "
            }
           })
        return returnString
    }

  return (
    <div className='mb-28'>
    {
      showEdit ? 
      <EditTicket 
        mutateProject={mutateProject} 
        setMutateProject={setMutateProject} 
        session={session} 
        showEdit={showEdit} 
        setShowEdit={setShowEdit} 
        existingTicket={ticket} 
        existingProject={project}
      />
      :

      <div className='grid-cols-1 grid md:grid-cols-2 gap-4'>
      {/* first column */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg rounded-md">
          <div className="flex justify-between px-4 py-5 sm:px-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">{ticket.Title}</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">{ticket.Description}</p>
            </div>
            <div 
            onClick={()=> {
              if (context?.role == "Admin" || context?.role == "Project Manager" || context?.role == "Developer") {
                setShowEdit(!showEdit)
              } else {
                console.log(context.role)
                toast({
                  title: `You Need Permission to Perform This Action`,
                  status: 'error',
                  isClosable: true,
                })
              }
            }}
            className='pt-1'>
              <PencilAltIcon className='hover:cursor-pointer text-black h-5 pl-4'/>
              <h1 className='text-gray-500 pl-3 text-sm'>Edit</h1>
            </div>
           
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Created</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{moment(ticket.CreatedAt).fromNow()} by {ticket.SubmittedBy}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{ticket.Description}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Assigned To</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{stringifyMembers(ticket.Members)}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Project</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{project.Title}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Ticket Priority</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{ticket.Priority}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Ticket Type</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{ticket.Type}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Ticket Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{ticket.Status}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{moment(ticket.updatedAt).fromNow()}</dd>
              </div>
             
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="sm:col-span-3 text-sm font-medium text-gray-500">Attachments</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                  <ul role="list" className="rounded-md divide-y ">
                    {
                      data?.length > 0 && data?.map(image => {
                        return (
                          <li className="pl-3 pr-4 py-3  items-center  text-sm">
                            <div className='flex justify-between'>
                                <div className="w-0 flex-1 flex items-center">
                                <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <span className="ml-2 flex-1 w-0 truncate">{image.title}</span>
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <a target="_blank" href={image.image} className="font-medium text-indigo-600 hover:text-indigo-500">
                                  View
                                </a>
                              </div>
                            </div>
                            <span className="text-gray-500">{image.Description}</span>
                        </li>
                        )
                      })
                    }
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      
        {/* second column */}
          <div className='text-black pt-2 sm:pt-12 md:pt-0'>
          
            <div className='bg-white shadow overflow-hidden sm:rounded-lg p-4 rounded-md'>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Comments</h3>
              <Comments project={project} session={session} ticket={ticket} mutateNewComment={mutateNewComment} setMutateNewComment={setMutateNewComment}/>
              <CommmentPostBox project={project} ticket={ticket} session={session} mutateNewComment={mutateNewComment} setMutateNewComment={setMutateNewComment}/>
            </div>
            
            
            <div className='mt-4 bg-white shadow overflow-hidden sm:rounded-lg p-4 rounded-md'>
              <ImageUploader ticket={ticket} project={project} mutateImage={mutateImage} setMutateImage={setMutateImage}/>
            </div>
              
            <div className='mt-4 bg-white shadow overflow-hidden sm:rounded-lg p-4 rounded-md'>
            <h3 className="pb-1 bg-transparent text-lg leading-6 font-medium text-gray-900">History</h3>
              <History ticket={ticket} project={project}/>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default ShowTicket


