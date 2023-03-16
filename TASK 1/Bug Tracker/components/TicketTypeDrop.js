import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function findSelectedTypeByExistingTicket(existingType){
  const type = [
    { id: 1, name: 'Bug', color: "bg-blue-400" },
    { id: 2, name: 'Documentation', color: "bg-yellow-400" },
    { id: 3, name: 'Duplicate', color: "bg-red-400" },
    { id: 4, name: 'Enhancement', color: "bg-orange-400" },
    { id: 4, name: 'Good First Issue', color: "bg-purple-400"  },
    { id: 4, name: 'Help Wanted', color: "bg-green-400"  },
    { id: 4, name: 'Invalid', color: "bg-gray-400"  },
    { id: 4, name: 'Question', color: "bg-pink-400"  },
    { id: 4, name: 'Wont Fix', color: "bg-blue-100"  },
  
  ]
  let returnObj = {}
  type.forEach(_type => {
    if (_type.name == existingType) {
      returnObj = {
        "id": _type.id,
        "name": _type.name,
        "color": _type.color
    }
    }
  })
  return returnObj
}

export default function TicketTypeDrop({ticket, setTicket, type, existingTicket, editedValues, setEditedValues}) {
  const [selected, setSelected] = useState(!existingTicket ? type[0] : findSelectedTypeByExistingTicket(existingTicket.Type))
  return (
    <Listbox cvalue={selected} onChange={(e)=>{
      setSelected(e)
      setTicket({...ticket, Type: e.name})
      if (existingTicket) { //only true for edit Ticket page
        setEditedValues({...editedValues, Type: e.name})
      }
    }}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">Type</Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="z-30 relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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
              <Listbox.Options className="z-30 absolute  mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {type.map((person) => (
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
