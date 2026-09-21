import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import type { Tier } from "@/services/models.ts";
import { Button } from "@/components/ui/button.tsx";
import { PlusIcon } from "@phosphor-icons/react";
import AddTopic from "@/components/forms/add-topic.tsx";

export const Route = createFileRoute("/_layout/board")({
  component: RouteComponent,
});

function RouteComponent() {
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [topic, setTopic] = useState<string>("");

  return (
    <>
      <AddTopic />
      <div className="h-full flex flex-col border-2 rounded-lg">
        <div className="px-5 py-3.5">Topic</div>
        <div>
          <hr className="h-1.5" />
        </div>
        <div className="flex flex-col gap-4 w-full p-6 justify-around h-full">
          <div className="flex-1">
            <div className="bg-accent rounded-lg size-full">
              <div className="flex size-full">
                <div className="shrink-0 p-4">one</div>
                <div>
                  <div className="w-0.5 bg-muted-foreground/60 h-full"></div>
                </div>
                <div className="flex-1 p-6">two</div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-accent rounded-lg size-full">
              <div className="flex size-full">
                <div className="shrink-0 p-4">one</div>
                <div>
                  <div className="w-0.5 bg-muted-foreground/60 h-full"></div>
                </div>
                <div className="flex-1 p-6">two</div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-accent rounded-lg size-full">
              <div className="flex size-full">
                <div className="shrink-0 p-4">one</div>
                <div>
                  <div className="w-0.5 bg-muted-foreground/60 h-full"></div>
                </div>
                <div className="flex-1 p-6">two</div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex gap-3  items-center">
              <div>
                <Button variant="ghost" size="lg">
                  <PlusIcon size={24} />
                  Add tier
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
