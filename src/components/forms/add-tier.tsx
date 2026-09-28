import { Button } from "@/components/ui/button.tsx";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Controller, useForm } from "react-hook-form";
import { object, string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "@/components/ui/field.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TierService } from "@/services/api/tier.service.ts";
import { toast } from "@/components/ui/toast.tsx";
import { SpinnerIcon } from "@phosphor-icons/react";
import type { Tier } from "@/services/models.ts";

interface AddTierProps {
  topicId: string;
}

const add_tier_schema = object({
  title: string().min(1, "add tier title").max(54, "title's too long"),
});

type AddTierValidationSchema = z.infer<typeof add_tier_schema>;

const AddTier = ({ topicId }: AddTierProps) => {
  const queryClient = useQueryClient();
  const { handleSubmit, control, reset, formState } = useForm<AddTierValidationSchema>({
    resolver: zodResolver(add_tier_schema),
    defaultValues: {
      title: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (newTier: Partial<Tier>) =>
      await TierService.addTier(topicId, newTier)
    ,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["tiers"] });

      console.log("this is our own come data ", data);
      const toastId = toast.add({
        title: "Tier List Added",
        description: data.message,
        actionProps: {
          children: "Done",
          onClick() {
            toast.close(toastId);
          },
        },
      });
      reset();
    },
    onError: async (error) => {
      const toastId = toast.add({
        type: "error",
        title: "Failed to Add Tier List",
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
  const onSubmit = (data: AddTierValidationSchema) => {
    console.log("we are here");
    mutate(data);
    console.log("after this - we are here");
  };
  return (
    <div className="flex gap-3  items-center">
      <form id="add-tier-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-1 items-center">
          <div>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    className="md:min-w-96"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Add tier"
                    autoComplete="off"
                  />
                </Field>
              )}
            />
          </div>
          <div>
            <Button disabled={!formState.isValid} type="submit" variant="ghost" size="lg">
              <PlusIcon data-icon="inline-start" />
              Add tier
              {isPending && (
                <SpinnerIcon className="animate-spin" data-icon="inline-start" size={32} />
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTier;
