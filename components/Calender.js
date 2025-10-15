'use client';

import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import { formatDate } from '@fullcalendar/core';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function Calendar() {
    const [currentEvents, setCurrentEvents] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectDate, setSelectDate] = useState(null);
    const [eventTitle, setEventTitle] = useState("");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedEvents = localStorage.getItem("events");
            if (savedEvents) {
                setCurrentEvents(JSON.parse(savedEvents));
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("events", JSON.stringify(currentEvents));
        }
    }, [currentEvents]);

    const handleDateClick = (selected) => {
        setSelectDate(selected);
        setIsDialogOpen(true);
    };
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleEventClick = (selected) => {
        if (window.confirm(`Are you sure you want to delete the event "${selected.event.title}"?`)) {
            selected.event.remove();
        }
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setEventTitle("");
    };

    const handleAddEvent = (e) => {
        e.preventDefault();

        if (eventTitle && selectDate) {
            const calendarApi = selectDate.view.calendar;
            calendarApi.unselect();

            const newEvent = {
                id: `${selectDate.startStr}-${eventTitle}`,
                title: eventTitle,
                start: selectDate.startStr,
                end: selectDate.endStr,
                allDay: selectDate.allDay,
            };

            calendarApi.addEvent(newEvent);
            setCurrentEvents([...currentEvents, newEvent]);
            handleCloseDialog();
        }
    };

    return (
        <div className="flex flex-col lg:flex-row w-full px-4 sm:px-8 lg:px-20 justify-center items-start gap-6 lg:gap-8 py-6">

            {/* Sidebar */}
            <div className="w-full lg:w-3/12 bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 lg:mb-0">
                <div className="py-3 text-xl sm:text-2xl font-bold text-center lg:text-left">
                    Calendar Events
                </div>

                <ul className="space-y-4 mt-4">
                    {currentEvents.length <= 0 && (
                        <div className="italic text-center text-gray-400">
                            No Events Present
                        </div>
                    )}

                    {currentEvents.length > 0 &&
                        currentEvents.map((event) => (
                            <li
                                key={event.id}
                                className="border border-gray-200 shadow px-4 py-3 rounded-md text-blue-800 text-sm sm:text-base"
                            >
                                {event.title}
                                <br />
                                <label className="text-slate-950">
                                    {formatDate(event.start, {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </label>
                            </li>
                        ))}
                </ul>
            </div>

            {/* Main Calendar */}
            <div className="w-full lg:w-9/12">
                <FullCalendar
                    height={"80vh"}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={
                        isMobile
                            ? { left: "prev,next", center: "title", right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek" }
                            : {
                                left: "prev,next today",
                                center: "title",
                                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                            }
                    }
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    select={handleDateClick}
                    eventClick={handleEventClick}
                    eventsSet={(events) =>
                        setCurrentEvents(
                            events.map((ev) => ({
                                id: ev.id,
                                title: ev.title,
                                start: ev.start,
                                end: ev.end,
                                allDay: ev.allDay,
                            }))
                        )
                    }
                    initialEvents={
                        typeof window !== "undefined"
                            ? JSON.parse(localStorage.getItem("events") || "[]")
                            : []
                    }
                />
            </div>

            {/* Dialog for Add Event */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-sm sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-lg sm:text-xl font-semibold text-center">
                            Add New Event Details
                        </DialogTitle>
                    </DialogHeader>
                    <form
                        className="flex flex-col sm:flex-row items-center justify-center sm:space-x-3 gap-3 mt-4"
                        onSubmit={handleAddEvent}
                    >
                        <input
                            type="text"
                            placeholder="Event Title"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                            required
                            className="border border-gray-300 w-full sm:w-auto flex-1 p-2 rounded-md text-base"
                        />
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded-md text-base hover:bg-green-600"
                            type="submit"
                        >
                            Add
                        </button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
