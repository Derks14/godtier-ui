import Item from "@/components/blocks/item.tsx";
import type { content } from "@/routes/_layout/add.tsx";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { type Dispatch, type SetStateAction } from "react";

type itemBlockProps = {
  content: content[];
  setContent: Dispatch<SetStateAction<content[]>>;
};

const ItemsBlock = ({ content, setContent }: itemBlockProps) => {
  // this art handles drag
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setContent((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  return (
    <div className="bg-accent rounded-xl h-full md:w-3/5 mx-auto flex flex-col">
      <div className="px-4 py-3 shrink-0">Items</div>
      <div>
        <hr />
      </div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={content.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="p-3 min-h-0 overflow-y-auto scroll-smooth scroll-fade scrollbar-thumb-accent flex-1">
            {content.map((item) => (
              <Item
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
              ></Item>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default ItemsBlock;
