
import { SearchIcon } from '@heroicons/react/solid'
import { useEffect } from 'react'

export default function AlphaUsersSearch({searchBar , setSearchBar, filterUsers, removeFilter }) {
    useEffect(() => { //Search once user stops typing for 500 ms
        if (searchBar?.length > 1){
            const timeoutId = setTimeout(() =>  filterUsers(searchBar), 100);
            return () => clearTimeout(timeoutId);
        }
        if (searchBar == ''){
            const timeoutId = setTimeout(() =>  removeFilter(), 500);
            return () => clearTimeout(timeoutId);
        }
      }, [searchBar]);
  

  return (
    <div className=''>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
            onChange={(e) => setSearchBar(e.target.value)}
            // type="search"
            value={searchBar}
            name="search"
            id="search"
            className="bg-white text-black focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 md:text-sm border-gray-300 rounded-md text-sm"
            placeholder="Search Users"
        />
      </div>
    </div>
  )
}
