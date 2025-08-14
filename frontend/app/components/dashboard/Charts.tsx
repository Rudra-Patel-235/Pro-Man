import type {
    ProjectStatusData,
    StatsCardProps,
    TaskPriorityData,
    TaskTrendsData,
    WorkspaceProductivityData,
} from "@/schema";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { ChartBarBig, ChartLine, ChartPie } from "lucide-react";
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "../ui/chart";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    XAxis,
    YAxis,
} from "recharts";

interface StatisticsChartsProps {
    stats: StatsCardProps;
    taskTrendsData: TaskTrendsData[];
    projectStatusData: ProjectStatusData[];
    taskPriorityData: TaskPriorityData[];
    workspaceProductivityData: WorkspaceProductivityData[];
}

export const Charts = ({
  stats,
  taskTrendsData,
  projectStatusData,
  taskPriorityData,
  workspaceProductivityData,
}: StatisticsChartsProps) => {
    // Render Task Trends Line Chart
    if (taskTrendsData.length > 0) {
        return (
            <div className="h-[300px]">
                <ChartContainer
                    className="h-full w-full"
                    config={{
                        completed: { color: "#10b981" },
                        inProgress: { color: "#3b82f6" },
                        todo: { color: "#6b7280" },
                    }}
                >
                    <LineChart data={taskTrendsData}>
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                            type="monotone"
                            dataKey="completed"
                            stroke="#10b981"
                            strokeWidth={3}
                            dot={{ r: 5, fill: "#10b981" }}
                            activeDot={{ r: 7 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="inProgress"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            dot={{ r: 5, fill: "#3b82f6" }}
                            activeDot={{ r: 7 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="todo"
                            stroke="#6b7280"
                            strokeWidth={3}
                            dot={{ r: 5, fill: "#6b7280" }}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>
                </ChartContainer>
            </div>
        );
    }

    // Render Project Status Pie Chart
    if (projectStatusData.length > 0) {
        return (
            <div className="h-[300px] flex items-center justify-center">
                <ChartContainer
                    className="h-full w-full"
                    config={{
                        Completed: { color: "#10b981" },
                        "In Progress": { color: "#3b82f6" },
                        Planning: { color: "#f59e0b" },
                    }}
                >
                    <PieChart>
                        <Pie
                            data={projectStatusData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={100}
                            paddingAngle={3}
                            dataKey="value"
                            nameKey="name"
                        >
                            {projectStatusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend 
                            content={<ChartLegendContent />} 
                            verticalAlign="bottom"
                            height={36}
                        />
                    </PieChart>
                </ChartContainer>
            </div>
        );
    }

    // Render Task Priority Pie Chart
    if (taskPriorityData.length > 0) {
        return (
            <div className="h-[300px] flex items-center justify-center">
                <ChartContainer
                    className="h-full w-full"
                    config={{
                        High: { color: "#ef4444" },
                        Medium: { color: "#f59e0b" },
                        Low: { color: "#6b7280" },
                    }}
                >
                    <PieChart>
                        <Pie
                            data={taskPriorityData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={100}
                            paddingAngle={3}
                            dataKey="value"
                            nameKey="name"
                        >
                            {taskPriorityData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend 
                            content={<ChartLegendContent />} 
                            verticalAlign="bottom"
                            height={36}
                        />
                    </PieChart>
                </ChartContainer>
            </div>
        );
    }

    // Render Workspace Productivity Bar Chart
    if (workspaceProductivityData.length > 0) {
        return (
            <div className="h-[300px]">
                <ChartContainer
                    className="h-full w-full"
                    config={{
                        completed: { color: "#10b981" },
                        total: { color: "#e5e7eb" },
                    }}
                >
                    <BarChart data={workspaceProductivityData} barGap={10}>
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar
                            dataKey="total"
                            fill="#e5e7eb"
                            radius={[6, 6, 0, 0]}
                            name="Total Tasks"
                        />
                        <Bar
                            dataKey="completed"
                            fill="#10b981"
                            radius={[6, 6, 0, 0]}
                            name="Completed Tasks"
                        />
                        <ChartLegend 
                            content={<ChartLegendContent />} 
                            verticalAlign="bottom"
                            height={36}
                        />
                    </BarChart>
                </ChartContainer>
            </div>
        );
    }

    return null;
};