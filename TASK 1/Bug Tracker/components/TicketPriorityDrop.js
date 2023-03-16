import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

function findSelectedPriorityByExistingTicket(existingPriority){
  const priorities = [
    { id: 1, name: 'Low', color: "bg-yellow-400" },
    { id: 2, name: 'Medium', color: "bg-blue-400" },
    { id: 3, name: 'High', color: "bg-red-400" },
    { id: 4, name: 'Emergency', color: "bg-red-600 animate-ping" },
  ]
  let returnObj = {}
  priorities.forEach(priority => {
    if (priority.name == existingPriority) {
      returnObj = {
        "id": priority.id,
        "name": priority.name,
        "color": priority.color
    }
    }
  })
  return returnObj
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TicketPriorityDrop({ticket, setTicket, priorities, existingTicket, editedValues, setEditedValues}) {
  const [selected, setSelected] = useState(!existingTicket ? priorities[0] : findSelectedPriorityByExistingTicket(existingTicket.Priority))
  return (
    <Listbox value={selected}onChange={(e)=>{
        setSelected(e)
        setTicket({...ticket, Priority: e.name})
        if (existingTicket) { //only true for edit ticket 
          setEditedValues({...editedValues, Priority: e.name})
        }
      }}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">Priority</Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="z-20 relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <div className="flex items-center">
                <span
                  
                  className={classNames(
                    selected.color, 
                    'flex-shrink-0 inline-block h-2 w-2 rounded-full'
                  )}
                />
                <span className="ml-3 block truncate">{selected.name}</span>
              </div>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-20 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {priorities.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              person.color,
                              'flex-shrink-0 inline-block h-2 w-2 rounded-full'
                            )}
                            aria-hidden="true"
                          />
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {person.name}
                            <span className="sr-only"> is {person.online ? 'online' : 'offline'}</span>
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
