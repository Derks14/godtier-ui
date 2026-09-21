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
import { SpinnerGapIcon } from "@phosphor-icons/react";

const AddTopic = () => {
  const [open, setOpen] = useState(true);
  const [topic, setTopic] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    setLoading(true);
    console.log(topic);
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} disablePointerDismissal>
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
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="canon lens tier list"
                />
              </Field>
            </FieldGroup>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button disabled={!topic} onClick={handleSubmit} type="submit">
              Save changes
              <SpinnerGapIcon data-icon="inline-start" size={32} />
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddTopic;
