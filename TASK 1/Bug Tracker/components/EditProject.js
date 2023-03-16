import useSWR, { useSWRConfig } from 'swr'
import { useState, useEffect } from 'react'
import AllUsersAlpha from './AllUsersAlpha'
import AlphaUsersSearch from './AlphaUsersSearch'
import NewProjectSubmitButtons from './NewProjectSubmitButtons'
import NewProjectSkeleton from './NewProjectSkeleton'
import { useAppContext } from '../context/contextState'

function getRandomID() {
    return Math.floor(Math.random() * (9999999999 - 1111111111 + 1) + 1111111111)
}

function getNameFromEmail(str){
    if (str){
      let indexOfAt = str.indexOf("@")
      return str.substring(0, indexOfAt)
    }
  }

const fetcher = url => fetch(url).then(r => r.json().then(console.log("fetched data")))

function createAlphaObject(data){
    let alphaObject = { //returns this format of data
        // A: [{user object with name starting with a}, {another user object with name starting with a}], 
        // B: [{etc}, {etc}],
    }
    let firstLetterArray = [] //first letters used in alpha categorize list
    // Create list of first letters in user names 
    data.forEach(user => {
       // if non email user, use name field for name:
        if (user?.name) {
            if (!firstLetterArray.includes(user.name[0])) { //if 1st first letter, add letter and user
                firstLetterArray.push(user.name[0])
                alphaObject[user.name[0].toUpperCase()] = [user]
            } else { //if not 1st first letter, add user but not letter 
                alphaObject[user.name[0]].push(user)
            }
        } else { // if email user, treat email as name:
            if (!firstLetterArray.includes(user.email[0])) {
                firstLetterArray.push(user.email[0])
                alphaObject[user.email[0].toUpperCase()] = [user]
            } else { //if not 1st first letter, add user but not letter 
                alphaObject[user.email[0]].push(user)
            }
        }
    })

    // now sort a-z
    let sortedAlphaObject = {};
    Object.keys(alphaObject).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
    }).forEach(function(key) {
        sortedAlphaObject[key] = alphaObject[key];
    });
    return sortedAlphaObject
}   

