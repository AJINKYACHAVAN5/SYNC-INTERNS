import { useState } from 'react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Combobox } from '@headlessui/react'

const fallBackItem = [
  { id: 1, name: 'Loading...' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ComboBox({projects, setSelectedProjectID, existingProject, editedValues, setEditedValues, setSelectedProjectMyID}) {
  const [query, setQuery] = useState('')
  const [items, setItems] = useState(projects?.length ? projects : fallBackItem)
  const [selectedProject, setSelectedProject] = useState(!existingProject ? items[0] : existingProject)
  
  const filteredItems =
    query === ''
      ? items
      : items.filter((project) => {
          return project.Title.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox  as="div" value={selectedProject} onChange={
        (e)=>{
          setItems(e)
            if (existingProject){//only true for Edit Ticket page
              setEditedValues({...editedValues, selectedProjectID: e._id})
            }
            }}>
      <Combobox.Label className="block text-sm font-medium text-gray-700">Assign to Project</Combobox.Label>
      <div className="relative mt-1 w-full">
        <Combobox.Input
          className="text-black w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(project) => project.Title}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredItems.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredItems.map((project) => (
              <Combobox.Option
                key={project._id}
                value={project}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-8 pr-4',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames('block truncate', selected && 'font-semibold')}>{project.Title}</span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 left-0 flex items-center pl-1.5',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}
