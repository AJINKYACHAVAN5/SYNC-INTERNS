import { useState, useEffect } from 'react'
import moment from 'moment'

function getNameFromEmail(str){
    if (str){
      let indexOfAt = str.indexOf("@")
      return str.substring(0, indexOfAt)
    }
  }

  function getRandomID() {
    return Math.floor(Math.random() * (9999999999 - 1111111111 + 1) + 1111111111)
}

export default function CommmentPostBox({project, ticket, session, mutateNewComment, setMutateNewComment}) {
const [comment, setComment] = useState({
    value: '',
    Owner: session.user,
    CreatedAt: moment(),
    CommentID: getRandomID(),
})
const [buttonMessage, setButtonMessage] = useState("Post")
const [loading, setLoading] = useState(false)

useEffect(() => {
    async function sleep(){
        setTimeout(() => {
            setButtonMessage("Post")
            
        }, 5000);
    }
if (buttonMessage != "Post") {
  setMutateNewComment(!mutateNewComment)
    sleep()
}
}, [buttonMessage])

async function handleSubmit(){
    if (comment.value?.length > 0){
        const newComment = await fetch ('/api/newComment', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Comment:comment, 
                ProjectID:project.My_ID, 
                TicketID:ticket.TicketID,
            })
        }) 
        if (newComment.ok) {
            setButtonMessage("Posted")
        } else {
            setButtonMessage(newComment.statusText)

        }
        setLoading(false) //for button loader icon
        setComment({
            ...comment, value: ''
        })
    }
}

    return (
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Add your comment
        </label>
        <div className="mt-1">
          <textarea
            value={comment.value}
            onChange={(e) => setComment({...comment, value: e.target.value})}
            rows={3}
            name="comment"
            id="comment"
            className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            defaultValue={''}
          />
        </div>
        <div className="pt-2 w-full flex-shrink-0 flex justify-end">
              <button
               onClick={()=> handleSubmit()}
                className=" inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-Verdigris hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-Verdigris"
              >
                 {
                    !loading ? 
                    buttonMessage
                    :
                    <svg
  className="prefix__animate-spin prefix__mx-auto prefix__h-5 prefix__w-5 prefix__text-white"
  fill="none"
  viewBox="0 0 24 24"
  {...props}
>
  <circle
    className="prefix__opacity-25"
    cx={12}
    cy={12}
    r={10}
    stroke="purple"
  />
  <path
    className="prefix__opacity-75"
    fill="currentColor"
    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  />
</svg>

                }
              </button>
        </div>
      </div>
    )
  }
  