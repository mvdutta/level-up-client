import React, { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "../../managers/EventManager.js";
import { navigate, useNavigate } from "react-router-dom";
import "./EventList.css";


export const EventList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const formatTime = (dateStr) => {
    let d = new Date(dateStr);
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours===0 ? 12 :hours  // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes.toString() : minutes;
    const strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  const formatDate = (dateStr) => {
    let d = new Date(dateStr);
    let year = d.toLocaleString("default", { year: "numeric" });
    let month = d.toLocaleString("default", { month: "2-digit" });
    let day = d.toLocaleString("default", { day: "2-digit" });
    // put them into an array and join them by dashes
    return [month, day, year].join("-");
  };

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);
  

  return (
    <div className="container">
        <div className="events__container">
      <header className="events__header">
        <h1>Level-Up Events</h1>
      </header>
      <article className="events">
        {events.map((event) => {
              let dt = event.event_date;
              let tm = event.event_time;
              let dateTimeStr = dt + " " + tm;
              const formattedDate = formatDate(dateTimeStr);
              const formattedTime = formatTime(dateTimeStr);
          return (
            <section className="event" key={`event--${event.id}`}>
              <div className="event__game">
                <h2>{event.game.game_title}</h2>
              </div>
              <div className="event__organizer">
                Organized By: {event.organizer.full_name}
              </div>
              <div className="event__date">
                Event will be held on: {formattedDate} at {formattedTime}
              </div>
              <div className="event__description">
                Description: {event.description}
              </div>
              <button
                className="btn-1"
                type="submit"
                id={event.id}
                onClick={() => {
                  navigate(`/eventupdate/${event.id}`);
                }}
              >
                Edit Event
              </button>
              <button
                className="btn-2"
                type="submit"
                id={event.id}
                onClick={() => {
                  deleteEvent(event.id);
                  navigate(0);
                }}
              >
                Delete Event
              </button>
            </section>
          );
        })}
      </article>
      </div>
   </div>
  );
};
