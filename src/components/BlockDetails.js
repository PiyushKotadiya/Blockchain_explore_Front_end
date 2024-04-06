import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTableCell-root": {
      padding: theme.spacing(1),
      borderBottom: "none",
    },
    "& .MuiTableHead-root": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    "& .MuiTableRow-root": {
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
  table: {
    marginTop:"40px",
    minWidth: 650,
  },
  tableCell: {
    padding: "5px",
    borderBottom: "none",
  },
  tableHeadCell: {
    padding: "5px",
    borderBottom: "none",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const BlockDetails = ({
  filteredBlocks
}) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeadCell}>Address</TableCell>
            <TableCell className={classes.tableHeadCell}>Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredBlocks.map(([address, balance]) => (
            <TableRow key={address}>
              <TableCell className={classes.tableCell}>{address}</TableCell>
              <TableCell className={classes.tableCell}>{balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BlockDetails;