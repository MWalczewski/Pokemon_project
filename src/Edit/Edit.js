import React, { useEffect, useContext, useState } from "react";
import { LoginContext } from "../contexts/LoginContext";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import EditForm from "./EditForm";
import "./Edit.css";

const Edit = (pokedex) => {
  const [pokemonNames, setPokemonNames] = useState([]);
  const { loggedUser } = useContext(LoginContext);
  const [pokemonToEdit, setPokemonToEdit] = useState("");
  const [pokemonData, setPokemonData] = useState({
    name: "Pokemon Name",
    base_experience: "Pokemon's base EXP",
    weight: "Pokemon's weight",
    height: "Pokemon's height",
  });

  const URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((allPokemons) => {
        setPokemonNames(allPokemons.results.map((pokemon) => pokemon.name));
      });
  }, []);

  const handleChange = (event) => {
    setPokemonToEdit(event.target.value);
  };
  // = useFetch("http://localhost:8000/blogs?_sort=likes&_order=desc") - sortowanie po likach od najwiekszej ilosci do najmniejszej;

  const DETAILS_URL = "https://pokeapi.co/api/v2/pokemon/";

  useEffect(() => {
    fetch(`${DETAILS_URL}${pokemonToEdit}`)
      .then((response) => response.json())
      .then((pokemon) => setPokemonData(pokemon));
  }, [pokemonToEdit]);

  return (
    <>
      <div className="main-container">
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel
            id="select-pokemon-label
            "
          >
            Choose Pokemon to Edit
          </InputLabel>
          <Select
            labelId="select-pokemon-label"
            id="select-pokemon"
            value={pokemonToEdit}
            label="Pokemon"
            onChange={handleChange}
          >
            {pokemonNames.map((poke, i) => (
              <MenuItem value={poke} key={i}>
                {poke}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {pokemonToEdit.length > 0 ? (
          <EditForm pokemon={pokemonData} setPokemonToEdit={setPokemonToEdit} />
        ) : null}
      </div>
    </>
  );
};

export default Edit;
