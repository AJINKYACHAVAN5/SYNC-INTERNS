/* This example requires Tailwind CSS v2.0+ */
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/solid'

const pages = [
  { name: 'Projects', href: '#', current: false },
]

export default function BreadCrumb({pages, current}) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <a href="#" className=" text-sm font-medium text-gray-500 hover:text-gray-700">
              Projects
            </a>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.Title}>
            <div className="flex items-center">
              <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
              <a
               
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={current ? 'page' : undefined}
              >
                {page.Title}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
