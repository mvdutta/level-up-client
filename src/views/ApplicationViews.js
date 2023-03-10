import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { GameList } from "../components/game/GameList";
import { EventList } from "../components/event/EventList";
import { GameForm } from "../components/game/GameForm";
import { EventForm } from "../components/event/EventForm";
import { UpdateGame } from "../components/game/UpdateGame";
import { UpdateEvent } from "../components/event/UpdateEvent";
import { HomePage } from "../components/home/HomePage";

export const ApplicationViews = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/games" element={<GameList />} />
        </Route>
        <Route element={<Authorized />}>
          <Route path="/events" element={<EventList />} />
        </Route>
        <Route element={<Authorized />}>
          <Route path="/creategame" element={<GameForm />} />
        </Route>
        <Route element={<Authorized />}>
          <Route path="/createevent" element={<EventForm />} />
        </Route>
        <Route element={<Authorized />}>
          <Route path="/updategame/:gameId" element={<UpdateGame />} />
        </Route>
        <Route element={<Authorized />}>
          <Route path="/eventupdate/:eventId" element={<UpdateEvent />} />
        </Route>
        <Route element={<Authorized />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
};
