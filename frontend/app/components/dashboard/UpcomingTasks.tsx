import { Link, useSearchParams } from "react-router";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { format } from "date-fns";
import type { Task } from "@/schema";

export const UpcomingTasks = ({ data }: { data: Task[] }) => {
    const [searchParams] = useSearchParams();
    const workspaceId = searchParams.get("workspaceId");

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming Tasks</h3>
                <span className="text-sm text-gray-500">{data.length} tasks</span>
            </div>

            <div className="space-y-3">
                {data.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">No upcoming tasks yet</p>
                    </div>
                ) : (
                    data.map((task) => (
                        <Link
                            to={`/workspaces/${workspaceId}/projects/${task.project}/tasks/${task._id}`}
                            key={task._id}
                            className="group block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 border border-gray-100 dark:border-gray-700"
                        >
                            <div className="flex items-start space-x-3">
                                <div
                                    className={cn(
                                        "mt-1 rounded-full p-2 flex items-center justify-center",
                                        task.priority === "High" && "bg-red-100 text-red-600",
                                        task.priority === "Medium" && "bg-yellow-100 text-yellow-600",
                                        task.priority === "Low" && "bg-gray-100 text-gray-600"
                                    )}
                                >
                                    {task.status === "Done" ? (
                                        <CheckCircle2 className="w-4 h-4" />
                                    ) : (
                                        <Circle className="w-4 h-4" />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                        {task.title}
                                    </p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <span 
                                            className={cn(
                                                "px-2 py-1 text-xs font-medium rounded-full",
                                                task.status === "Done" && "bg-green-100 text-green-700",
                                                task.status === "In Progress" && "bg-blue-100 text-blue-700",
                                                task.status === "To Do" && "bg-gray-100 text-gray-700"
                                            )}
                                        >
                                            {task.status}
                                        </span>
                                        {task.dueDate && (
                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {format(new Date(task.dueDate), "MMM d, yyyy")}
                                            </span>
                                        )}
                                        <span 
                                            className={cn(
                                                "px-2 py-1 text-xs font-medium rounded-full",
                                                task.priority === "High" && "bg-red-100 text-red-700",
                                                task.priority === "Medium" && "bg-yellow-100 text-yellow-700",
                                                task.priority === "Low" && "bg-gray-100 text-gray-700"
                                            )}
                                        >
                                            {task.priority}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

// http://localhost:5173/workspaces/686d5dcf19d6d323b65060d9/projects/6882572e92df49fc69e68c76/tasks/689e24d462eaf34450ea5248

// http://localhost:5173/workspaces686d5dcf19d6d323b65060d9/projects/6882572e92df49fc69e68c76/tasks/689e24d462eaf34450ea5248