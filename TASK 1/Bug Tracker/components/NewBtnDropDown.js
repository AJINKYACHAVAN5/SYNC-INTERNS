/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition,  } from '@headlessui/react'
import { PlusSmIcon } from '@heroicons/react/solid'
import { useToast } from '@chakra-ui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NewBtnDropDown({context, projects}) {
  const toast = useToast()

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="mr-2 flex bg-indigo-600 p-1 rounded-full items-center justify-center text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span className="sr-only">Open options</span>
          <PlusSmIcon className="h-6 w-6" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => {
                    if (context?.role == "Admin" || context?.role == "Project Manager" ){
                      context.setTab(-1)
                    } else {
                      toast({
                        title: `You Need Permission to Perform This Action`,
                        status: 'error',
                        isClosable: true,
                      })
                      
                    }
                  }}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  New Project
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                onClick={() => {
                  context.setTab(-2)
                }}
                 
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    `block px-4 py-2 text-sm ${projects?.length > 0 ? '' : "hidden"}`
                  )}
                >
                  New Ticket
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
