import { useAuth } from '@/tanstack/authContext';
import React, { use } from 'react'
import { Navigate, Outlet } from 'react-router'

const Auth = () => {

    const {isAuthenticated, isLoading } = useAuth();

    if(isLoading) {
        return <div className='flex items-center justify-center h-screen w-full'>Loading...</div>
    }
    if(isAuthenticated) {
        return <Navigate to='/dashboard' />
    }
   
   
  // This component serves as a layout for authentication-related routes

  return (
    <div className='flex flex-col items-center justify-center h-screen w-full'>
        <Outlet />
        {/* This is the main auth layout. It will render the nested routes like Login, Register, etc.*/}
    </div>
  )
}

export default Auth