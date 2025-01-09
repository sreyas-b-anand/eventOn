
type Event = {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    description: string;
    category: string;
    id : string;
  };
  
import { MdDeleteOutline, MdEdit } from "react-icons/md";

const EventCard = ({
  event,
  onDelete,
  onEdit,
}: {
  event: Event;
  onDelete: (event: Event) => void;
  onEdit: (event: Event) => void;
}) => {
  return (
    <div className="bg-[var(--card-background)] p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-200 flex items-start justify-start gap-4 flex-col flex-wrap">
      <div className="flex justify-between items-center w-full">
        <h3 className="text-xl font-semibold text-[var(--font-color)]">{event.title}</h3>
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-700 font-semibold mt-2"
            onClick={() => onEdit(event)} // Call the edit handler
          >
            <MdEdit />
          </button>
          <button
            className="text-red-500 hover:text-red-700 font-semibold mt-2"
            onClick={() => onDelete(event)}
          >
            <MdDeleteOutline />
          </button>
        </div>
      </div>
      <p className="text-[var(--secondary)]">{event.date}</p>
      <p className="text-gray-400 text-sm">
        {event.startTime} - {event.endTime}
      </p>
      <p className="text-sm">
        <span
          className={`w-[80px] p-1 flex items-center justify-center rounded-sm ${event.category === "work" ? "bg-purple-600" : "bg-green-400 text-black"}`}
        >
          {event.category}
        </span>
      </p>
      <p className="text-[var(--foreground)] mt-2">{event.description}</p>
    </div>
  );
};

export default EventCard;
