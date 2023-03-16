import { useSession, signIn, signOut, getCsrfToken } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useAppContext } from '../../context/contextState'
import BugSearchLogo from '../../components/BugSearchLogo'
import LoginLogo from '../../components/LoginLogo'
import { Tooltip } from '@chakra-ui/react'

export default function SignIn({ csrfToken }) {
  const [guestMode, setGuestMode] = useState(false)
  let context = useAppContext()

  return (
    <>
      <div className="h-screen bg-Timberwolf">
        <div className="h-full">
          <div className="py-auto flex min-h-screen flex-col py-12 sm:px-6 lg:px-8">
            <div className="0 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="mx-auto flex w-1/3 items-center md:w-1/2">
                <BugSearchLogo />
              </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <div className=" mt-8 sm:mx-auto sm:w-5/6 sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <div className="m-auto w-56 pb-2">
                  <LoginLogo />
                </div>
                <form
                  className="mt-3"
                  method="post"
                  action="/api/auth/signin/email"
                >
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                  />
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-400 shadow-sm focus:border-FuzzyWuzzy focus:outline-none focus:ring-FuzzyWuzzy sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="mt-3 flex w-full justify-center rounded-md border border-transparent bg-Verdigris py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-Verdigris hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-Verdigris focus:ring-offset-2"
                    >
                      Sign in with Email
                    </button>
                  </div>
                </form>

                <div className="mt-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-2 text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 grid grid-cols-1 gap-3">
                    {guestMode ? (
                      <>
                        <div className="-my-3 flex pt-3 hover:cursor-pointer">
                          <Tooltip
                            label="Create & Edit Tickets"
                            placement="top-start"
                          >
                            <a
                              onClick={() =>
                                signIn('credentials', {
                                  username: 'developer',
                                  password: '',
                                })
                              }
                              className="mr-1 inline-flex w-full justify-center rounded-md border border-gray-300 bg-FrenchViolet bg-opacity-80 py-1.5 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-opacity-90 "
                            >
                              <span className="px-2.5 text-white">
                                Developer
                              </span>
                            </a>
                          </Tooltip>

                          <Tooltip label="All Permissions" placement="top-end">
                            <a
                              onClick={() =>
                                signIn('credentials', {
                                  username: 'admin',
                                  password: '',
                                })
                              }
                              className="ml-1 inline-flex w-full justify-center rounded-md border border-gray-300 bg-Verdigris bg-opacity-80 py-1.5 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-opacity-90"
                            >
                              <span className="px-6 text-white">Admin</span>
                            </a>
                          </Tooltip>
                        </div>

                        <div className="flex hover:cursor-pointer ">
                          <Tooltip
                            label="Create Tickets"
                            placement="bottom-start"
                          >
                            <a
                              onClick={() =>
                                signIn('credentials', {
                                  username: 'user',
                                  password: '',
                                })
                              }
                              className="mr-1 mt-1 inline-flex w-full justify-center rounded-md border border-gray-300 bg-Tan bg-opacity-80 py-1.5 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-opacity-90"
                            >
                              <span className="px-6 text-white">User</span>
                            </a>
                          </Tooltip>

                          <Tooltip
                            label="Create Tickets, Edit Tickets, Create Projects, Edit Projects, and Assign Roles"
                            placement="bottom-end"
                          >
                            <a
                              onClick={() =>
                                signIn('credentials', {
                                  username: 'manager',
                                  password: '',
                                })
                              }
                              className="ml-1 mt-1 inline-flex w-full justify-center rounded-md border border-gray-300 bg-FuzzyWuzzy bg-opacity-80 py-1.5 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-opacity-90"
                            >
                              <span className="px-6 text-white">Manager</span>
                            </a>
                          </Tooltip>
                        </div>
                      </>
                    ) : (
                      <div>
                        <a
                          onClick={() => {
                            setGuestMode(true)
                          }}
                          className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-Tan py-1.5 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-opacity-90"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="white"
                            strokeWidth="1.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="px-6 pt-px text-white">
                            Sign in as a Guest
                          </span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context)
  return {
    props: { csrfToken },
  }
}
