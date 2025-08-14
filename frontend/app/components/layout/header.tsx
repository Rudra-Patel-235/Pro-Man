import type { Workspace } from "@/schema"
import { useAuth } from "@/tanstack/authContext";
import { Button } from "../ui/button";
import { Bell, PlusCircle, Search, Command, Settings, LogOut, User, Zap, ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router";
import { WorkspaceAvatar } from "../workspace/workSpaceAv";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";


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

    const navigate = useNavigate();
    // const { user, logout } = useAuth()
    // const { workspaces } = useLoaderData() as { workspaces: Workspace[] }
    const { user, logout } = useAuth()
    const { workspaces = [] } = useLoaderData() as { workspaces?: Workspace[] } || {}

    const isOnWorkspacePage = useLocation().pathname.includes("/workspace/");
    
    const handleOnClick = (workspace: Workspace) => {
        onWorkspaceSelected(workspace);
        const location = window.location;
        console.log("Current URL:", location);

        if (isOnWorkspacePage) {
            navigate(`/workspace/${workspace._id}`);
        }
        else {
            const basePath = location.pathname;
            console.log("Base Path:", basePath);
            navigate(`${basePath}?workspaceId=${workspace._id}`);
        }

    }

    return (
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
            <div className="flex h-16 items-center justify-between px-6 lg:px-8">
                {/* Left section - Workspace Selector */}
                <div className="flex items-center space-x-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant="ghost" 
                                className="flex items-center space-x-3 bg-gray-50/50 hover:bg-gray-100/50 border border-gray-200/50 rounded-xl px-4 py-2 h-10 transition-all duration-200"
                            >
                                {selectedWorkspace ? (
                                    <>
                                        {selectedWorkspace.color && (
                                            <WorkspaceAvatar
                                                color={selectedWorkspace.color}
                                                name={selectedWorkspace.name}
                                            />
                                        )}
                                        <span className="font-semibold text-gray-900 max-w-32 truncate">
                                            {selectedWorkspace?.name}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                            <Zap className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="font-semibold text-gray-700">Select Workspace</span>
                                    </>
                                )}
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-72 p-2 border-gray-200/50 shadow-xl">
                            <DropdownMenuLabel className="text-sm font-semibold text-gray-900 px-3 py-2">
                                Switch Workspace
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-gray-200/50" />

                            <div className="max-h-64 overflow-y-auto">
                                <DropdownMenuGroup>
                                    {workspaces.map((ws) => (
                                        <DropdownMenuItem
                                            key={ws._id}
                                            onClick={() => handleOnClick(ws)}
                                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                        >
                                            {ws.color && (
                                                <WorkspaceAvatar color={ws.color} name={ws.name} />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-gray-900 truncate">{ws.name}</div>
                                                <div className="text-sm text-gray-500 truncate">{ws.description || "No description"}</div>
                                            </div>
                                            {selectedWorkspace?._id === ws._id && (
                                                <Badge variant="secondary" className="text-xs">Current</Badge>
                                            )}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuGroup>
                            </div>

                            <DropdownMenuSeparator className="bg-gray-200/50 my-2" />
                            <DropdownMenuItem 
                                onClick={onCreateWorkspace}
                                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors text-blue-600"
                            >
                                <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <PlusCircle className="w-4 h-4 text-blue-600" />
                                </div>
                                <span className="font-medium">Create New Workspace</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Center section - Search */}
                <div className="flex-1 max-w-md mx-8">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Search projects, tasks, or members..."
                            className="pl-10 pr-12 h-10 bg-gray-50/50 border-gray-200/50 focus:bg-white focus:border-blue-300 transition-all duration-200 rounded-xl"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                <Command className="h-3 w-3" />K
                            </kbd>
                        </div>
                    </div>
                </div>

                {/* Right section - Actions & Profile */}
                <div className="flex items-center space-x-3">
                    {/* Notifications */}
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="relative hover:bg-gray-100/50 rounded-xl transition-colors"
                    >
                        <Bell className="w-5 h-5 text-gray-600" />
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            3
                        </span>
                    </Button>

                    {/* Quick Actions */}
                    <Button 
                        variant="ghost" 
                        size="icon"
                        className="hover:bg-gray-100/50 rounded-xl transition-colors"
                    >
                        <Settings className="w-5 h-5 text-gray-600" />
                    </Button>

                    {/* Profile Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex items-center space-x-3 hover:bg-gray-100/50 rounded-xl px-3 py-2 h-10">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user?.profilePic} />
                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                                        {user?.name?.charAt(0)?.toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="hidden md:block text-left">
                                    <div className="text-sm font-semibold text-gray-900">{user?.name}</div>
                                    <div className="text-xs text-gray-500">{user?.email}</div>
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-500 hidden md:block" />
                            </Button>
                        </DropdownMenuTrigger>
                        
                        <DropdownMenuContent align="end" className="w-64 p-2 border-gray-200/50 shadow-xl">
                            <div className="flex items-center space-x-3 p-3 border-b border-gray-100">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={user?.profilePic} />
                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                                        {user?.name?.charAt(0)?.toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-gray-900 truncate">{user?.name}</div>
                                    <div className="text-sm text-gray-500 truncate">{user?.email}</div>
                                </div>
                            </div>
                            
                            <DropdownMenuGroup className="py-2">
                                <DropdownMenuItem asChild>
                                    <Link to="/user/profile" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                                        <User className="w-4 h-4 text-gray-500" />
                                        <span>Profile Settings</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/settings" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                                        <Settings className="w-4 h-4 text-gray-500" />
                                        <span>Preferences</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            
                            <DropdownMenuSeparator className="bg-gray-200/50" />
                            <DropdownMenuItem 
                                onClick={logout}
                                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-red-50 cursor-pointer text-red-600 focus:text-red-600"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Sign Out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>                        
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}

