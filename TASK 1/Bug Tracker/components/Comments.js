import useSWR, { useSWRConfig } from 'swr'
import { Fragment } from 'react'
import { ChatAltIcon, TagIcon, UserCircleIcon } from '@heroicons/react/solid'
import moment from 'moment'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const fetcher = url => fetch(url).then(r => r.json().then(console.log("fetched data")))

export default function Comments({project, ticket, mutateNewComment, setMutateNewComment}) {
    const { data, error, isValidating } = useSWR(`/api/getComments/${project.My_ID}-${ticket.TicketID}`, fetcher)
    const { mutate } = useSWRConfig()
  useEffect(() => {
    mutate(`/api/getComments/${project.My_ID}-${ticket.TicketID}`)
  }, [mutateNewComment])
  
  if (error) return <span className='text-gray-400 text-sm'>Error</span>
  if (!data) return <span className='text-gray-400 text-sm'>Loading Comments...</span>
  if (typeof data?.length == "undefined") return <span className='text-gray-400 text-sm'>No Comments</span>
  if (data?.length > 0) return (
    <div>
    <ul role="list" className="divide-y divide-gray-200">
      {data.map((activityItem) => (
        <li key={activityItem.CommentID} className="py-4">
          <div className="flex space-x-3">
          {
            activityItem?.Owner?.image ? 
            <div className='relativeh-10 w-10 rounded-full'>
                <Image
                className='rounded-full'
                
                src={activityItem?.Owner?.image}
                layout="fill"
                objectFit="cover"
                />
            </div>
            // <img className="h-10 w-10 rounded-full" src={activityItem?.Owner?.image} alt="" />
            :
            <span className="h-10 w-10 rounded-full text-black bg-Timberwolf pt-2 pl-3.5 font-bold "  >{activityItem?.Owner?.name[0].toLocaleUpperCase()}</span>
          }
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">{activityItem?.Owner?.name}</h3>
                <p className="text-sm text-gray-500">{moment(activityItem.CreatedAt).fromNow()}</p>
              </div>
              <p className="text-sm text-gray-500">
                {activityItem.value}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
  )
}
