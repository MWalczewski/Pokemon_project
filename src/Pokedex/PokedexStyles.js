import styled from "styled-components";

const PokedexPage = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  box-sizing: border-box;
  padding: 15px;
  width: 100%;
`;

const PokemonCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 30%;
  padding: 15px;
  border: 2px solid orange;
  border-radius: 5px;
`;

const PokemonName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 700;
  font-size: 150%;
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  //   border: 2px solid green;
`;

const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  //   border: 2px solid blue;
  width: 100%;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  width: 50%;
  //   border: 2px solid yellow;
`;

const TableHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: max-content;
  font-weight: 600;
  font-size: 90%;
  //   border: 2px solid orange;
`;

const TableData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 400;
  font-size: 70%;

  //   border: 2px solid violet;
`;

export {
  PokedexPage,
  PokemonCard,
  PokemonName,
  Table,
  TableHeader,
  TableRow,
  InfoWrapper,
  TableData,
};
