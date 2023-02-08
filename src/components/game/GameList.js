import React, { useEffect, useState } from "react";
import { navigate, useNavigate } from "react-router-dom";
import { getGames, deleteGame } from "../../managers/GameManager.js";
import "./GameList.css";

export const GameList = (props) => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
    getGames().then((data) => setGames(data));
  }, []);
  
  
  return (
    <div className="bg">
      <div className="games__container">
        <header className="games__header">
          <h1>Level-Up Games</h1>
        </header>
        <article className="games">
          {games.map((game) => {
            return (
              <section key={`game--${game.id}`} className="game">
                <div className="game__title">
                  <h2>
                    {game.game_title} by{" "}
                    <span className="game__maker">{game.maker}</span>
                  </h2>
                </div>
                <div className="game__creator">
                  Submitted by: {game.creator.full_name}
                </div>
                <div className="game__type">
                  Type of game: {game.type.label}
                </div>
                <div className="game__players">
                  Number of players needed: {game.num_of_players}
                </div>
                <div className="game__skillLevel">
                  Skill level is: {game.skill_level}
                </div>
                <button
                  className="btn-1"
                  type="submit"
                  id={game.id}
                  onClick={() => {
                       navigate(`/updategame/${game.id}`);
                  }}
               
                >
                  Edit Game
                </button>
                <button
                className="btn-2"
                type="submit"
                id={game.id}
                onClick={()=>{
                    deleteGame(game.id)
                    navigate(0)
                }}
                >Delete Game</button>
              </section>
            );
          })}
        </article>
      </div>
    </div>
  );
};
