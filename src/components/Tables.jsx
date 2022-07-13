import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const Tables = () => {
  const [res, setRes] = useState([]);

   const fetchdata = async () => {
     var requestOptions = {
       method: "POST"
     
     };
     const data = await fetch(
       "https://demo1779595.mockable.io/companies",
       requestOptions
     ); 
     
     const json = await data.json();
     const rows = await Object.keys(json);
     setRes(json[rows[0]]);
     
    
   };
   useEffect(() => {
     fetchdata();

     // eslint-disable-next-line react-hooks/exhaustive-deps
   },[]);

  

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Company Logo</StyledTableCell>
            <StyledTableCell align="center">Compnay</StyledTableCell>
            <StyledTableCell align="center">Roles</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {res.map((item) => (
            <StyledTableRow key={item.name}>
              <StyledTableCell component="th" scope="row" align="center">
                {item.name}
              </StyledTableCell>
              <StyledTableCell align="center">
                <img
                  src={item.companyImageURL}
                  alt="Logo"
                  style={{ height: "100px", width: "100px" }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">{item.company}</StyledTableCell>
              <StyledTableCell align="center">{item.role}</StyledTableCell>
              <StyledTableCell align="center">{item.status}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
