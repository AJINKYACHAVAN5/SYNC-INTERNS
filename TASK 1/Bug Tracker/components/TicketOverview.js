/* This example requires Tailwind CSS v2.0+ */
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid'
import { CursorClickIcon, MailOpenIcon, UsersIcon, TicketIcon } from '@heroicons/react/outline'
import { useState } from 'react'

function getRandomID() {
    return Math.floor(Math.random() * (9999999999 - 1111111111 + 1) + 1111111111)
}

const stats = [
  { id: 1, name: 'Low', stat: '71,897', icon: UsersIcon, change: '122', changeType: 'increase' },
  { id: 2, name: 'Medium', stat: '58.16%', icon: MailOpenIcon, change: '5.4%', changeType: 'increase' },
  { id: 3, name: 'High', stat: '24.57%', icon: CursorClickIcon, change: '3.2%', changeType: 'decrease' },
  { id: 3, name: 'Emergency', stat: '24.57%', icon: CursorClickIcon, change: '3.2%', changeType: 'decrease' },
]

function parseTickets(tickets){
    let low = 0
    let medium = 0
    let high = 0
    let emergency  = 0
    tickets.forEach(ticket => {
        if (ticket.Priority == "Low"){
            low ++
        }
        if (ticket.Priority == "Medium"){
            medium ++
        }
        if (ticket.Priority == "High"){
            high ++
        }
        if (ticket.Priority == "Emergency"){
            emergency ++
        }
    })
    return [
        {
            title: "Low",
            count: low,
            percent: low == 0 ? 0 : Math.floor((low / tickets.length) * 100),
            color: "bg-Timberwolf"
        },
       {
            title: "Medium",
            count: medium,
            percent: medium == 0 ? 0 : Math.floor((medium / tickets.length) * 100),
            color: "bg-Tan"
        },
        {
            title: "High",
            count: high,
            percent: high == 0 ? 0 : Math.floor((high / tickets.length) * 100),
            color: "bg-Verdigris"
        },
        {
            title: "Emergency",
            count: emergency,
            percent: emergency == 0 ? 0 : Math.floor((emergency / tickets.length) * 100),
            color: "bg-FuzzyWuzzy"
        },
    ]
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TicketOverView({tickets}) {
    const [priorityStats, setPriorityState] = useState(tickets ? parseTickets(tickets) : null)
   
if (!tickets) return <h1>Loading...</h1>
if (tickets) return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">Tickets by Priority</h3>

      <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {priorityStats.map((item) => (
          <div
            key={getRandomID()}
            className="relative bg-white pt-5 px-4 pb-0 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className={`${item.color} absolute rounded-md p-3`}>
                    <TicketIcon className="h-6 w-6 text-white" aria-hidden="true" />               
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.title}</p>
            </dt>
            <dd className="ml-16 pb-5 flex items-baseline sm:pb-5">
              <p className="text-2xl font-semibold text-gray-900">{item.count}</p>
              <p
                className={classNames(
                  item.percent < 33 ? 'text-Verdigris' 
                  : 
                  item.percent > 33 && item.percent < 66 ? 'text-indigo-800' 
                  :
                  'text-red-600' ,
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              > 
              

              <span className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                {(item.percent)} %
             </p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
