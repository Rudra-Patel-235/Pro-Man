import { projectSchema } from '@/lib/zodSchema';
import { ProjectStatus, type membersProps } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';
import { Checkbox } from '../ui/checkbox';
import { useCreateProject } from '@/hooks/use-project';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

interface CreateProjectPopUpProps {
    isOpen: boolean;
    onChange: (isOpen: boolean) => void;
    workspaceId: string;
    workspaceMembers: membersProps[];
}

export type createProjectData = z.infer<typeof projectSchema>

export const CreateProjectPopUp = ({isOpen, onChange, workspaceId, workspaceMembers}: CreateProjectPopUpProps) => {
    const navigate = useNavigate();

    const form = useForm<createProjectData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: '',
            description: '',
            status: ProjectStatus.Planning,
            startDate: '',
            dueDate: '',
            members: [],
            tags: undefined,
        }
    })

    const { mutate, isPending } = useCreateProject()


    const onSubmit = (values: createProjectData) => {
        if(!workspaceId) return;

        mutate({
            projectData: values,
            workspaceId
        },
        {
            onSuccess: (data: any) => {
                toast.success('Project created successfully!', {
                    duration: 3000,
                    position: 'top-right',
                });
                form.reset()
                onChange(false)
                
                // Navigate to the newly created project if we have the project ID
                if (data?.project?._id) {
                    navigate(`/workspaces/${workspaceId}/projects/${data.project._id}`);
                } else if (data?._id) {
                    navigate(`/workspaces/${workspaceId}/projects/${data._id}`);
                }
            },

            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'Project creation failed. Please try again.';
                toast.error(errorMessage, {
                    duration: 3000,
                    position: 'top-right',
                });
                console.log("Error during project creation:", error);
            }
        })
    }

    return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className="sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Create a new project to get started
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Project Title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Project Description"
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Status</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Project Status" />
                      </SelectTrigger>

                      <SelectContent>
                        {Object.values(ProjectStatus).map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={
                              "w-full justify-start text-left font-normal" +
                              (!field.value ? "text-muted-foreground" : "")
                            }
                          >
                            <CalendarIcon className="size-4 mr-2" />
                            {field.value ? (
                              format(new Date(field.value), "PPPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) => {
                              field.onChange(date?.toISOString() || undefined);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={
                              "w-full justify-start text-left font-normal" +
                              (!field.value ? "text-muted-foreground" : "")
                            }
                          >
                            <CalendarIcon className="size-4 mr-2" />
                            {field.value ? (
                              format(new Date(field.value), "PPPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) => {
                              field.onChange(date?.toISOString() || undefined);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Tags separated by comma" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="members"
              render={({ field }) => {
                const selectedMembers = field.value || [];

                return (
                  <FormItem>
                    <FormLabel>Members</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className="w-full justify-start text-left font-normal min-h-11"
                          >
                            {selectedMembers.length === 0 ? (
                              <span className="text-muted-foreground">
                                Select Members
                              </span>
                            ) : selectedMembers.length <= 2 ? (
                              selectedMembers.map((m) => {
                                const member = workspaceMembers.find(
                                  (wm) => wm.user._id === m.user
                                );

                                return `${member?.user.name} (${member?.role})`;
                              })
                            ) : (
                              `${selectedMembers.length} members selected`
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-full max-w-60 overflow-y-auto"
                          align="start"
                        >
                          <div className="flex flex-col gap-2">
                            {workspaceMembers.map((member) => {
                              const selectedMember = selectedMembers.find(
                                (m) => m.user === member.user._id
                              );

                              return (
                                <div
                                  key={member._id}
                                  className="flex items-center gap-2 p-2 border rounded"
                                >
                                  <Checkbox
                                    checked={!!selectedMember}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange([
                                          ...selectedMembers,
                                          {
                                            user: member.user._id,
                                            role: "contributor",
                                          },
                                        ]);
                                      } else {
                                        field.onChange(
                                          selectedMembers.filter(
                                            (m) => m.user !== member.user._id
                                          )
                                        );
                                      }
                                    }}
                                    id={`member-${member.user._id}`}
                                  />
                                  <span className="truncate flex-1">
                                    {member.user.name}
                                  </span>

                                  {selectedMember && (
                                    <Select
                                      value={selectedMember.role}
                                      onValueChange={(role) => {
                                        field.onChange(
                                          selectedMembers.map((m) =>
                                            m.user === member.user._id
                                              ? {
                                                  ...m,
                                                  role: role as
                                                    | "contributor"
                                                    | "manager"
                                                    | "viewer",
                                                }
                                              : m
                                          )
                                        );
                                      }}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select Role" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="manager">
                                          Manager
                                        </SelectItem>
                                        <SelectItem value="contributor">
                                          Contributor
                                        </SelectItem>
                                        <SelectItem value="viewer">
                                          Viewer
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <DialogFooter>
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? "Creating..." : "Create Project"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

