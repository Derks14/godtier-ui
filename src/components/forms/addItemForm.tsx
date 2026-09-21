import { object, string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group.tsx";
import type { Dispatch, SetStateAction } from "react";
import type { content } from "@/routes/_layout/add.tsx";

// state schema here
const item_schema = object({
  title: string()
    .min(5, "item title must be at least 5 characters.")
    .max(32, "item title must be at most 32 characters."),
  description: string()
    .min(10, "item description must be at least 20 characters.")
    .max(100, "description must be at most 100 characters."),
});

type ItemValidationSchema = z.infer<typeof item_schema>;

type addItemFormProps = {
  content: content[];
  setContent: Dispatch<SetStateAction<content[]>>;
};

const addItemForm = ({ content, setContent }: addItemFormProps) => {
  const { handleSubmit, control, reset } = useForm<ItemValidationSchema>({
    resolver: zodResolver(item_schema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(data: ItemValidationSchema) {
    // Do something with the form values.
    console.log(data);
    const newContent = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
    };
    setContent([...content, newContent]);

    reset();
  }

  return (
    <>
      <form id="add-item-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>title</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Canon EOS R6 mk III"
                  autoComplete="off"
                />
                <FieldDescription>
                  Provide a concise title for your bug report.
                </FieldDescription>
              </Field>
            )}
          />
        </div>

        <div className="my-8">
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>description</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id={field.name}
                    className="max-h-64"
                    placeholder="this is the latest hybrid camera from canon"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.value.length}/100 characters
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription>
                  Include steps to reproduce, expected behavior, and what
                  actually happened.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <div>
          <div className="flex gap-3 items-center ">
            <div>
              <Button variant="outline" type="button" onClick={() => reset()}>
                reset
              </Button>
            </div>
            <div>
              <Button type="submit">submit</Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default addItemForm;
