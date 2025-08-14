import { cn } from "@/lib/utils";
import type { Workspace } from "@/schema";
import { useAuth } from "@/tanstack/authContext";
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  LayoutDashboard,
  ListCheck,
  LogOut,
  Settings,
  Users,
  Zap,
  type LucideIcon,
  Briefcase,
  Target,
  Calendar,
  BarChart3,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { SidebarNav } from "./SidebarNav";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

export const Sidebar = ({
  currentWorkspace,
}: {
  currentWorkspace: Workspace | null;
}) => {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      title: "Projects",
      href: "/workspaces",
      icon: Briefcase,
      badge: null,
    },
    {
      title: "My Tasks",
      href: "/my-tasks",
      icon: ListCheck,
      badge: "3",
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: BarChart3,
      badge: null,
    },
    {
      title: "Team",
      href: `/members`,
      icon: Users,
      badge: null,
    },
    {
      title: "Calendar",
      href: "/calendar",
      icon: Calendar,
      badge: null,
    },
    {
      title: "Goals",
      href: `/goals`,
      icon: Target,
      badge: null,
    },
    {
      title: "Archive",
      href: `/achieved`,
      icon: CheckCircle2,
      badge: null,
    },
  ];

  return (
    <div 
      className={cn(
        "flex flex-col bg-white border-r border-gray-200/50 transition-all duration-300",
        isCollapsed ? "w-16 md:w[80px]" : "w-16 md:w-[280px]"
      )}
    >
      {/* Logo Section */}
      <div className="flex h-16 items-center justify-between border-b border-gray-200/50 px-4">
        <Link to="/dashboard" className="flex items-center space-x-3">
          {!isCollapsed && (
            <>
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="hidden md:block">
                <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Pro-Man
                </span>
              </div>
            </>
          )}

          {isCollapsed && (
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
          )}
        </Link>

        <Button
          variant="ghost"
          size="icon"
          className="ml-auto hidden md:flex h-8 w-8 hover:bg-gray-100 rounded-lg"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ArrowRight className="w-4 h-4 text-gray-500" />
          ) : (
            <ArrowLeft className="w-4 h-4 text-gray-500" />
          )}
        </Button>
      </div>

      {/* Workspace Info (when not collapsed) */}
      {!isCollapsed && currentWorkspace && (
        <div className="px-4 py-4 border-b border-gray-200/50">
          <div className="flex items-center space-x-3 p-3 bg-gray-50/50 rounded-xl">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm"
              style={{ backgroundColor: currentWorkspace.color }}
            >
              {currentWorkspace.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 truncate">{currentWorkspace.name}</div>
              <div className="text-sm text-gray-500 truncate">Active Workspace</div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-2">
          {!isCollapsed && (
            <div className="px-3 py-2">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Navigation</h2>
            </div>
          )}
          <SidebarNav
            items={navItems as { title: string; href: string; icon: LucideIcon; badge?: string | null }[]}
            isCollapsed={isCollapsed}
            className={cn(isCollapsed && "items-center space-y-2")}
            currentWorkspace={currentWorkspace}
          />
        </div>
      </ScrollArea>

      {/* User Profile & Logout */}
      <div className="border-t border-gray-200/50 p-4">
        {!isCollapsed ? (
          <div className="space-y-3">
            {/* User Profile */}
            <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
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

            {/* Logout Button */}
            <Button
              variant="ghost"
              onClick={logout}
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl"
            >
              <LogOut className="w-4 h-4 mr-3" />
              <span>Sign Out</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-2 flex flex-col items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.profilePic} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-xs">
                {user?.name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};