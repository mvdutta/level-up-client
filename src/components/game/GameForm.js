import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createGame, getGameTypes } from "../../managers/GameManager.js";

export const GameForm = () => {
  const navigate = useNavigate();
  const [gameTypes, setGameTypes] = useState([]);

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  const [currentGame, setCurrentGame] = useState({
    skill_level: "beginner",
    num_of_players: 1,
    game_title: "",
    maker: "",
    type: 1,
    creator: 1
  });

  useEffect(() => {
    // TODO: Get the game types, then set the state
    getGameTypes().then((data) => {
    setGameTypes(data)
    })
  }, []);

 
  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control"
            value={currentGame.game_title}
            onChange={(evt) => {
                const copy = {...currentGame}
                copy.game_title = evt.target.value
                setCurrentGame(copy)
            }}
          />
        </div>
      </fieldset>

      {/* TODO: create the rest of the input fields */}

      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();

          const game = {
            maker: currentGame.maker,
            game_title: currentGame.game_title,
            number_of_players: parseInt(currentGame.numberOfPlayers),
            skill_level: parseInt(currentGame.skillLevel),
            game_type: parseInt(currentGame.gameTypeId),
          };

          // Send POST request to your API
          createGame(game).then(() => navigate("/games"));
        }}
        className="btn btn-primary"
      >
        Create
      </button>
    </form>
  );
};
