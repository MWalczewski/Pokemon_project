import React from "react";
import { Box, Grid, Button } from "@mui/material";
import PokemonCard from "../Pokedex/PokemonCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./Arena.css";

const IMG_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";

const Arena = ({ fighters, setFighters }) => {
  const navigate = useNavigate();

  const CustomToast = ({ strongerPokemon }) => {
    return (
      <div>
        <div>{strongerPokemon}</div>
        <Button
          variant="outlined"
          onClick={() => {
            setFighters([]);
            navigate("/", { replace: true });
          }}
        >
          Leave Arena
        </Button>
      </div>
    );
  };

  const handleFight = () => {
    const strongerPokemon = fighters.flat().reduce((a, b) =>
      a.weight * a.base_experience > b.weight * b.base_experience ? (
        <div>
          <img
            src={`${IMG_URL}${a.id}.svg`}
            alt={`${a.name}`}
            className="PokeIMG"
          />
          <div>{`${a.name} wins`}</div>
        </div>
      ) : (
        <div>
          <img
            src={`${IMG_URL}${b.id}.svg`}
            alt={`${b.name}`}
            className="PokeIMG"
          />
          <div>{`${b.name} wins`}</div>
        </div>
      )
    );

    toast(<CustomToast strongerPokemon={strongerPokemon} />, {
      autoClose: false,
      closeButton: false,
    });
  };

  return (
    <>
      <div className="main-container">
        <Box>
          {fighters.length === 2 ? (
            <Button variant="outlined" color="error" onClick={handleFight}>
              FIGHT!
            </Button>
          ) : (
            <Button variant="outlined" disabled>
              Two Pokemons must be in the Arena to fight!
            </Button>
          )}
        </Box>
        <Grid container spacing={3} className="grid-container">
          {fighters.flat().map((pokemon, i) => {
            let { id, name, height, base_experience, weight, abilities } =
              pokemon;
            return (
              <Grid item key={i} className="grid-item">
                <PokemonCard
                  key={i}
                  id={id}
                  name={name}
                  height={height}
                  base_experience={base_experience}
                  weight={weight}
                  abilities={abilities}
                  fighters={fighters}
                  setFighters={setFighters}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
};

export default Arena;
