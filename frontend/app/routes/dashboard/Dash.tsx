import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/Sidebar';
import Loader from '@/components/Loader';
import type { Workspace } from '@/schema';
import { useAuth } from '@/tanstack/authContext';
import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router';

const Dash = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const [ isCreatingWorkspace, setIsCreatingWorkspace ] = useState(false);
    const [ currentWorkspace, setCurrentWorkspace ] = useState<Workspace | null>(null);
    

    if (isLoading) {
        return <Loader/>
    }
    if (!isAuthenticated) {
        return <Navigate to='/login' />
    }

    const handleWorkspaceSelected = (workspace: Workspace) => {
        setCurrentWorkspace(workspace);
    }



    return (
        <div className='flex h-screen w-full'>
            <Sidebar currentWorkspace={currentWorkspace}/>
            <div className='flex flex-1 flex-col h-full'>
                <Header
                    onWorkspaceSelected={handleWorkspaceSelected}
                    selectedWorkspace={null}
                    onCreateWorkspace={()=> setIsCreatingWorkspace(true)}
                />
                <main className='flex-1 overflow-y-auto h-full w-full'>
                    <div className='mx-auto container px-2 sm:px-6 lg:px-8 py-0 md:py-8 w-full h-full'>
                        <Outlet />
                    </div>
                    
                </main>
            </div>
        </div>
    )
}

export default Dash