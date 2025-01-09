import { useState, useEffect } from "react";

type Event = {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  category: string;
  id: string;
};

type FormProps = {
  selectedDate: Date;
  setFormBool: React.Dispatch<React.SetStateAction<boolean>>;
  editingEvent: Event | null;
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  events: Event[];
};

const Form = ({ selectedDate, setFormBool, editingEvent, setEvents, events }: FormProps) => {
  const [title, setTitle] = useState<string>(editingEvent?.title || "");
  const [date, setDate] = useState<string>(editingEvent?.date || selectedDate.toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState<string>(editingEvent?.startTime || "");
  const [endTime, setEndTime] = useState<string>(editingEvent?.endTime || "");
  const [description, setDescription] = useState<string>(editingEvent?.description || "");
  const [category, setCategory] = useState<string>(editingEvent?.category || "work");

  // Submit the form (add or edit an event)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEvent: Event = {
      title,
      date,
      startTime,
      endTime,
      description,
      category,
      id: Math.random().toLocaleString(),
    };

    if (editingEvent) {
      // Edit existing event
      const updatedEvents = events.map((event) =>
        event.id === editingEvent.id ? { ...newEvent, id: editingEvent.id } : event
      );
      setEvents(updatedEvents);
    } else {
      // Add new event
      newEvent.id = new Date().toISOString(); // Generating unique ID for new event
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }

    // Save events to localStorage
    localStorage.setItem("events", JSON.stringify(events));

    // Close form modal
    setFormBool(false);
  };

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setDate(editingEvent.date);
      setStartTime(editingEvent.startTime);
      setEndTime(editingEvent.endTime);
      setDescription(editingEvent.description);
      setCategory(editingEvent.category);
    }
  }, [editingEvent]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">{editingEvent ? "Edit Event" : "Add Event"}</h2>

      <label className="text-sm" htmlFor="title">
        Title
      </label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 rounded-md border border-gray-300"
        required
      />

      <label className="text-sm" htmlFor="date">
        Date
      </label>
      <input
        type="date"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="p-2 rounded-md border border-gray-300"
        required
      />

      <label className="text-sm" htmlFor="startTime">
        Start Time
      </label>
      <input
        type="time"
        id="startTime"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        className="p-2 rounded-md border border-gray-300"
        required
      />

      <label className="text-sm" htmlFor="endTime">
        End Time
      </label>
      <input
        type="time"
        id="endTime"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        className="p-2 rounded-md border border-gray-300"
        required
      />

      <label className="text-sm" htmlFor="description">
        Description
      </label>
      <input
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 rounded-md border border-gray-300"
        
        required
      />

      <label className="text-sm" htmlFor="category">
        Category
      </label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 rounded-md border border-gray-300"
      >
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="others">Others</option>
      </select>

      <div className="flex justify-between gap-4 mt-4">
        <button
          type="button"
          onClick={() => setFormBool(false)}
          className="w-1/2 bg-gray-500 text-white p-2 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-1/2 bg-primary text-white p-2 rounded-md"
        >
          {editingEvent ? "Update Event" : "Add Event"}
        </button>
      </div>
    </form>
  );
};

export default Form;
