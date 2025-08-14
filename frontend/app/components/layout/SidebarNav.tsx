import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router";
import type { Workspace } from "@/schema";
import { Badge } from "../ui/badge";

interface SidebarNavProps extends React.HtmlHTMLAttributes<HTMLElement> {
  items: {
    title: string;
    href: string;
    icon: LucideIcon;
    badge?: string | null;
  }[];
  isCollapsed: boolean;
  currentWorkspace: Workspace | null;
  className?: string;
}
export const SidebarNav = ({
  items,
  isCollapsed,
  className,
  currentWorkspace,
  ...props
}: SidebarNavProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className={cn("flex flex-col gap-y-2", className)} {...props}>
      {items.map((el) => {
        const Icon = el.icon;
        const isActive = location.pathname === el.href;

        const handleClick = () => {
          if (el.href === "/workspaces") {
            navigate(el.href);
          } else if (currentWorkspace && currentWorkspace._id) {
            navigate(`${el.href}?workspaceId=${currentWorkspace._id}`);
          } else {
            navigate(el.href);
          }
        };

        return (
          <Button
            key={el.href}
            variant="ghost"
            className={cn(
              "w-full justify-start h-11 rounded-xl transition-all duration-200",
              isActive 
                ? "bg-blue-50 text-blue-700 font-semibold shadow-sm border border-blue-100" 
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
              isCollapsed && "justify-center px-2"
            )}
            onClick={handleClick}
          >
            <Icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left">{el.title}</span>
                {el.badge && (
                  <Badge 
                    variant="secondary" 
                    className="ml-auto bg-blue-100 text-blue-700 text-xs h-5 px-2"
                  >
                    {el.badge}
                  </Badge>
                )}
              </>
            )}
            {isCollapsed && (
              <span className="sr-only">{el.title}</span>
            )}
          </Button>
        );
      })}
    </nav>
  );
};