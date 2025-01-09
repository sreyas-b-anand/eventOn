import { useState, useEffect } from "react";
import Calendar from "@/components/CalendarGrid/Calender";
import Navbar from "@/components/Navbar/Navbar";
import Form from "@/components/Form/Form";
import EventCard from "@/components/EventCard/EventCard";

type Event = {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  category: string;
  id: string;
};

const Home = () => {
  const [formBool, setFormBool] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  // Load events from localStorage
  useEffect(() => {
    const loadEvents = () => {
      const storedEvents = localStorage.getItem("events");
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      }
    };

    loadEvents();
    window.addEventListener("storage", loadEvents);

    return () => {
      window.removeEventListener("storage", loadEvents);
    };
  }, []);

  // Save events to localStorage
  useEffect(() => {
    if (events.length) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

  // Delete event function
  const handleDeleteEvent = (eventToDelete: Event) => {
    const updatedEvents = events.filter(
      (event) => event.id !== eventToDelete.id
    );
    setEvents(updatedEvents);
  };

  // Edit event function
  const handleEditEvent = (eventToEdit: Event) => {
    setEditingEvent(eventToEdit);
    setFormBool(true); // Show form for editing
  };

  // Filter events based on the search query
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-background">
      <Navbar />
      <main className="bg-background m-2 px-4 py-3">
        <div className="flex flex-col lg:flex-row gap-5 h-[620px]">
          {/* Calendar Section */}
          <div className="w-full lg:w-1/2">
            <div className="bg-background rounded-lg shadow-lg p-6 h-full">
              <div className="px-3">
                <h2 className="text-2xl font-bold text-primary mb-2">
                  EventOn
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Add your upcoming events
                </p>
                <p className="text-sm text-muted-foreground italic mb-6">
                  Click on a date to add an event
                </p>
              </div>
              <Calendar
                setSelectedDate={setSelectedDate}
                setFormBool={setFormBool}
              />
            </div>
          </div>

          {/* Event Card Section */}
          <div className="w-full lg:w-1/2 h-full">
  <div className="bg-background border-gray-400 rounded-lg shadow-lg p-6 h-[620px] overflow-y-auto">
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search events by title..."
        className="p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary bg-gray-600 "
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
    {filteredEvents.length > 0 ? (
      filteredEvents
        // Sort the filtered events by date (ensure date is in valid format)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // Sorting by date ascending
        .map((event, index) => (
          <EventCard
            key={index}
            event={event}
            onDelete={handleDeleteEvent} // Pass delete function
            onEdit={handleEditEvent} // Pass edit function
          />
        ))
    ) : (
      <p className="text-center text-muted-foreground h-full flex items-center justify-center">
        No events found
      </p>
    )}
  </div>
</div>

        </div>

        {/* Form Modal for Adding or Editing Events */}
        {formBool && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-card rounded-lg p-6 max-w-md w-full m-4">
              <Form
                selectedDate={selectedDate}
                setFormBool={setFormBool}
                editingEvent={editingEvent}
                setEditingEvent={setEditingEvent}
                setEvents={setEvents}
                events={events}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
