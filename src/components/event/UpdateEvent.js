import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getGames,
  getEventById,
  updateEvent,
} from "../../managers/EventManager.js";

export const UpdateEvent = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [games, setGames] = useState([]);
  const [currentEvent, updateCurrentEvent] = useState({
    game: "",
    event_date: "",
    event_time: "",
    description: "",
  });

  useEffect(() => {
    getGames().then((data) => {
      setGames(data);
    });
  }, []);

  useEffect(() => {
    getEventById(eventId).then((data) =>
      updateCurrentEvent({
        game: data.game,
        event_date: data.event_date,
        event_time: data.event_time,
        description: data.description,
      })
    );
  }, [eventId]);

  const editEvent = (evt) => {
    const copy = { ...currentEvent };
    copy[evt.target.id] = evt.target.value;
    updateCurrentEvent(copy);
  };

  const gameOptions = games.map((el) => (
    <option value={el.id}>{el.game_title}</option>
  ));

  const convertTime = (tm) => {
    let [h, m] = tm.split(":"); //splits out the hour and minute
    return h + ":" + m + ":00";
  };

  return (
    <div className="bg-form">
      <form className="gameForm">
        <h2 className="gameForm__title">Update Event</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="title">Game: </label>
            <select
              id="game"
              type="select"
              required
              className="form-control"
              value={currentEvent.game.id}
              onChange={editEvent}
            >
              <option value="0">Select a game</option>
              {gameOptions}
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="description">Event Description: </label>
            <input
              id="description"
              type="text"
              required
              className="form-control"
              value={currentEvent.description}
              onChange={editEvent}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="event_date">Event Date: </label>
            <input
              id="event_date"
              type="date"
              onChange={editEvent}
              value={currentEvent.event_date}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="event_date">Event Time: </label>
            <input
              id="event_time"
              type="time"
              onChange={editEvent}
              value={currentEvent.event_time}
            />
          </div>
        </fieldset>
        <button
          type="submit"
          onClick={(evt) => {
            // Prevent form from being submitted
            evt.preventDefault();

            const event = {
              id: eventId,
              game: parseInt(currentEvent.game.id),
              event_date: currentEvent.event_date,
              event_time: convertTime(currentEvent.event_time),
              description: currentEvent.description,
            };
            // Send POST request to your API
            updateEvent(event).then(() => navigate("/events"));
          }}
          className="btn btn-primary"
        >
          Update
        </button>
      </form>
    </div>
  );
};

