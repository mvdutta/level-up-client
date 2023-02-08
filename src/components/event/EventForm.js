import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createEvent, getGames
} from "../../managers/EventManager.js";
import "../game/GameForm.css"

export const EventForm = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  const [currentEvent, setCurrentEvent] = useState({
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

  const changeEventState = (evt) => {
    const copy = { ...currentEvent };
    copy[evt.target.id] = evt.target.value;
    setCurrentEvent(copy);
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
        <h2 className="gameForm__title">Register New Event</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="title">Game: </label>
            <select
              id="game"
              type="select"
              required
              className="form-control"
              value={currentEvent.game.game_title}
              onChange={changeEventState}
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
              onChange={changeEventState}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="event_date">Event Date: </label>
            <input
              id="event_date"
              type="date"
              onChange={changeEventState}
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
              onChange={changeEventState}
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
              game: parseInt(currentEvent.game),
              event_date: currentEvent.event_date,
              event_time: convertTime(currentEvent.event_time),
              description: currentEvent.description,
            };

            // Send POST request to your API
            createEvent(event).then(() => navigate("/events"));
          }}
          className="btn btn-primary"
        >
          Create
        </button>
      </form>
    </div>
  );
};
