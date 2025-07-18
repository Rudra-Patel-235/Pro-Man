import type { Workspace } from "@/schema"
import { useAuth } from "@/tanstack/authContext";
import { Button } from "../ui/button";
import { Bell, PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link, useLoaderData } from "react-router";
import { WorkspaceAvatar } from "../workspace/workSpaceAv";


interface headerProps {
    onWorkspaceSelected: (workspapce: Workspace) => void;
    selectedWorkspace: Workspace | null;
    onCreateWorkspace: () => void;
}
export const Header = ({
    onWorkspaceSelected,
    selectedWorkspace,
    onCreateWorkspace,
} : headerProps) => {

    const { user, logout } = useAuth()
    const { workspaces } = useLoaderData() as { workspaces: Workspace[] }
    console.log(workspaces)

    const handleOnClick = (workspace: Workspace) => {
        onWorkspaceSelected(workspace);
        
    }

    return (
        <div className="bg-background sticky z-40 top-0 border-b">
            <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"outline"}>
                        {selectedWorkspace ? (
                            <>
                            {selectedWorkspace.color && (
                                <WorkspaceAvatar
                                color={selectedWorkspace.color}
                                name={selectedWorkspace.name}
                                />
                            )}
                            <span className="font-medium">{selectedWorkspace?.name}</span>
                            </>
                        ) : (
                            <span className="font-medium">Select Workspace</span>
                        )}
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <DropdownMenuLabel>Workspace</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuGroup>
                        {workspaces.map((ws) => (
                            <DropdownMenuItem
                            key={ws._id}
                            onClick={() => handleOnClick(ws)}
                            >
                            {ws.color && (
                                <WorkspaceAvatar color={ws.color} name={ws.name} />
                            )}
                            <span className="ml-2">{ws.name}</span>
                            </DropdownMenuItem>
                        ))}
                        </DropdownMenuGroup>

                        <DropdownMenuGroup>
                        <DropdownMenuItem onClick={onCreateWorkspace}>
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Create Workspace
                        </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex justify-end items-center gap-2">
                    <Button variant='ghost' size='icon'>
                        <Bell/>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <button>
                                <Avatar>
                                    <AvatarImage src={user?.profilePic}/>
                                    <AvatarFallback className="bg-black text-white" >{user?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                
                            </button>
                        </DropdownMenuTrigger>
                        
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link to="/user/profile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>Log Out</DropdownMenuItem>
                        </DropdownMenuContent>                        

                    </DropdownMenu>

                </div>

            </div>
            
        </div>
    )
}

