import React from "react";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./navigationBar/navigationBar";
import Pokedex from "./Pokedex/Pokedex";
import Arena from "./Arena/Arena";
import Edit from "./Edit/Edit";
import Favourites from "./Favourites/Favourites";
import LogIn from "./logIn/LogIn";
import Register from "./Register/Register";
import Pokemon from "./Pokemon/Pokemon";
import { useState } from "react";
import { LoginContext } from "./contexts/LoginContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequiredAuth from "./RequiredAuth/RequiredAuth";

function App() {
  const [pokedex, setPokedex] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [fighters, setFighters] = useState([]);
  const [loggedUser, setLoggedUser] = useState(false);

  return (
    <>
      <LoginContext.Provider
        value={{ loggedUser, setLoggedUser }}
        classname="container"
      >
        <NavigationBar />
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <Pokedex
                pokedex={pokedex}
                setPokedex={setPokedex}
                fighters={fighters}
                setFighters={setFighters}
              />
            }
          />
          <Route
            path="/Favourites"
            element={<Favourites favourites={favourites} />}
          />
          <Route
            path="/Arena"
            element={<Arena fighters={fighters} setFighters={setFighters} />}
          />
          <Route path="/Log-in" element={<LogIn />} />
          <Route path="/Register" element={<Register />} />
          <Route
            path="/Edit"
            element={
              <RequiredAuth>
                <Edit pokedex={pokedex} />
              </RequiredAuth>
            }
          />
          <Route
            path="/:id"
            element={
              <Pokemon
                pokedex={pokedex}
                favourites={favourites}
                setFavourites={setFavourites}
                fighters={fighters}
                setFighters={setFighters}
              />
            }
          />
        </Routes>
      </LoginContext.Provider>
    </>
  );
}

export default App;
