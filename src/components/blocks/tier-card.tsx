import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  PlusIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import type { Tier } from "@/services/models.ts";
import { useState } from "react";
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
import { useMutation } from "@tanstack/react-query";
import { TierService } from "@/services/api/tier.service.ts";
import { toast } from "@/components/ui/toast.tsx";
import { queryClient } from "@/services/queryClient.ts";

const TierCard = ({ entry }: { entry: Tier }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { mutate } = useMutation({
    mutationFn: () => TierService.deleteTier(entry.id),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["tiers"],
      });
      setDeleteDialogOpen(false);
      const toastId = toast.add({
        type: "success",
        title: "Tier deleted",
        description: data.message,
        actionProps: {
          children: "Done",
          onClick() {
            toast.close(toastId);
          },
        },
      });
    },
    onError: (err) => {
      setDeleteDialogOpen(false);
      const toastId = toast.add({
        type: "error",
        title: "Failed to Delete Tier",
        description: err.message,
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
    /* delete item here*/
  };
  return (
    <>
      <div className="flex-1">
        <div className="bg-accent rounded-lg size-full">
          <div className="flex h-full">
            <div className="flex flex-1 items-stretch">
              <div className="flex shrink-0 items-center px-2">
                <div className="[writing-mode:vertical-rl]  rotate-180">
                  <div className="flex gap-6">
                    <div>{entry.title}</div>
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
                              <EllipsisVerticalIcon />
                            </Button>
                          }
                        />
                        <DropdownMenuContent>
                          <DropdownMenuGroup>
                            <DropdownMenuItem>
                              <PencilIcon />
                              Edit
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
                </div>
              </div>

              <div className="w-0.5 shrink-0 bg-muted-foreground/60" />

              <div className="flex-1">
                <div className="p-3 gap-3 h-full flex">
                  <div className="bg-card basis-3xs rounded-lg p-3">one</div>
                  <div className="bg-card basis-3xs rounded-lg p-3">one</div>
                  <div className="bg-card basis-3xs rounded-lg p-3">one</div>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center px-2 py-4">
              <Button
                variant="outline"
                className="[writing-mode:vertical-rl] min-w-8 min-h-28 px-2"
              >
                <PlusIcon />
                Add Item
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <TrashIcon />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete Tier?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this tier all data and items associated with this topic.
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
    </>
  );
};

export default TierCard;
