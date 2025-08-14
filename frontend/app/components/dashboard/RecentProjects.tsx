import type { Project } from "@/schema";
import { Link, useSearchParams } from "react-router";
import { cn } from "@/lib/utils";
import { getProjectProgress, getTaskStatusColor } from "@/lib/public";

export const RecentProjects = ({ data }: { data: Project[] }) => {
    const [searchParams] = useSearchParams();
    const workspaceId = searchParams.get("workspaceId");

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Projects</h3>
                <span className="text-sm text-gray-500">{data.length} projects</span>
            </div>

            <div className="space-y-4">
                {data.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">No recent projects yet</p>
                    </div>
                ) : (
                    data.map((project) => {
                        const projectProgress = getProjectProgress(project.tasks);

                        return (
                            <Link
                                key={project._id}
                                to={`/workspaces/${workspaceId}/projects/${project._id}`}
                                className="group block hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl p-4 transition-all duration-200 cursor-pointer border border-gray-100 dark:border-gray-700"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                        {project.title}
                                    </h4>
                                    <span
                                        className={cn(
                                            "px-3 py-1 text-xs font-medium rounded-full",
                                            getTaskStatusColor(project.status)
                                        )}
                                    >
                                        {project.status}
                                    </span>
                                </div>
                                
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                                    {project.description}
                                </p>
                                
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{projectProgress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                        <div 
                                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${projectProgress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    );
};