export default function EditProject({session, existingProject, setShowEditProject, setShowProject, mutateProject, setMutateProject, mutate}) {
    let context = useAppContext()
    const { data, error, isValidating } = useSWR('/api/getUsers', fetcher)
    const [alphaUsers, setAlphaUsers] = useState(data ? createAlphaObject(data) : null)
    const [alphaUsersFiltered, setAlphaUsersFiltered] = useState(alphaUsers)
    const [searchBar, setSearchBar] = useState(null)
    const [selectedUserID, setSelectedUserID] = useState([])
    const [project, setProject] = useState({
        My_ID: existingProject.My_ID,
        Title: existingProject.Title,
        Description: existingProject.Description,
        // Members: [],
        // Tickets: []
    })
    const [buttonMessage, setButtonMessage] = useState("Submit")
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState([])
    const [visibleErrorString, setVisibleErrorString] = useState(null)

    useEffect(() => {
      const selectedUserIDs = []
      if (existingProject?.Members) {
        existingProject?.Members.forEach(member => {
            selectedUserIDs.push(member._id)
          })
      }
      setSelectedUserID(selectedUserIDs)
    }, [])

    useEffect(() => {
        async function sleep(){
            setTimeout(() => {
                setButtonMessage("Submit")
            }, 5000);
        }
    if (buttonMessage != "Submit") {
        sleep()
    }
    }, [buttonMessage])

    function handleInputErrors() {
        // input error control
        setVisibleErrorString(null)
        let errorMsgArray = []
        for (const [key, value] of Object.entries(project)) {
            if (value.length < 1 && key != "Tickets" && key != "Members") {
                setVisibleErrorString(`${key} is required`)
                errorMsgArray.push(key)
            }
            if (selectedUserID.length < 1 && key != "Tickets" ) {
                setVisibleErrorString(`Select at least 1 member`)
                errorMsgArray.push(key)
            }
        }
        return errorMsgArray
    }

    async function handleSubmit(){
        let errorsArray = handleInputErrors()
        if (errorsArray.length == 0) {
            setLoading(true) //for button loader icon
            // take list of selected user IDs, and add the full user object to project.members
            let selectedUserObjects = []
            selectedUserID.forEach(userID => {
                data.forEach(user => {
                    if (userID == user._id) {
                        selectedUserObjects.push(user)
                        // setProject({...project, Members: [...project.Members, user]})
                    }
                })
            })
            const newPost = await fetch ('/api/editProject', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({...project, Members: selectedUserObjects})
            }) 
            if (newPost.ok) {
                setButtonMessage("Added")
                mutate(`/api/getProjectsByUser/${session?.user?.email}`)
                // setMutateProject(!mutateProject)
                // go back  to projects main page:
                    context.setShowTicket(false)
                    context.setShowProject(false)
                    context.setSearchBarSelectedProject(null)
                    context.setTab(3)
                    context.setShowEditProject(false)
            } else {
                setButtonMessage(newPost.statusText)
            }
            setLoading(false) //for button loader icon
            // clear form values
            setProject({
                Title: '',
                Description: '',
                // Members: [],
                Tickets: []
            })
            setSelectedUserID([]) //clear selected users 
        }   
    }

    useEffect(() => {
      if (data) {
          let createdAlphaObj = createAlphaObject(data)
            setAlphaUsers(createdAlphaObj)
            setAlphaUsersFiltered(createdAlphaObj)
      }
    }, [data])

    function filterUsers(filterTerm) {
        let filteredAlpha = []
        data.map(user => {
            let name = user?.name ? user.name : getNameFromEmail(user.email)
            if (name.toLowerCase().includes(filterTerm.toLowerCase())) {
                filteredAlpha.push(user)
            }
        })
        setAlphaUsersFiltered(createAlphaObject(filteredAlpha))
    }
    function removeFilter(){
        setAlphaUsersFiltered(alphaUsers)
    }
    
    if (error) return <>error</>
    if (!data) return <NewProjectSkeleton/>
    if (data) return (
        <div className='grid gap-8 grid-cols-1 md:grid-cols-2'>
            <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Project</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 pb-4">
                    Use this form to edit an existing project.
                </p>

                <div className="sm:grid sm:grid-cols-1 sm:gap-4 sm:items-start sm:pt-5">
                    <div className="mt-1 sm:mt-0 sm:col-span-2 text-black">
                    <input
                        type="text"
                        value={project.Title}
                        onChange={(e) => setProject({...project, Title: e.target.value})}
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:w-full s sm:text-sm border-gray-300 rounded-md"
                        placeholder='Title'
                    />
                </div>

                <div className="pt-2 mt-1 sm:mt-0 sm:col-span-2">
                    <textarea
                        value={project.Description}
                        onChange={(e) => setProject({...project, Description: e.target.value})}
                        id="description"
                        name="description"
                        rows={3}
                        className="p-2 w-full shadow-sm block text-black focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                        defaultValue={''}
                        placeholder='Description'
                    />
                </div>    
                </div>    
                <div className='hidden md:block'>
                        <NewProjectSubmitButtons
                        mutateProject={mutateProject}
                        setMutateProject={setMutateProject}
                        setShowEditProject={setShowEditProject} 
                        setShowProject={setShowProject}
                        buttonMessage={buttonMessage} 
                        loading={loading} 
                        visibleErrorString={visibleErrorString} 
                        handleSubmit={handleSubmit}
                        />
                </div>
            </div>
             <div className="space-y-6 sm:space-y-5 ">
                <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Project Members</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 pb-4">
                        Select project members.
                    </p>
                </div>
                {
                    alphaUsersFiltered !== null ?
                    <>
                        <AlphaUsersSearch users={alphaUsers} filterUsers={filterUsers} searchBar={searchBar} setSearchBar={setSearchBar} removeFilter={removeFilter}/>
                        <AllUsersAlpha users={alphaUsersFiltered} selectedUserID={selectedUserID} setSelectedUserID={setSelectedUserID}/>
                    </>
                    : null
                }
             </div>
             <div className='pb-36 block md:hidden md:pb-0'>
                    <NewProjectSubmitButtons 
                        setShowProject={setShowProject}
                        setShowEditProject={setShowEditProject}
                        buttonMessage={buttonMessage} 
                        loading={loading} 
                        visibleErrorString={visibleErrorString} 
                        handleSubmit={handleSubmit}
                    />
            </div>
        </div>
    )
  }
  