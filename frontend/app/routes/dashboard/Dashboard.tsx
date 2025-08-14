import { Charts } from "@/components/dashboard/Charts";
import { RecentProjects } from "@/components/dashboard/RecentProjects";
import { TotalsCard } from "@/components/dashboard/TotalsCard";
import { UpcomingTasks } from "@/components/dashboard/UpcomingTasks";
import Loader from "@/components/Loader";
import { useGetWorkspaceStatsQuery } from "@/hooks/use-workspace";
import type { Project, ProjectStatusData, StatsCardProps, Task, TaskPriorityData, TaskTrendsData, WorkspaceProductivityData } from "@/schema";
import { useSearchParams } from "react-router";
import { 
    TrendingUp, 
    Users, 
    CheckCircle2, 
    Clock, 
    Target, 
    BarChart3, 
    Activity,
    Zap,
    Calendar,
    AlertTriangle,
    Award,
    Sparkles
} from "lucide-react";


const Dashboard = () => {
    const [searchParams] = useSearchParams();
    const workspaceId = searchParams.get("workspaceId");

    const { data, isPending } = useGetWorkspaceStatsQuery(workspaceId!) as {
        data: {
        stats: StatsCardProps;
        taskTrendsData: TaskTrendsData[];
        projectStatusData: ProjectStatusData[];
        taskPriorityData: TaskPriorityData[];
        workspaceProductivityData: WorkspaceProductivityData[];
        upcomingTasks: Task[];
        recentProjects: Project[];
        };
        isPending: boolean;
    };

    if (isPending) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Hero Section */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-8">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                Workspace Analytics
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 text-lg">
                                Monitor your team's performance and project progress
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span>Live Data</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards with New Design */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">Total Projects</p>
                                <p className="text-3xl font-bold">{data.stats.totalProjects}</p>
                                <p className="text-blue-200 text-xs">{data.stats.totalProjectInProgress} active</p>
                            </div>
                            <div className="bg-blue-400 bg-opacity-30 rounded-full p-3">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-emerald-100 text-sm font-medium">Total Tasks</p>
                                <p className="text-3xl font-bold">{data.stats.totalTasks}</p>
                                <p className="text-emerald-200 text-xs">{data.stats.totalTaskCompleted} completed</p>
                            </div>
                            <div className="bg-emerald-400 bg-opacity-30 rounded-full p-3">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-amber-100 text-sm font-medium">To Do</p>
                                <p className="text-3xl font-bold">{data.stats.totalTaskToDo}</p>
                                <p className="text-amber-200 text-xs">Pending tasks</p>
                            </div>
                            <div className="bg-amber-400 bg-opacity-30 rounded-full p-3">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M12 6V4a2 2 0 00-2-2H8a2 2 0 00-2 2v2H4a1 1 0 000 2h1v9a2 2 0 002 2h6a2 2 0 002-2V8h1a1 1 0 100-2h-2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm font-medium">In Progress</p>
                                <p className="text-3xl font-bold">{data.stats.totalTaskInProgress}</p>
                                <p className="text-purple-200 text-xs">Active work</p>
                            </div>
                            <div className="bg-purple-400 bg-opacity-30 rounded-full p-3">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Section with New Layout */}
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Task Trends - Full Width */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Task Trends</h3>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">Completed</span>
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">In Progress</span>
                                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                                <span className="text-sm text-gray-600">To Do</span>
                            </div>
                        </div>
                        <Charts
                            stats={data.stats}
                            taskTrendsData={data.taskTrendsData}
                            projectStatusData={[]}
                            taskPriorityData={[]}
                            workspaceProductivityData={[]}
                        />
                    </div>

                    {/* Project Status */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Project Status</h3>
                        <Charts
                            stats={data.stats}
                            taskTrendsData={[]}
                            projectStatusData={data.projectStatusData}
                            taskPriorityData={[]}
                            workspaceProductivityData={[]}
                        />
                    </div>
                </div>

                {/* Second Row Charts */}
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Task Priority */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Task Priority</h3>
                        <Charts
                            stats={data.stats}
                            taskTrendsData={[]}
                            projectStatusData={[]}
                            taskPriorityData={data.taskPriorityData}
                            workspaceProductivityData={[]}
                        />
                    </div>

                    {/* Workspace Productivity */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Workspace Productivity</h3>
                        <Charts
                            stats={data.stats}
                            taskTrendsData={[]}
                            projectStatusData={[]}
                            taskPriorityData={[]}
                            workspaceProductivityData={data.workspaceProductivityData}
                        />
                    </div>
                </div>

                {/* Bottom Section - Recent Projects and Upcoming Tasks */}
                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                        <RecentProjects data={data.recentProjects} />
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                        <UpcomingTasks data={data.upcomingTasks} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;