/* This example requires Tailwind CSS v2.0+ */
import { PlusIcon } from '@heroicons/react/solid'
import { useAppContext } from '../context/contextState'

export default function EmptyTicketState({showNewTicket, setShowNewTicket, fromAllTicketsPage}) {
  let context = useAppContext()

  return (
    <div className="py-6 bg-white shadow overflow-hidden sm:rounded-lg rounded-md">
         <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="grey" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>

      <h3 className="mt-2 text-sm font-medium text-gray-900">No tickets</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by creating a new ticket.</p>
        <div className="mt-6">
          <button
          onClick={()=> {
            if (fromAllTicketsPage){ //for when accessing from all tickets component
              context.setTab(-2)
            } else {
              setShowNewTicket(true) //for when accessing from projects component
            }
          }}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New Ticket
          </button>
        </div>
      </div>
    </div>
  )
}
