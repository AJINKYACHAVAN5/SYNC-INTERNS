import React from 'react'
import LoginLogo from '../../components/LoginLogo'
import EmailLottie from '../../components/EmailLottie'

function verifyrequest() {
  return (
    <>
        <div className="h-screen bg-Timberwolf">
            <div className="h-full">
                <div className="min-h-screen flex flex-col py-auto pb-12 sm:px-6 lg:px-8">
                <div className="mx-auto sm:mx-auto sm:w-full sm:max-w-md 0">
                    <div className=" flex items-center mx-auto ">
                      <EmailLottie />
                    </div>
                    <h2 className="-mt-16 text-center text-3xl font-extrabold text-gray-900">Check Your Email</h2>
                </div>
                <div className=" mt-8 sm:mx-auto sm:w-5/6 sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="w-56 m-auto pb-2">
            <LoginLogo />
          </div>
                    <div className="mt-6">
                        <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                        </div>
                        <div className="relative flex justify-center text-sm">
                        <span className='text-FuzzyWuzzy text-xl text-center'>
                        A sign in link has been sent to your email address.
                        </span>
                        </div>
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-3">      
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

export default verifyrequest