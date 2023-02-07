import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGameTypes, getGameById, updateGame } from "../../managers/GameManager.js";

export const UpdateGame = () => {
    const navigate = useNavigate(); 
    const { gameId } = useParams();
    const [gameTypes, setGameTypes] = useState([]);
    const [currentGame, updateCurrentGame] = useState({
      game_title: "",
      maker: "",
      type: "",
      num_of_players: "",
      skill_level: ""
    });


useEffect(() => {
    // TODO: Get the game types, then set the state
    getGameTypes().then((data) => {
    setGameTypes(data)
    })
  }, []);


 useEffect(() => {
   getGameById(gameId).then((data) =>
     updateCurrentGame({
       game_title: data.game_title,
       maker: data.maker,
       type: data.type.id,
       num_of_players: data.num_of_players,
       skill_level: data.skill_level,
     })
   );
 }, [gameId]);

const editGame = (evt) => {
    const copy = { ...currentGame };
    copy[evt.target.id] = evt.target.value;
    updateCurrentGame(copy);
};

  const gameTypeOptions = gameTypes.map((el) => (
    <option value={el.id}>{el.label}</option>
  ));

  return (
    <div className="bg-form">
      <form className="gameForm">
        <h2 className="gameForm__title">Update Game</h2>
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
              onChange={editGame}
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
              className="form-control"
              value={currentGame.maker}
              onChange={editGame}
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
              onChange={editGame}
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
              onChange={editGame}
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
              onChange={editGame}
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
            id: gameId,
            game_title: currentGame.game_title,
            maker: currentGame.maker,
            type: parseInt(currentGame.type),
            num_of_players: parseInt(currentGame.num_of_players),
            skill_level: currentGame.skill_level,
          };
           updateGame(game).then(() => navigate("/games"));  
        }}
          className="btn btn-primary"
        >
          Update
        </button>
      </form>
    </div>
  );
};
