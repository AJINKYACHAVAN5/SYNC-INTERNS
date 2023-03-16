import {useState} from 'react'

const notificationMethods = [
    { id: 'Open', title: 'Open' },
    { id: 'In Progress', title: 'In Progress' },
    { id: 'Resolved', title: 'Resolved' },
    { id: 'Additional Info Required', title: 'Additional Info Required' },
  ]
  
  export default function TicketStatusRadio({ticket, setEditedValues, editedValues}) {
      const [checkValues, setCheckValues] = useState(ticket.Status)
    return (
      <div>
        <label className="text-sm text-gray-800">{'Status'}</label>
        <fieldset className="mt-0">
          <legend className="sr-only">Notification method</legend>
          <div className="">
            {notificationMethods.map((notificationMethod) => (
              <div key={notificationMethod.id} className="flex items-center">
                <input
                onClick={(e) => {
                    setCheckValues(e.target.id)
                    setEditedValues({...editedValues, Status: e.target.id})
                      
                }}
                checked={checkValues == notificationMethod.id}
                  id={notificationMethod.id}
                  name="notification-method"
                  type="radio"
                  defaultChecked={notificationMethod.id === 'email'}
                  className="m-1 focus:ring-FuzzyWuzzy h-4 w-4 text-FuzzyWuzzy border-gray-300"
                />
                <label htmlFor={notificationMethod.id} className="ml-3 block text-sm font-medium text-gray-700">
                  {notificationMethod.title}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
    )
  }
  