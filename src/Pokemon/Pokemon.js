import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Pokedex/PokemonCardStyles.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import { StyledButton } from "../MaterialUI/MaterialUI";
import "./Pokemon.css";
const Pokemon = ({
  pokedex,
  favourites,
  setFavourites,
  fighters,
  setFighters,
}) => {
  const { id } = useParams();

  const addToFavourites = (pokemon) => {
    setFavourites([...favourites, pokemon]);
  };

  const removeFromFavourites = (name) => {
    setFavourites(favourites.filter((pokemon) => pokemon.name !== name));
  };

  const addToFighters = (pokemon) => {
    setFighters([...fighters, pokemon]);
  };

  const removeFromFighters = (name) => {
    setFighters(fighters.filter((pokemon) => pokemon.name !== name));
  };

  return (
    <>
      {pokedex
        .filter((pokemon) => {
          return pokemon.name === id;
        })
        .map((pokemon, index) => {
          let { id, name, height, base_experience, weight, abilities } =
            pokemon;
          return (
            <div key={index} className="pokemon-page-container">
              <div className="pokemon-section">
                <div className="image-container">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                    alt={`${name}`}
                    className="PokeIMG"
                  />
                </div>
                <div className="info-container">
                  <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
                  <h4>Height : {height}</h4>
                  <h4>Base Experience : {base_experience}</h4>
                  <h4>Weight : {weight}</h4>
                  <h4>Ability: {abilities[0].ability.name}</h4>
                </div>
              </div>
              <div className="buttons-section">
                {favourites.map((pokemon) => pokemon.name).includes(name) ? (
                  <StyledButton
                    variant="outlined"
                    onClick={() => removeFromFavourites(name)}
                  >
                    <FavoriteIcon color="error"></FavoriteIcon>
                  </StyledButton>
                ) : (
                  <StyledButton
                    variant="outlined"
                    onClick={() => addToFavourites(pokemon)}
                  >
                    <FavoriteBorderIcon color="disabled"></FavoriteBorderIcon>
                  </StyledButton>
                )}
                {fighters.map((pokemon) => pokemon.name).includes(name) ? (
                  <StyledButton
                    variant="outlined"
                    onClick={() => removeFromFighters(name)}
                    color="error"
                  >
                    <OfflineBoltIcon />
                    Remove Pokemon from Arena!
                  </StyledButton>
                ) : fighters.length < 2 ? (
                  <StyledButton
                    variant="outlined"
                    onClick={() => addToFighters(pokemon)}
                    color="success"
                  >
                    <OfflineBoltIcon />
                    Add Pokemon to Arena!
                  </StyledButton>
                ) : (
                  <StyledButton variant="outlined" disabled>
                    <OfflineBoltIcon /> Only 2 Pokemons can fight! remove others
                  </StyledButton>
                )}
                <StyledButton variant="outlined" type="submit">
                  <Link to="/" className="link">
                    Back to Pokedex
                  </Link>
                </StyledButton>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Pokemon;
