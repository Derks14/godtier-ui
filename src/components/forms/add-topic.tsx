import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Field, FieldGroup } from "@/components/ui/field.tsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { SpinnerIcon } from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TopicService } from "@/services/api/tier.service.ts";
import { toast } from "@/components/ui/toast.tsx";
import { useRouter } from "@tanstack/react-router";

type AddTopicProps = {
  open: boolean;
};

const AddTopic = ({ open }: AddTopicProps) => {
  const [title, setTitle] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: TopicService.addTopic,
    onSuccess: async (data) => {
      const newTopic = data.data;
      await queryClient.invalidateQueries({ queryKey: ["topics"] });
      const toastId = toast.add({
        title: "Board Created",
        description: data.message,
        actionProps: {
          children: "Done",
          onClick() {
            toast.close(toastId);
          },
        },
      });
      await router.navigate({
        to: "/board",
        search: (prev) => ({
          ...prev,
          id: newTopic.id,
        }),
      });
    },
    onError: (error) => {
      const toastId = toast.add({
        type: "error",
        title: "Failed to Add Topic",
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

  return (
    <Dialog open={open} disablePointerDismissal>
      <form>
        <DialogContent className="sm:max-w-md" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle> Topic</DialogTitle>
            <DialogDescription>
              whats the this tier list about, provide a topic for this
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <FieldGroup>
              <Field>
                <Input
                  id="topic"
                  name="topic"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="canon lens tier list"
                />
              </Field>
            </FieldGroup>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button disabled={!title} onClick={() => mutate({ title })} type="submit">
              Add Topic
              {isPending && (
                <SpinnerIcon className="animate-spin" data-icon="inline-start" size={32} />
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddTopic;
