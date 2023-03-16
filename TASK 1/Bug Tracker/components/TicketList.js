import moment from 'moment'
import { InformationCircleIcon, LocationMarkerIcon, UsersIcon } from '@heroicons/react/solid'

function colorBadgeByPriority(priority) {
  let color
  if (priority == "Low") {
    color = "bg-Timberwolf "
  }
  if (priority == "Medium") {
    color = "bg-Tan"
  }
  if (priority == "High") {
    color = "bg-Verdigris"
  }
  if (priority == "Emergency") {
    color = "bg-FuzzyWuzzy"
  }
  return color
}

export default function TicketList({selectedTicket, tickets, showTicket, setShowTicket, setShowProject, setSelectedTicket, showEdit, setShowEdit, findProjectByProjectID, data, setSelectedProject, setTheParentProjectID, selectedArray}) {
  return (
    <>
      <div className="bg-white shadow overflow-hidden sm:rounded-md rounded-md mb-24">
        <ul role="list" className="divide-y divide-gray-200">
          {tickets.map((Ticket, i) => (
            <li 
            className={`${selectedArray.includes(Ticket.Status) ? '' : 'hidden'}`}
            onClick={()=> {
              setShowTicket(true)
              setSelectedTicket(i)
              // setTheParentProjectID(Ticket.ParentProjectID)
              if (data?.ProjectsForUser){
                setSelectedProject(findProjectByProjectID(data.ProjectsForUser, data.TicketsForUser[i].ParentProjectID))
              }
          }
        }
          key={Ticket.TicketID}>
            <a href="#" className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">{Ticket.Title}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorBadgeByPriority(Ticket.Priority)}`}>
                      {Ticket.Priority}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">

                      <InformationCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      {Ticket.Type}
                    </p>  
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                     {moment(Ticket.CreatedAt).fromNow()}
                    </p>
                  </div>
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
