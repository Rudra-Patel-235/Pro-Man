import { getData } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader";
import type { ActivityLog } from "@/schema";
import { ActivityIcon } from "./ActivityIcon";

export const TaskActivity = ({ resourceId }: { resourceId: string }) => {
    const { data, isPending } = useQuery({
        queryKey: ["task-activity", resourceId],
        queryFn: () => getData(`/tasks/${resourceId}/activities`),
    }) as {
        data: ActivityLog[];
        isPending: boolean;
    };

    if (isPending) return <Loader />;

    return (
        <div className="bg-card rounded-lg p-6 shadow-sm">
        <h3 className="text-lg text-muted-foreground mb-4">Activity</h3>

        <div className="space-y-4">
            {data?.map((activity) => (
            <div key={activity._id} className="flex gap-2">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {ActivityIcon(activity.action)}
                </div>

                <div>
                <p className="text-sm">
                    <span className="font-medium">{activity.user.name}</span>{" "}
                    {activity.details?.message}
                </p>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
};