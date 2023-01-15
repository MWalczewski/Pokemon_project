import { useState, useEffect, useRef } from "react";
import PokemonCard from "./PokemonCard";
import Paginate from "./Pagination";
import { Box, Container, Grid } from "@mui/material";
import { StyledTextField } from "../MaterialUI/MaterialUI";
import "./Pokedex.css";

const Pokedex = ({ pokedex, setPokedex, fighters, setFighters }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=151";
  const DETAILS_URL = "https://pokeapi.co/api/v2/pokemon/";
  const LOCAL_URL = "http://localhost:8000/pokemons";

  const effectRan = useRef(false);

  // fetch pokemon names
  // useEffect(() => {
  //   if (effectRan.current === false) {
  //     fetch(BASE_URL)
  //       .then((response) => response.json())
  //       .then((allPokemons) => {
  //         setPokemonList(allPokemons.results.map((pokemon) => pokemon.name));
  //       })
  //       .then((effectRan.current = true));
  //   }
  // }, []);

  // fetch local pokemons
  // useEffect(() => {
  //   fetch(`${LOCAL_URL}`)
  //     .then((responseLocal) => responseLocal.json())
  //     .then((dataLocal) => {
  //       setLocalPokemons(dataLocal);
  //     });
  // }, []);

  useEffect(() => {
    if (effectRan.current === false) {
      Promise.all([fetch(BASE_URL), fetch(LOCAL_URL)])
        .then(([responseBASEURL, responseLOCALURL]) =>
          Promise.all([responseBASEURL.json(), responseLOCALURL.json()])
        )
        .then(([dataBASEURL, dataLOCALURL]) => {
          setPokemonList(dataBASEURL.results.map((pokemon) => pokemon.name));
          setPokedex(dataLOCALURL);
        })
        .then((effectRan.current = true));
    }
  }, []);

  //  fetch API pokemons
  useEffect(() => {
    pokemonList.forEach(function (pokemonName) {
      fetch(`${DETAILS_URL}${pokemonName}`)
        .then((response) => response.json())
        .then((apiPOKE) => {
          setPokedex((prev) => [...prev, apiPOKE]);
        });
    });
    setLoading(false);
  }, [pokemonList]);

  pokedex.sort((a, b) => a.id - b.id);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const indexOfLastPokemon = currentPage * 15;
  const indexOfFirstPokemon = indexOfLastPokemon - 15;
  const currentPokemons = pokedex.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const changePage = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Container>
        <Box className="navi-container">
          <StyledTextField
            onChange={handleSearchChange}
            placeholder="Search Pokemon"
          />
          <Paginate
            totalPokemons={pokemonList.length}
            page={currentPage}
            changePage={changePage}
            className="pagination"
          />
        </Box>
        <div>
          {filter === "" ? (
            <>
              <Grid container spacing={3} className="grid-container">
                {loading ? <h1> LOADING... </h1> : null}
                {currentPokemons.map((pokemon, index) => {
                  let { id, name, height, base_experience, weight, abilities } =
                    pokemon;
                  return (
                    <Grid item key={index}>
                      <PokemonCard
                        key={index}
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
            </>
          ) : (
            <Grid container spacing={3} className="grid-container">
              {loading ? <h1> LOADING... </h1> : null}
              {pokedex
                .filter((pokemon) => {
                  return pokemon.name.includes(filter);
                })
                .map((pokemon, index) => {
                  let { id, name, height, base_experience, weight, abilities } =
                    pokemon;
                  return (
                    <Grid item key={index}>
                      <PokemonCard
                        key={index}
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
          )}
        </div>
      </Container>
    </>
  );
};

export default Pokedex;
