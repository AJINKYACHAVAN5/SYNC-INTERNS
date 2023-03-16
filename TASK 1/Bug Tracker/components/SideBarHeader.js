import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  CogIcon,
  HomeIcon,
  MenuAlt2Icon,
  PhotographIcon,
  TicketIcon,
  XIcon,
  MailIcon,
  UserGroupIcon,
  CollectionIcon,
  MenuIcon,
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import React from 'react'
import Link from 'next/link'
import { useAppContext } from '../context/contextState'
import { useEffect, Fragment, useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import SelectUsers from './SelectUsers'
import RoleAssignment from './RoleAssignment'
import NewBtnDropDown from './NewBtnDropDown'
import AllProjectsGrid from './AllProjectsGrid'
import NewProject from './NewProject'
import NewTicket from './NewTicket'
import AllTickets from './AllTickets'
import Home from './Home'
import SearchBar from './SearchBar'
import useSWR, { useSWRConfig } from 'swr'
import Image from 'next/image'
import { useToast, Wrap, WrapItem, Button } from '@chakra-ui/react'

function getData(endpoint) {
  const { data, error, isValidating } = useSWR(endpoint, fetcher)
  const data1 = { data: data }
  return data1.data
}

function getRandomID() {
  return Math.floor(Math.random() * (9999999999 - 1111111111 + 1) + 1111111111)
}
const userNavigation = [{ name: 'Sign out', href: '#', signOut: true }]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const fetcher = (url) =>
  fetch(url).then((r) => r.json().then(console.log('fetched data')))

function SideBarHeader() {
  let context = useAppContext()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const Router = useRouter()
  const { data, error, isValidating } = useSWR(
    `api/getTicketsByUserID/${session?.user?.email}`,
    fetcher
  )
  const projects = getData(`/api/getProjectsByUser/${session?.user?.email}`)
  const sidebarNavigation = [
    { name: 'Home', href: '#', icon: HomeIcon, index: 1, visible: true },
    {
      name: 'Role Assignment',
      href: '#',
      icon: UserGroupIcon,
      index: 2,
      visible: context?.role == 'Admin' || context?.role == 'Project Manager',
    },
    {
      name: 'Projects',
      href: '#',
      icon: CollectionIcon,
      index: 3,
      visible: true,
    },
    { name: 'Tickets', href: '#', icon: TicketIcon, index: 4, visible: true },
  ]
  useEffect(() => {
    //once finished loading, if not authenticated then route to login
    if (status != 'loading') {
      if (status != 'authenticated') {
        Router.push('/auth/email-signin')
      }
    }
  }, [status])
  if (typeof window !== 'undefined' && loading) return null
  return (
    <>
      {/* Narrow sidebar */}
      <div className="hidden w-28 overflow-y-auto bg-indigo-700 md:block">
        <div className="flex w-full flex-col items-center py-6">
          <div className="flex flex-shrink-0 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto w-9 opacity-90"
              version="1"
              viewBox="0 0 810 810"
            >
              <defs>
                <clipPath id="id1">
                  <path d="M372 259h403.27v545H372zm0 0"></path>
                </clipPath>
                <clipPath id="id2">
                  <path d="M18.813 137H510v503H18.812zm0 0"></path>
                </clipPath>
              </defs>
              <g clipPath="url(#id1)">
                <path
                  fill="#FFF"
                  d="M388.5 579.543l154.809-320.332c38.171 23.91 65.02 61.871 79.254 106.687l81.128-41.796a22.287 22.287 0 0118.7-.848c5.984 2.394 10.812 7.457 12.886 13.695l39.125 116.625c3.934 11.77-2.43 24.516-14.16 28.469-11.785 3.934-24.562-2.406-28.488-14.164l-30.781-91.785-68.547 35.355c2.781 23.246 2.578 47.5-.887 72.149l49.426-15.266c11.758-3.637 24.273 2.848 28.039 14.566l48.562 150.227c3.844 11.8-2.64 24.492-14.449 28.324a22.323 22.323 0 01-16.726-1.176c-5.332-2.574-9.684-7.242-11.602-13.304l-41.766-129.13-53.308 16.509c-4.461 13.898-9.84 27.78-16.457 41.433a315.988 315.988 0 01-26.715 45.313l57.957 9.465c10.852 1.77 18.824 11.16 18.89 22.195l.239 128.633c0 12.426-10.012 22.5-22.453 22.523a22.153 22.153 0 01-9.817-2.23c-7.527-3.614-12.71-11.317-12.726-20.188l-.176-109.582-65.816-10.762c-35.782 35.516-78.453 59.57-122.07 69.38-82.954-49.087-34.286-146.755-32.071-150.985zm0 0"
                ></path>
              </g>
              <path
                fill="#FFF"
                d="M334.398 648.3c.254 29.66 8.844 60.735 32.387 86.813-22.77-1.277-45.09-6.593-66.187-16.789-21.047-10.172-39.125-24.39-54.254-41.441 34.992 2.203 64.636-10.313 88.054-28.582zm0 0M746.715 164.781c-29.324-4.601-77.485-6.164-106.793 4.36 25.195 36.136 31.293 82.96 11.61 123.648-3.177 6.633-6.993 12.781-11.231 18.508-21.844-41.082-54.653-74.535-97.059-95.043-42.398-20.5-89.004-25.43-134.734-17.035a113.659 113.659 0 017.472-20.309c20.543-42.523 63.832-67.234 110.051-68.023-11.207-28.797-40.597-63.27-61.472-82.512-6.09-5.61-6.485-15.117-.883-21.195 5.629-6.09 15.117-6.496 21.207-.867 7.199 6.601 61.937 58.48 73.492 108.07 9.914 2.281 19.68 5.523 29.219 10.129a137.178 137.178 0 0131.453 21.043c45.832-23.016 122.543-11.965 132.34-10.39 8.187 1.265 13.726 8.944 12.484 17.124-1.316 8.18-8.945 13.766-17.156 12.492zm0 0"
              ></path>
              <g clipPath="url(#id2)">
                <path
                  fill="#FFF"
                  d="M78.95 305.027l147.866-55.27c11.602-4.28 24.446 1.481 28.856 12.946l20.703 53.317c16.816-18.137 35.297-33.73 54.871-46.223l-15.754-80.067-91.027 32.903c-11.653 4.215-24.512-1.828-28.75-13.488-4.238-11.704 1.82-24.598 13.484-28.82l115.703-41.805c6.133-2.239 12.97-1.66 18.688 1.582a22.553 22.553 0 0111.035 15.238l18.258 93.086c45.078-18.04 92.992-21.02 136.648-5.531l-154.57 319.878c-2.215 4.805-48.48 103.625-138.43 69.102-19.238-39.781-26.87-87.512-21.664-137.027l-53.656-48.82-85.957 67.925a22.475 22.475 0 01-23.762 2.563 21.912 21.912 0 01-7.824-6.313c-7.695-9.734-6.059-23.875 3.7-31.578l100.96-79.727c8.629-6.82 20.965-6.41 29.059 1.012l47.543 43.281c4.87-17.011 11.289-33.957 19.336-50.644 5.949-12.363 12.77-23.942 19.988-35.043l-22.45-57.8-127.081 47.491a22.378 22.378 0 01-17.664-.84c-5.028-2.421-9.133-6.707-11.25-12.363-4.383-11.652 1.53-24.62 13.14-28.965zm0 0"
                ></path>
              </g>
            </svg>
          </div>
          <div className="mt-6 w-full flex-1 space-y-1 px-2">
            {sidebarNavigation.map((item) => (
              <Link key={getRandomID()} href={item.href}>
                <a
                  onClick={() => {
                    context.setShowTicket(false)
                    context.setShowProject(false)
                    context.setSearchBarSelectedProject(null)
                    context.setTab(item.index)
                    context.setShowEditProject(false)
                  }}
                  key={item.name}
                  className={classNames(
                    context.tab == item.index
                      ? 'bg-indigo-800 text-white'
                      : 'text-indigo-100 hover:bg-indigo-800 hover:text-white',
                    'group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium',
                    `${item.visible ? '' : 'hidden'}`
                  )}
                  aria-current={context.tab == item.index ? 'page' : undefined}
                >
                  <item.icon
                    className={classNames(
                      context.tab == item.index
                        ? 'text-white'
                        : 'text-indigo-300 group-hover:text-white',
                      'h-6 w-6'
                    )}
                    aria-hidden="true"
                  />
                  <span className="mt-2 text-center">{item.name}</span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="md:hidden" onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700 pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-1 right-0 -mr-14 p-1">
                    <button
                      type="button"
                      className="flex h-12 w-12 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Close sidebar</span>
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto w-9 opacity-90 "
                    version="1"
                    viewBox="0 0 810 810"
                  >
                    <defs>
                      <clipPath id="id1">
                        <path d="M372 259h403.27v545H372zm0 0"></path>
                      </clipPath>
                      <clipPath id="id2">
                        <path d="M18.813 137H510v503H18.812zm0 0"></path>
                      </clipPath>
                    </defs>
                    <g clipPath="url(#id1)">
                      <path
                        fill="#FFF"
                        d="M388.5 579.543l154.809-320.332c38.171 23.91 65.02 61.871 79.254 106.687l81.128-41.796a22.287 22.287 0 0118.7-.848c5.984 2.394 10.812 7.457 12.886 13.695l39.125 116.625c3.934 11.77-2.43 24.516-14.16 28.469-11.785 3.934-24.562-2.406-28.488-14.164l-30.781-91.785-68.547 35.355c2.781 23.246 2.578 47.5-.887 72.149l49.426-15.266c11.758-3.637 24.273 2.848 28.039 14.566l48.562 150.227c3.844 11.8-2.64 24.492-14.449 28.324a22.323 22.323 0 01-16.726-1.176c-5.332-2.574-9.684-7.242-11.602-13.304l-41.766-129.13-53.308 16.509c-4.461 13.898-9.84 27.78-16.457 41.433a315.988 315.988 0 01-26.715 45.313l57.957 9.465c10.852 1.77 18.824 11.16 18.89 22.195l.239 128.633c0 12.426-10.012 22.5-22.453 22.523a22.153 22.153 0 01-9.817-2.23c-7.527-3.614-12.71-11.317-12.726-20.188l-.176-109.582-65.816-10.762c-35.782 35.516-78.453 59.57-122.07 69.38-82.954-49.087-34.286-146.755-32.071-150.985zm0 0"
                      ></path>
                    </g>
                    <path
                      fill="#FFF"
                      d="M334.398 648.3c.254 29.66 8.844 60.735 32.387 86.813-22.77-1.277-45.09-6.593-66.187-16.789-21.047-10.172-39.125-24.39-54.254-41.441 34.992 2.203 64.636-10.313 88.054-28.582zm0 0M746.715 164.781c-29.324-4.601-77.485-6.164-106.793 4.36 25.195 36.136 31.293 82.96 11.61 123.648-3.177 6.633-6.993 12.781-11.231 18.508-21.844-41.082-54.653-74.535-97.059-95.043-42.398-20.5-89.004-25.43-134.734-17.035a113.659 113.659 0 017.472-20.309c20.543-42.523 63.832-67.234 110.051-68.023-11.207-28.797-40.597-63.27-61.472-82.512-6.09-5.61-6.485-15.117-.883-21.195 5.629-6.09 15.117-6.496 21.207-.867 7.199 6.601 61.937 58.48 73.492 108.07 9.914 2.281 19.68 5.523 29.219 10.129a137.178 137.178 0 0131.453 21.043c45.832-23.016 122.543-11.965 132.34-10.39 8.187 1.265 13.726 8.944 12.484 17.124-1.316 8.18-8.945 13.766-17.156 12.492zm0 0"
                    ></path>
                    <g clipPath="url(#id2)">
                      <path
                        fill="#FFF"
                        d="M78.95 305.027l147.866-55.27c11.602-4.28 24.446 1.481 28.856 12.946l20.703 53.317c16.816-18.137 35.297-33.73 54.871-46.223l-15.754-80.067-91.027 32.903c-11.653 4.215-24.512-1.828-28.75-13.488-4.238-11.704 1.82-24.598 13.484-28.82l115.703-41.805c6.133-2.239 12.97-1.66 18.688 1.582a22.553 22.553 0 0111.035 15.238l18.258 93.086c45.078-18.04 92.992-21.02 136.648-5.531l-154.57 319.878c-2.215 4.805-48.48 103.625-138.43 69.102-19.238-39.781-26.87-87.512-21.664-137.027l-53.656-48.82-85.957 67.925a22.475 22.475 0 01-23.762 2.563 21.912 21.912 0 01-7.824-6.313c-7.695-9.734-6.059-23.875 3.7-31.578l100.96-79.727c8.629-6.82 20.965-6.41 29.059 1.012l47.543 43.281c4.87-17.011 11.289-33.957 19.336-50.644 5.949-12.363 12.77-23.942 19.988-35.043l-22.45-57.8-127.081 47.491a22.378 22.378 0 01-17.664-.84c-5.028-2.421-9.133-6.707-11.25-12.363-4.383-11.652 1.53-24.62 13.14-28.965zm0 0"
                      ></path>
                    </g>
                  </svg>
                </div>
                <div className="mt-5 h-0 flex-1 overflow-y-auto px-2">
                  <nav className="flex h-full flex-col">
                    <div className="space-y-1">
                      {sidebarNavigation.map((item) => (
                        <Link href={item.href} key={getRandomID()}>
                          <a
                            onClick={() => {
                              context.setShowTicket(false)
                              context.setShowProject(false)
                              context.setSearchBarSelectedProject(null)
                              context.setShowEditProject(false)

                              setMobileMenuOpen(false)
                              context.setTab(item.index)
                            }}
                            key={item.name}
                            className={classNames(
                              context.tab == item.index
                                ? 'bg-indigo-800 text-white'
                                : 'text-indigo-100 hover:bg-indigo-800 hover:text-white',
                              'group flex items-center rounded-md py-2 px-3 text-sm font-medium',
                              `${item.visible ? '' : 'hidden'}`
                            )}
                            aria-current={
                              context.tab == item.index ? 'page' : undefined
                            }
                          >
                            <item.icon
                              className={classNames(
                                context.tab == item.index
                                  ? 'text-white'
                                  : 'text-indigo-300 group-hover:text-white',
                                'mr-3 h-6 w-6'
                              )}
                              aria-hidden="true"
                            />
                            <span>{item.name}</span>
                          </a>
                        </Link>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/* Content area */}
      <div className=" flex flex-1 flex-col overflow-hidden">
        <header className="w-full">
          <div className="relative z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white shadow-sm">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-between px-4 sm:px-6">
              <div className="invisible mt-1 md:visible md:w-full md:pt-3">
                {
                  <SearchBar
                    setSearchBarSelectedProject={
                      context.setSearchBarSelectedProject
                    }
                    data={data?.ProjectsForUser}
                  />
                }
              </div>
              <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                {/* Profile dropdown */}
                <Menu as="div" className="relative flex-shrink-0">
                  <div>
                    <Menu.Button
                      className={`${
                        session?.user?.image ? null : 'w-10'
                      }  flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                    >
                      <span className="sr-only">Open user menu</span>
                      {session?.user?.image ? (
                        <div className="relative h-8 w-8 rounded-full object-cover">
                          <Image
                            className="rounded-full"
                            src={session?.user?.image}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      ) : (
                        // If image, use here
                        // <img
                        // className="h-8 w-8 rounded-full"
                        // src={session?.user?.image  }
                        // alt=""
                        // />
                        // if no image, use first letter of name
                        <span className="mx-auto text-2xl font-bold text-black">
                          {session?.user?.name
                            ? session.user.name[0].toLocaleUpperCase()
                            : session?.user?.email
                            ? session.user.email[0].toLocaleUpperCase()
                            : 'N'}
                        </span>
                      )}
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
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              onClick={() => item?.signOut && signOut()}
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
                <NewBtnDropDown context={context} projects={projects} />
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="flex flex-1 items-stretch overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            {/* Primary column */}
            <section
              aria-labelledby="primary-heading"
              className="flex h-full min-w-0 flex-1 flex-col lg:order-last"
            >
              {/* Your content */}
              {context.tab == 1 ? (
                <>
                  <div className="px-5 py-5">
                    <Home session={session} />
                  </div>
                </>
              ) : context.tab == 2 ? (
                <>
                  <div className="px-5 py-5">
                    <RoleAssignment session={session} />
                  </div>
                </>
              ) : context.tab == 4 ? (
                <>
                  <div className="px-5 py-5">
                    <AllTickets session={session} />
                  </div>
                </>
              ) : // New Project = -1
              context.tab == -1 ? (
                <>
                  <div className="px-5 py-5">
                    <NewProject session={session} />
                  </div>
                </>
              ) : // New Ticket = -2
              context.tab == -2 ? (
                <>
                  <div className={`px-5 py-5`}>
                    <NewTicket session={session} />
                  </div>
                </>
              ) : context.tab == 3 ? (
                <>
                  <div className="px-5 py-5">
                    <AllProjectsGrid session={session} />
                  </div>
                </>
              ) : null}
            </section>
          </main>
        </div>
      </div>
    </>
  )
}

export default SideBarHeader
