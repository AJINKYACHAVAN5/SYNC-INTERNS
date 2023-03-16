import { createContext, useContext } from 'react'
import { useState, useEffect, useRef } from 'react'
const AppContext = createContext()
import useSWR, { useSWRConfig } from 'swr'
import { useSession, signIn, signOut } from 'next-auth/react'

export function AppWrapper({ children }) {
  const { data: session, status } = useSession()
  const [role, setRole] = useState(null)
  const [tab, setTab] = useState(1)
  const [searchBarSelectedProject, setSearchBarSelectedProject] = useState(null)
  const [showProject, setShowProject] = useState(false)
  const [showTicket, setShowTicket] = useState(false)
  const [showEditProject, setShowEditProject] = useState(false)

  useEffect(() => {
    if (session) {
      getRole(session)
    }
  }, [session])

  async function getRole(session) {
    let getRole = await fetch(`/api/getRole/${session.user.email}`, {
      method: 'GET',
    })
    if (getRole) {
      let { role } = await getRole.json()
      if (role) {
        setRole(role)
      }
    }
  }

  let sharedState = {
    tab,
    setTab,
    searchBarSelectedProject,
    setSearchBarSelectedProject,
    showProject,
    setShowProject,
    showTicket,
    setShowTicket,
    showEditProject,
    setShowEditProject,
    role,
  }

  return (
    <AppContext.Provider
      value={sharedState}
      setTab={setTab}
      setSearchBarSelectedProject={setSearchBarSelectedProject}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
