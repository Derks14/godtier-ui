import { createFileRoute } from "@tanstack/react-router";
import AddItemForm from "@/components/forms/addItemForm.tsx";
import ItemsBlock from "@/components/blocks/items-block.tsx";
import { useState } from "react";

export type content = {
  id: string;
  title: string;
  description: string;
};

const Add = () => {
  const [content, setContent] = useState<content[]>([]);

  return (
    <>
      <div className="md:flex h-full items-center md:w-4/5 mx-auto justify-around">
        <div className="my-8 md:w-lg">
          <AddItemForm content={content} setContent={setContent} />
        </div>
        <div className="flex-1 h-full">
          <ItemsBlock content={content} setContent={setContent} />
        </div>
      </div>
    </>
  );
};

export const Route = createFileRoute("/_layout/add")({
  component: Add,
});
