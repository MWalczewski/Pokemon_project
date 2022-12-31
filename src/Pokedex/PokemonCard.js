import * as S from "./PokedexStyles";
import { Card, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./PokemonCardStyles.css";
import { useLocation } from "react-router-dom";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";

const IMG_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";

const PokemonCard = ({
  id,
  name,
  height,
  base_experience,
  weight,
  abilities,
  fighters,
  setFighters,
}) => {
  const location = useLocation();

  const removeFromFighters = (name) => {
    setFighters(fighters.filter((pokemon) => pokemon.name !== name));
  };

  return (
    <Card className="pokemonCard" elevation={3}>
      {location.pathname === "/Arena" ? (
        <Button
          variant="outlined"
          color="error"
          onClick={() => removeFromFighters(name)}
        >
          <OfflineBoltIcon color="error"></OfflineBoltIcon>Remove Pokemon from
          Arena!
        </Button>
      ) : null}
      <br />
      {location.pathname === "/Edit" ? (
        <Button
          variant="outlined"
          color="warning"
          // onClick={}
        >
          <OfflineBoltIcon color="warning"></OfflineBoltIcon>Edit Pokemon Stats
        </Button>
      ) : null}

      <Link to={`/${name}`} className="link">
        <CardContent>
          <br />
          <img
            src={`${IMG_URL}${id}.svg`}
            alt={`${name}`}
            className="PokeIMG"
          />
          <S.PokemonName>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </S.PokemonName>
          <S.Table>
            <S.TableRow>
              <S.InfoWrapper>
                <S.TableHeader>Height</S.TableHeader>
                <S.TableData>{height}</S.TableData>
              </S.InfoWrapper>
              <S.InfoWrapper>
                <S.TableHeader>Base Experience</S.TableHeader>
                <S.TableData>{base_experience}</S.TableData>
              </S.InfoWrapper>
            </S.TableRow>
            <S.TableRow>
              <S.InfoWrapper>
                <S.TableHeader>Weight</S.TableHeader>
                <S.TableData>{weight}</S.TableData>
              </S.InfoWrapper>
              <S.InfoWrapper>
                <S.TableHeader>Ability</S.TableHeader>
                <S.TableData>{abilities[0].ability.name}</S.TableData>
              </S.InfoWrapper>
            </S.TableRow>
          </S.Table>
        </CardContent>
      </Link>
    </Card>
  );
};

export default PokemonCard;
