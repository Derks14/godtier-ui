import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type itemProps = {
  id: string;
  title: string;
  description: string;
};

const Item = ({ id, title, description }: itemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      className="bg-card shadow text-card-foreground p-4 rounded-xl my-2"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {/*code for a drag handle*/}
      {/*<button*/}
      {/*  {...attributes}*/}
      {/*  {...listeners}*/}
      {/*  className="cursor-grab active:cursor-grabbing"*/}
      {/*>*/}
      {/*  ⠿*/}
      {/*</button>*/}
      <div className="">
        <h5 className="font-medium leading-snug">{title}</h5>
      </div>
      <div className="text-muted-foreground">{description}</div>
    </div>
  );
};

export default Item;
