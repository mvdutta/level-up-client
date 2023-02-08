import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createGame, getGameTypes } from "../../managers/GameManager.js";
import "./GameForm.css";

export const GameForm = () => {
  const navigate = useNavigate();
  const [gameTypes, setGameTypes] = useState([]);
 
  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  const [currentGame, setCurrentGame] = useState({
    skill_level: "",
    num_of_players: "",
    game_title: "",
    maker: "",
    type: 0,
  });

  useEffect(() => {
    // TODO: Get the game types, then set the state
    getGameTypes().then((data) => {
    setGameTypes(data)
    })
  }, []);
  
  const changeGameState = (evt) => {
    const copy = {...currentGame}
                copy[evt.target.id] = evt.target.value
                setCurrentGame(copy)
  };

  const gameTypeOptions = gameTypes.map(el => <option value = {el.id}>{el.label}</option>)
 
  return (
    <div className="bg-form">
      <form className="gameForm">
        <h2 className="gameForm__title">Register New Game</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="title">Title: </label>
            <input
              id="game_title"
              type="text"
              name="title"
              required
              autoFocus
              className="form-control"
              value={currentGame.game_title}
              onChange={changeGameState}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="maker">Game Maker: </label>
            <input
              id="maker"
              type="text"
              required
              autoFocus
              className="form-control"
              value={currentGame.maker}
              onChange={changeGameState}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="skill_level">Skill Level: </label>
            <select
              id="skill_level"
              type="select"
              required
              className="form-control"
              value={currentGame.skill_level}
              onChange={changeGameState}
            >
              <option value="0">Select a skill level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="num_of_players">Number of Players: </label>
            <input
              type="number"
              id="num_of_players"
              required
              min="1"
              className="form-control"
              value={currentGame.num_of_players}
              onChange={changeGameState}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="type">Game Type: </label>
            <select
              id="type"
              type="select"
              required
              className="form-control"
              value={currentGame.type}
              onChange={changeGameState}
            >
              <option value="0">Select type of game</option>
              {gameTypeOptions}
            </select>
          </div>
        </fieldset>

        <button
          type="submit"
          onClick={(evt) => {
            // Prevent form from being submitted
            evt.preventDefault();

            const game = {
              maker: currentGame.maker,
              game_title: currentGame.game_title,
              num_of_players: parseInt(currentGame.num_of_players),
              skill_level: currentGame.skill_level,
              type: parseInt(currentGame.type),
            };

            // Send POST request to your API
            createGame(game).then(() => navigate("/games"));
          }}
          className="btn btn-primary"
        >
          Create
        </button>
      </form>
    </div>
  );
};
