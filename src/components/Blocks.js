import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { useSelector } from "react-redux";
import BlockDetails from "./BlockDetails";

function Blocks() {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    formControl: {
      marginLeft: "20%",
      marginTop:"3%",
      minWidth: 120,
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1),
      [theme.breakpoints.up("sm")]: {
        minWidth: 240,
      },
      [theme.breakpoints.up("md")]: {
        minWidth: "80%",
      },
      [theme.breakpoints.up("lg")]: {
        minWidth: "60%",
      },
    },
    label: {
      color: "rgba(0, 0, 0, 0.54)",
    },
  }));

  const transactions= useSelector((state) => state.transactions.transactions);

  const walletAddresses = useSelector(
    (state) => state.transactions.walletAddresses
  );
  const walletBalances = useSelector(
    (state) => state.transactions.walletBalances
  );


  const [selectedFrom, setSelectedFrom] = useState("");
  const filteredBlocks = selectedFrom
    ? Object.entries(walletBalances).filter(([key, value]) => key === selectedFrom)
    : Object.entries(walletBalances);

  const classes = useStyles();

  return (
    <div>
      <TextField
        id="from-select"
        select
        label="Select Address"
        value={selectedFrom}
        onChange={(e) => setSelectedFrom(e.target.value)}
        className={classes.formControl}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        margin="normal"
      >
        <MenuItem value="">All</MenuItem>
        {walletAddresses.map((transaction) => (
          <MenuItem key={transaction} value={transaction}>
            {transaction}
          </MenuItem>
        ))}
      </TextField>
      <BlockDetails filteredBlocks={filteredBlocks} transactions={transactions} />
    </div>
  );
}

export default Blocks;
