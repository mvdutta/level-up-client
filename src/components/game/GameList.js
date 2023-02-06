import React, { useEffect, useState } from "react";
import { getGames } from "../../managers/GameManager.js";
import "./GameList.css";

export const GameList = (props) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames().then((data) => setGames(data));
  }, []);

  return (
    <div className="bg">
        <div className="games__container">
      <header className="games__header">
        <h1>Games</h1>
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
              <div className="game__type">Type of game: {game.type.label}</div>
              <div className="game__players">
                At least {game.num_of_players} player(s) needed
              </div>
              <div className="game__skillLevel">
                Skill level is: {game.skill_level}
              </div>
            </section>
          );
        })}
      </article>
      </div>
    </div>
  );
};
