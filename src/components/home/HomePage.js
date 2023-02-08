import React from 'react'
import "./HomePage.css";


export const HomePage = () => {
  return (<>
    <h1 className="home-header">Welcome to Level Up Games!</h1>
    <div className="home-container">
    <div className="img-container">
      <img className="cat-gif" src="https://media.giphy.com/media/l4hLwjIEhWGWOA3ny/giphy.gif" alt="catGameGif"/>
    </div>
    </div>
    </>
  );
}
