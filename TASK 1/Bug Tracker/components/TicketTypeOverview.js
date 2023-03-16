
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid'
import { useState } from 'react'

function getRandomID() {
    return Math.floor(Math.random() * (9999999999 - 1111111111 + 1) + 1111111111)
}

const stats = [
  { name: 'Total Subscribers', stat: '71,897', previousStat: '70,946', change: '12%', changeType: 'increase' },
  { name: 'Avg. Open Rate', stat: '58.16%', previousStat: '56.14%', change: '2.02%', changeType: 'increase' },
  { name: 'Avg. Click Rate', stat: '24.57%', previousStat: '28.62%', change: '4.05%', changeType: 'decrease' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function parseTickets (tickets) {
    let Bug = 0
    let Documentation = 0
    let Duplicate = 0
    let Enhancement = 0
    let GoodFirstIssue = 0
    let HelpWanted = 0
    let Invalid = 0
    let Question = 0
    let WontFix = 0
    tickets.forEach(ticket => {
        if (ticket.Type == "Bug") {
            Bug ++
        }
        if (ticket.Type == "Documentation") {
            Documentation ++
        }
        if (ticket.Type == "Duplicate") {
            Duplicate ++
        }
        if (ticket.Type == "Enhancement") {
            Enhancement ++
        }
        if (ticket.Type == "GoodFirstIssue") {
            GoodFirstProject ++
        }
        if (ticket.Type == "HelpWanted") {
            HelpWanted ++
        }
        if (ticket.Type == "Invalid") {
            Invalid ++
        }
        if (ticket.Type == "Question") {
            Question ++
        }
        if (ticket.Type == "WontFix") {
            WontFix ++
        }
    })
    return [
        {
            title: "Bug",
            count: Bug,
            percent: Bug == 0 ? 0 : Math.floor((Bug / tickets.length) * 100),
            color: "bg-blue-400"
        },
        {
            title: "Documentation",
            count: Documentation,
            percent: Documentation == 0 ? 0 : Math.floor((Documentation / tickets.length) * 100),
            color: "bg-yellow-400"
        },
        {
            title: "Duplicate",
            count: Duplicate,
            percent: Duplicate == 0 ? 0 : Math.floor((Duplicate / tickets.length) * 100),
            color: "bg-red-400"
        },
        {
            title: "Enhancement",
            count: Enhancement,
            percent: Enhancement == 0 ? 0 : Math.floor((Enhancement / tickets.length)  * 100),
            color: "bg-orange-400"
        },
        {
            title: "Good First Issue",
            count: GoodFirstIssue,
            percent: GoodFirstIssue == 0 ? 0 : Math.floor((GoodFirstIssue / tickets.length) * 100),
            color: "bg-purple-400"
        },
        {
            title: "Help Wanted",
            count: HelpWanted,
            percent: HelpWanted == 0 ? 0 : Math.floor((HelpWanted / tickets.length) * 100),
            color: "bg-green-400"
        },
        {
            title: "Invalid",
            count: Invalid,
            percent: Invalid == 0 ? 0 : Math.floor((Invalid / tickets.length) * 100),
            color: "bg-gray-400"
        },
        {
            title: "Question",
            count: Question,
            percent: Question == 0 ? 0 : Math.floor((Question / tickets.length) * 100),
            color: "bg-pink-400"
        },
        {
            title: "Wont    Fix",
            count: WontFix,
            percent: WontFix == 0 ? 0 : Math.floor((WontFix / tickets.length) * 100),
            color: "bg-blue-400"
        },
    ]
}

export default function TicketTypeOverview({tickets}) {
const [typeStats, setTypeStats] = useState(tickets ? parseTickets(tickets) : null)
if (!tickets) return <h1>Loading....</h1>
if (tickets) return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">Tickets by Type</h3>
      <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
        {typeStats.map((item) => (
          <div key={getRandomID()} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">{item.title}</dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                {item.count}
              </div>
              <div
                className={classNames(
                    item.percent < 33 ? 'text-Verdigris' 
                    : 
                    item.percent > 33 && item.percent < 66 ? 'text-indigo-800' 
                    :
                    'text-FuzzyWuzzy' ,
                    'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                <span className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                {(item.percent) } %
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
