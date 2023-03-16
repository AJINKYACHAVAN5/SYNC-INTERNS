import React from 'react'
import SideBarHeader from '../components/SideBarHeader'
import Head from 'next/head'

function dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Bug_Trackr Dashboard" />
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <div className="absolute inset-0">
        <div className="absolute inset-0 h-screen bg-gray-50">
          <body className="absolute inset-0 h-screen overflow-hidden">
            <div className="absolute inset-0 flex max-h-screen">
              <SideBarHeader />
            </div>
          </body>
        </div>
      </div>
    </>
  )
}

export default dashboard
