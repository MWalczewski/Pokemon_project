import { Button, TextField, PaginationItem } from "@mui/material";
import { styled } from "@mui/system";

const StyledButton = styled(Button)`
  background-color: #f7786b;
`;

const StyledTextField = styled(TextField)`
  border: 3px solid #f7786b;
  border-radius: 10px;
`;

const StyledPaginationItem = styled(PaginationItem)`
  background-color: #f7786b;
`;

export { StyledButton, StyledTextField, StyledPaginationItem };
