import React from "react";
import { Box, Container, Grid } from "@mui/material";
import PokemonCard from "../Pokedex/PokemonCard";
import "./Favourites.css";

const Favourites = ({ favourites }) => {
  return (
    <>
      <Container>
        <Box>
          {favourites.length === 0 ? (
            <div className="info-container">
              <h1>No Pokemon in Favourites yet</h1>
              <h4>Go to Pokedex and add Pokemon to Favourites!</h4>
            </div>
          ) : null}
        </Box>
        <div>
          <Grid container spacing={3} className="grid-container">
            {favourites.flat().map((pokemon, i) => {
              let { id, name, height, base_experience, weight, abilities } =
                pokemon;
              return (
                <Grid item key={i}>
                  <PokemonCard
                    key={i}
                    id={id}
                    name={name}
                    height={height}
                    base_experience={base_experience}
                    weight={weight}
                    abilities={abilities}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Favourites;
