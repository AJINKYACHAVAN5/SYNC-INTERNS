/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import Image from 'next/image'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SelectUsers({session, users, defaultUser, selected, setSelected}) {
  let loadedUsers = users?.length ? users : defaultUser //load default data while waiting for users to fetch

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <h3 className="pb-1 text-lg leading-6 font-medium text-gray-900">Select a User</h3>
          <div className="mt-1 relative ">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="flex items-center">
              {
                    selected?.image ?
                    <div className='relative h-8 w-8 rounded-full object-cover'>
                      <Image
                      className='rounded-full'
                    
                      src={selected.image}
                      layout="fill"
                      objectFit="cover"
                      />
                    </div>

                    // if image, use image
                    :
                    // if no image, use first letter of name
                    <span className='font-bold text-black text-2xl  pl-1'>{selected?.email[0].toLocaleUpperCase()}</span>
              }
              {
                  //   some entries have a name, some only have an email. prase the name out of the email if needed.
                  selected?.name ? 
                  <span className="ml-3 block truncate text-black">{selected.name}</span>
                  :
                  <span className="ml-3 block truncate text-black">{selected.email}</span>
                  
              }
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
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
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {loadedUsers?.map((person) => (
                  <Listbox.Option
                    key={person.name}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9',
                        `${person.email == "admin@email.com" ? "hidden" : null}`,
                        `${person.email == "user@email.com" ? "hidden" : null}`,
                        `${person.email == "manager@email.com" ? "hidden" : null}`,
                        `${person.email == "developer@email.com" ? "hidden" : null}`,
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                            {
                                person?.image ?
                                <div className='relative flex-shrink-0 h-8 w-8 rounded-full object-cover'>
                                  <Image
                                  className='rounded-full'
                                  src={person.image}
                                  layout="fill"
                                  objectFit="cover"
                                  />
                                </div>
                                // if image, use image
                                :
                                // if no image, use first letter of name
                                <span className='h-6 w-6 flex-shrink-0 font-bold text-black text-2xl  pl-1'>{person.email[0].toLocaleUpperCase()}</span>
                            }
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                              {
                                //   some entries have a name, some only have an email. prase the name out of the email if needed.
                                person?.name ? 
                                person.name
                                :
                                person.email
                              }
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
