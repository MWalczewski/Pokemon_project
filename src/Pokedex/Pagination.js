import React from "react";
import { Pagination, Stack } from "@mui/material";
import { StyledPaginationItem } from "../MaterialUI/MaterialUI";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Paginate = ({ totalPokemons, changePage, page }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokemons / 15); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Stack>
        <Pagination
          count={pageNumbers.length}
          page={page}
          onChange={changePage}
          variant="outlined"
          shape="rounded"
          renderItem={(item) => (
            <StyledPaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>
    </>
  );
};

export default Paginate;
