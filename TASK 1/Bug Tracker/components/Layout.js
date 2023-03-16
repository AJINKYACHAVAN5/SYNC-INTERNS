// components/Layout.js
import React, { Component } from 'react';
import Context from '../components/Context'

function Layout({ children }) {
  return (
    <>
     <div className="h-screen max-w-7xl mx-auto px-7 sm:px-20 lg:px-8">
        <div className="max-w-3xl mx-auto ">
          <Context />
              { children }
        </div>
      </div>
    </>
  )
}
export default Layout;

