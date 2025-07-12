import { workspaceSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useCreateWorkspaceMutation } from "@/hooks/use-workspace";
import { toast } from "sonner";
import { useNavigate } from "react-router";


interface NewWorkspaceProps {
    isCreatingWorkspace: boolean;
    setIsCreatingWorkspace: (isCreatingWorkspace: boolean) => void;
}

export const colorOptions = [
    '#FF0000', //red
    '#FFA500', //orange
    '#FFFF00', //yellow
    '#00FF00', //green
    '#0000FF', //blue
    '#800080', //purple
    '#FFC0CB', //pink
    '#A52A2A', //brown
]

export type workspaceForm = z.infer<typeof workspaceSchema>

export const NewWorkspace = ({
    isCreatingWorkspace,
    setIsCreatingWorkspace,
}: NewWorkspaceProps) => {

    const form = useForm<workspaceForm>({
        resolver: zodResolver(workspaceSchema),
        defaultValues: {
            name: '',
            color: colorOptions[0],
            description: '',
        },
    })

    const { mutate, isPending } = useCreateWorkspaceMutation();
    const navigate = useNavigate();

    const onSubmit = (data: workspaceForm) => {
        mutate(data, {
            onSuccess: (data: any) => {
                console.log(data); 
                setIsCreatingWorkspace(false);
                toast.success("Workspace created successfully", {
                    duration: 3000,
                    position: 'top-right',
                });
                form.reset();
                navigate(`/workspaces/${data._id}`);
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'Failed to create workspace. Please try again.';
                toast.error(errorMessage, {
                    duration: 3000,
                    position: 'top-right',
                });
                console.log("Error during workspace creation:", error);
            }
        })
    }
    

    return (
        <Dialog
          open={isCreatingWorkspace}
          onOpenChange={setIsCreatingWorkspace}
          modal={true}
        >
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Workspace</DialogTitle>
            </DialogHeader>
    
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4 py-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Workspace Name" />
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
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Workspace Description"
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <FormControl>
                          <div className="flex gap-3 flex-wrap">
                            {colorOptions.map((color) => (
                              <div
                                key={color}
                                onClick={() => field.onChange(color)}
                                className={cn(
                                  "w-6 h-6 rounded-full cursor-pointer hover:opacity-80 transition-all duration-300",
                                  field.value === color &&
                                    "ring-2 ring-offset-2 ring-blue-500"
                                )}
                                style={{ backgroundColor: color }}
                              ></div>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
    
                <DialogFooter>
                  <Button type="submit">
                    {isPending ? "Creating..." : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      );
};