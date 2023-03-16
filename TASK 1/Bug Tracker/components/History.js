/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon, ThumbUpIcon, UserIcon } from '@heroicons/react/solid'
import useSWR, { useSWRConfig } from 'swr'
import { useState, useEffect } from 'react'
import moment from 'moment'

const fetcher = url => fetch(url).then(r => r.json().then(console.log("fetched data")))

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function History({ticket, project}) {
    const { data, error, isValidating } = useSWR(`/api/getHistory/${project.My_ID}-${ticket.TicketID}`, fetcher)
    const { mutate } = useSWRConfig()
    const [mutateHistory, setMutateHistory] = useState(false)

  if (error) return <div>failed to load</div>
  if (!data) return <span className='text-gray-400 text-sm'>Loading History...</span>
  if (typeof data?.length == "undefined") return<span className='text-gray-400 text-sm'>No History</span>
  if (data?.length > 0) return (
    <div className="flow-root">
      <ul role="list" className="-mb-8 pt-3">
        {data.map((event, eventIdx) => (
          <li key={event.CreatedAt._d}>
            <div className="relative pb-8">
              {eventIdx !== data.length - 1 ? (
                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={`${
                        eventIdx == 0 ? "bg-FuzzyWuzzy" : 
                        eventIdx == 1 ? "bg-Verdigris" : 
                        eventIdx == 2 ? "bg-Timberwolf" : 
                        eventIdx == 3 ? "bg-Tan" : 
                        eventIdx == 4 ? "bg-FuzzyWuzzy" : 
                        eventIdx == 5 ? "bg-Verdigris" : 
                        eventIdx == 6 ? "bg-Timberwolf" : 
                        eventIdx == 7 ? "bg-Tan" : 
                        eventIdx == 8 ? "bg-FuzzyWuzzy": 
                        eventIdx == 9 ? "bg-Verdigris" : 
                        "bg-FrenchViolet" } h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white`
                    }
                  >
                    <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                      {
                        // if old value is null, then a member was added.
                        event.OldValue == null ? 
                        <p className="text-sm text-gray-500">{`${event.Owner} updated ${event.PropertyChanged} by adding ${event.NewValue}`}</p>
                        :
                        // if new value is null, then member was removed
                        event.NewValue == null ? 
                        <p className="text-sm text-gray-500">{`${event.Owner} updated ${event.PropertyChanged} by removing ${event.OldValue}`}</p>
                        :
                        <p className="text-sm text-gray-500">{`${event.Owner} updated ${event.PropertyChanged} from ${event.OldValue} to ${event.NewValue}`}</p>
                      }
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    <time>{moment(event.CreatedAt._d).fromNow()}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
