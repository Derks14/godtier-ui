import type { Topic } from "@/services/models.ts";
import { formatted } from "@/services/util.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { DotsThreeVerticalIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TopicService } from "@/services/api/tier.service.ts";
import { toast } from "@/components/ui/toast.tsx";
import { PencilIcon, ShareIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog.tsx";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Link } from "@tanstack/react-router";

const TopicsCard = ({ entry }: { entry: Topic }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => TopicService.deleteTopic(entry.id),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["topics"],
      });
      setDeleteDialogOpen(false);

      const toastId = toast.add({
        title: "Topic Deleted",
        description: data.message,
        actionProps: {
          children: "Done",
          onClick() {
            toast.close(toastId);
          },
        },
      });
    },
    onError: (error) => {
      const toastId = toast.add({
        title: "Something went wrong",
        description: error.message,
        actionProps: {
          children: "Done",
          onClick() {
            toast.close(toastId);
          },
        },
      });
    },
  });

  const onDelete = () => {
    mutate();
  };

  const copyLink = () => {
    setShareDialogOpen(false);

    const toastId = toast.add({
      title: "Copied",
      description: "Serve link to your friends",
      actionProps: {
        children: "Done",
        onClick() {
          toast.close(toastId);
        },
      },
    });
  };
  return (
    <>
      <Link className="cursor-pointer" to="/board" search={{ id: entry.id }}>
        <div key={entry.id} className="p-2 rounded-lg  md:min-w-72 border">
          <div className="flex items-center justify-between">
            <div className="p-1">
              <span className="text-4xl">📋</span>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      variant="ghost"
                      size="icon"
                    >
                      <DotsThreeVerticalIcon weight="bold" size={32} />
                    </Button>
                  }
                />
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <PencilIcon />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShareDialogOpen(true);
                      }}
                    >
                      <ShareIcon />
                      Share
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setDeleteDialogOpen(true);
                    }}
                    variant="destructive"
                  >
                    <TrashIcon className="" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="text-3xl py-1.5">{entry.title}</div>
          <div className="text-muted-foreground text-sm">
            {formatted(entry.created)}
          </div>
        </div>
      </Link>

      {/* delete dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <TrashIcon />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete Topic?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this topic all tier data and items
              associated with this topic.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} variant="destructive">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/*share dialog*/}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                defaultValue={`http://localhost:5173/board?id=${entry.id}`}
                readOnly
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose
              render={
                <Button variant="outline" type="button">
                  Close
                </Button>
              }
            />
            <Button onClick={copyLink} variant="default">
              Copy Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TopicsCard;
