import React from 'react'
import { Outlet } from 'react-router'
const Auth = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-full'>
        <Outlet />
        {/* This is the main auth layout. It will render the nested routes like Login, Register, etc.*/}
    </div>
  )
}

export default Auth