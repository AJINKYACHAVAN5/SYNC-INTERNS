import React from 'react'
import { SearchIcon } from '@heroicons/react/solid'
import {useState} from 'react'
import { useAppContext } from '../context/contextState'

function SearchBar({data, setSearchBarSelectedProject}) {
    let context = useAppContext()
    const [query, setQuery] = useState('')
    const filteredItems =
    query === ''
      ? []
      : data.filter((item) => {
          return item.Title.toLowerCase().includes(query.toLowerCase())
        })

  return (
      <>
       <div className="relative w-full text-gray-400 focus-within:text-gray-600">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                <SearchIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
            </div>
            <input
            onChange={(e)=> setQuery(e.target.value)}
            value={query}
                name="search-field"
                id="search-field"
                className="z-50 bg-white text-sm h-full w-full border-transparent py-2 pl-8 pr-3  text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400"
                placeholder="Search Projects..."
                // type="search"
            />
        </div>
        {
            filteredItems.length > 0 &&  (
                <div className='h-auto bg-white p-8 rounded-md shadow-md'>
                    {filteredItems.map(item =>{ 
                        return (
                            <div 
                            onClick={()=> {
                                setQuery('')
                                context.setTab(3)
                                context.setShowProject(true)
                                context.setSearchBarSelectedProject(item)
                            }} 
                            className='p-2 rounded-md text-black hover:bg-gray-100'>
                                {item.Title}
                            </div>
                        )
                    })}
                </div>
            )
        }
      </>
  )
}

export default SearchBar