import React, { useState, useEffect } from 'react'

function ImageUploader({project, ticket, mutateImage, setMutateImage}) {
    const [image, setImage ] = useState("")
    const [ url, setUrl ] = useState("")
    const [ description, setDescription ] = useState("")
    const [buttonMessage, setButtonMessage] = useState("Upload")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function sleep(){
            setTimeout(() => {
                setButtonMessage("Upload")
            }, 5000);
        }
    if (buttonMessage != "Upload") {
        sleep()   
    }
    }, [buttonMessage])

    async function saveImageInMongo(imageURL){
        const saveImage = await fetch ('/api/newImage', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Image:imageURL, 
                ProjectID:project.My_ID, 
                TicketID:ticket.TicketID,
                ImageTitle: image.name,
                Description: description
            })
        }) 
        if (saveImage.ok) {
            setButtonMessage("Posted")
        } else {
            setButtonMessage(saveImage.statusText)
        }
        setLoading(false) //for button loader icon
        setImage('')
        setUrl('')
        setMutateImage(!mutateImage)
        setDescription('')
    }

   async function uploadImage() {
        setLoading(true)
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "my_uploads")
        data.append("cloud_name","dl6yengpi")
        const upload = await fetch("  https://api.cloudinary.com/v1_1/dl6yengpi/image/upload",{
        method:"post",
        body: data
        })
        const res = await upload.json()
        setUrl(res.url)
       
        if (res) {
            const save = saveImageInMongo(res.url)
        }
        }
  return (
    <>
    <div>
      <h3 className="bg-transparent text-lg leading-6 font-medium text-gray-900">Upload an Image</h3>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex justify-center text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 "
                  >
                  <span>{!image ? "Upload an Image" : image.name}</span>
                  <input 
                    onChange= {(e)=> setImage(e.target.files[0])}
                  id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                </div>
                    {!image ? 
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                         :
                      <>
                        <div className="mt-1">
                            <input
                            type="Description"
                            onChange={(e)=> setDescription(e.target.value)}
                            value={description}
                            name="Description"
                            id="Description"
                            className=" py-2 px-2 bg-transparent shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Image Description..."
                            />
                        </div>
                        <button
                          onClick={() => {
                          uploadImage()}}
                          type="button"
                          className=" bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >   
                              {
                              !loading ? 
                              buttonMessage
                              :
                            <svg class="animate-spin mx-auto h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="purple" strokeWidth="4"></circle>
                              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          }
                        </button>
                    </>
                  }   
              </div>
          </div>
      </div>
    </>
  )
}

export default ImageUploader

