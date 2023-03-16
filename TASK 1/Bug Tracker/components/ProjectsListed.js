import React from 'react'
import { CalendarIcon, ChevronRightIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { useAppContext } from '../context/contextState'

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getNameFromEmail(str){
    if (str){
      let indexOfAt = str.indexOf("@")
      return str.substring(0, indexOfAt)
    }
  }

function getRandomID() {
    return Math.floor(Math.random() * (9999999999 - 1111111111 + 1) + 1111111111)
  }


function ProjectsListed({projects, setCurrentProject, session}) {
    let context = useAppContext()

  return (
    <>
        <h3 className="pl-1 pb-4 text-lg leading-6 font-medium text-gray-900">{` ${session?.user?.name ? capitalizeFirstLetter(session.user.name) : capitalizeFirstLetter(getNameFromEmail(session.user.email))}'s Projects`}</h3>
          <div className="bg-white shadow overflow-hidden sm:rounded-md mb-28">
            <ul role="list" className="divide-y divide-gray-200">
            {projects.map((project, i) => (
              <li 
              key={getRandomID()}
              onClick={() => {
                context.setShowProject(true)
                setCurrentProject(i)
              }}
              key={project._id}>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex text-sm">
                          <p className="font-medium text-indigo-600 truncate">{project.Title}</p>
                        </div>
                        <div className="mt-0 flex">
                          <div className="flex items-center text-sm text-gray-500">
                            <p>
                              {project.Description}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                        <div className="flex overflow-hidden -space-x-1">
                          {project?.Members?.map(function(member, i) {
                            if (member?.image?.length > 1) {
                              return (
                                  <>
                                    <div className='relative h-6 w-6 rounded-full ring-2 ring-white object-cover'>
                                        <Image
                                        className='rounded-full'
                                        key={member.email} 
                                        src={member.image}
                                        layout="fill"
                                        objectFit="cover"
                                        />
                                    </div>
                                  </>      
                              )
                            } else {
                              return (
                                <span 
                                key={getRandomID()}
                                className="inline-block h-6 w-6 rounded-full text-sm text-black bg-Timberwolf pl-1.5 pt-px font-bold "  >{member?.email[0].toLocaleUpperCase()}</span>
                              )
                            }
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0">
                      <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
    </>
  )
}

export default ProjectsListed