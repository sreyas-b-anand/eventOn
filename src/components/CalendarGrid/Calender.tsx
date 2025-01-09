import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Calendar: React.FC<{
  setFormBool: (state: boolean) => void;
  setSelectedDate: (state: Date) => void;
}> = ({ setFormBool, setSelectedDate }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDateInternal] = useState<Date | null>(null); // Local state for internal usage

  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const calendarData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const today = new Date();

    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(new Date(year, month, day));
    }

    return {
      days: calendarDays,
      today: today,
    };
  }, [currentDate]);

  const prevMonth = (): void => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const nextMonth = (): void => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const isToday = (date: Date): boolean => {
    return date.toDateString() === calendarData.today.toDateString();
  };

  const isSelected = (date: Date): boolean => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  const isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday (0) or Saturday (6)
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date); // Set the selected date through the prop
    setSelectedDateInternal(date); // Optional: Track it locally as well
    setFormBool(true); // Show form when a date is selected
  };

  const handleKeyDown = (e: React.KeyboardEvent, date: Date) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleDateSelect(date);
    }
  };

  return (
    <Card
      className="max-w-3xl mx-auto mt-8 m-2"
      style={{ backgroundColor: "var(--card)", color: "var(--foreground)" }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <CardTitle className="text-2xl font-bold">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </CardTitle>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevMonth}
            aria-label="Previous month"
            className="bg-transparent text-gray-300 hover:bg-gray-600"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextMonth}
            aria-label="Next month"
            className="bg-transparent text-gray-300 hover:bg-gray-600"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-4" role="row">
          {days.map((day) => (
            <div
              key={day}
              className="text-center font-medium text-muted-foreground"
              role="columnheader"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1" role="grid">
          {calendarData.days.map((date, index) =>
            date ? (
              <Button
                key={index}
                variant={isToday(date) ? "default" : "ghost"}
                className={`h-14 w-full hover:text-gray-300 text-gray-300 ${
                  isToday(date) ? "bg-blue-900" : ""
                } ${isSelected(date) ? "border-2 border-primary" : ""} 
                ${
                  isWeekend(date) ? "text-red-400" : ""
                } focus:outline-none`}
                onClick={() => handleDateSelect(date)}
                onKeyDown={(e) => handleKeyDown(e, date)}
                aria-pressed={isSelected(date)}
                aria-label={`${date.getDate()} ${
                  months[date.getMonth()]
                } ${date.getFullYear()}`}
                role="gridcell"
              >
                {date.getDate()}
              </Button>
            ) : (
              <div key={index} className="p-4" role="gridcell" />
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Calendar;
