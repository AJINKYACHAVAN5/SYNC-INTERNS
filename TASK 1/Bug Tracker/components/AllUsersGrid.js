/* This example requires Tailwind CSS v2.0+ */
import { CalendarIcon, UsersIcon, MailIcon } from '@heroicons/react/solid'

function getRandomID() {
  return Math.floor(Math.random() * (9999999999 - 1111111111 + 1) + 1111111111)
}

function getNameFromEmail(str){
  if (str){
    let indexOfAt = str.indexOf("@")
    return str.substring(0, indexOfAt)
  }
}

const users = [
  {
    id: 1,
    title: 'Back End Developer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Engineering',
    closeDate: '2020-01-07',
    closeDateFull: 'January 7, 2020',
  },
  {
    id: 2,
    title: 'Front End Developer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Engineering',
    closeDate: '2020-01-07',
    closeDateFull: 'January 7, 2020',
  },
  {
    id: 3,
    title: 'User Interface Designer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Design',
    closeDate: '2020-01-14',
    closeDateFull: 'January 14, 2020',
  },
]

export default function AllUsersGrid({users}) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {users.map((user) => (
          <li key={getRandomID()}>
            <span className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">{user.name ? user.name : getNameFromEmail(user.email)}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <MailIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      {user.email}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    {
                      user?.role ? 
                      <>
                      <UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <p>
                          {user.role}
                          </p>
                      </>
                      :
                      null
                    }
                  </div>
                </div>
              </div>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
