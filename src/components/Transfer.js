import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Alert,
} from "@mui/material";
import Receipt from "./Receipt";
import { useSelector } from "react-redux";
import { addTransaction } from "../features/transactionsSlice";
import { useDispatch } from "react-redux";
import "./Transfer.css"; 
import { faker } from "@faker-js/faker/locale/af_ZA";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from 'uuid';

function Transfer() {
  
  const [amount, setAmount] = useState("");
  const [selectedToAddress, setSelectedToAddress] = useState("");
  const [selectedFromAddress, setSelectedFromAddress] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [showSameAddressAlert, setShowSameAddressAlert] = useState(false);
  const walletAddresses = useSelector(
    (state) => state.transactions.walletAddresses
  );
  const walletBalances = useSelector(
    (state) => state.transactions.walletBalances
  );
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const gasPrice = Math.floor(Math.random() * 200) + 1;
    const gasUsed = 21000;
    const transactionFee = gasPrice * gasUsed * 1e-9;

    if (
      amount.trim() === "" &&
      selectedToAddress.trim() === "" &&
      selectedFromAddress.trim() === ""
    ) {
      setAlertMessage("Please fill in all fields.");
      return;
    }
    if (amount.trim() === "") {
      setAlertMessage("Please fill in the Amount field.");
      return;
    }
    if (selectedToAddress.trim() === "") {
      setAlertMessage("Please select a To Address.");
      return;
    }
    if (selectedFromAddress.trim() === "") {
      setAlertMessage("Please select a From Address.");
      return;
    }
    if (selectedToAddress === selectedFromAddress) {
      setShowSameAddressAlert(true);
      return;
    }

    const fromAddressBalance = walletBalances[selectedFromAddress];
    if (fromAddressBalance < parseFloat(amount)) {
      setAlertMessage("Insufficient balance in the From Address.");
      return;
    }

    const currentTimestamp = new Date().toISOString();

    const newReceipt = {
      id:uuidv4(),
      amount: amount,
      from: selectedFromAddress,
      to: selectedToAddress,
      transactionHash: CryptoJS.SHA256(faker.string.uuid()).toString(),
      blockHash: CryptoJS.SHA256(faker.string.uuid()).toString(),
      blockNumber: faker.number.int(),
      gasUsed: transactionFee,
      createdAt: currentTimestamp,
      status: "SUCCESS",
    };
    dispatch(addTransaction(newReceipt));

    setReceipt(newReceipt);
    setShowReceipt(true);
    setAlertMessage("");
    setShowSameAddressAlert(false);
    setAmount("");
    setSelectedToAddress("");
    setSelectedFromAddress("");
  };

  const handleAddressChange = () => {
    setShowSameAddressAlert(false); 
  };

  return (
    <div className="center-container">
      <Grid container display={"flex"} justifyContent={"center"} spacing={4}>
        <Grid item spacing={2} xs={9} lg={9} sm={9}>
          <TextField
            fullWidth
            label="Amount"
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Grid>
        <Grid item xs={9} lg={9} sm={9}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="select-from-address-label">From Address</InputLabel>
            <Select
              labelId="select-from-address-label"
              id="select-from-address"
              value={selectedFromAddress}
              onChange={(e) => setSelectedFromAddress(e.target.value)}
              label="From Address"
              onOpen={handleAddressChange} 
            >
              <MenuItem value="">
                <em>Select Address</em>
              </MenuItem>
              {walletAddresses.map((transaction) => (
                <MenuItem key={transaction} value={transaction}>
                  {transaction}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={9} lg={9} sm={9}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="select-to-address-label">To Address</InputLabel>
            <Select
              labelId="select-to-address-label"
              id="select-to-address"
              value={selectedToAddress}
              onChange={(e) => setSelectedToAddress(e.target.value)}
              label="To Address"
              onOpen={handleAddressChange} 
            >
              <MenuItem value="">
                <em>Select Address</em>
              </MenuItem>
              {walletAddresses.map((transaction) => (
                <MenuItem key={transaction} value={transaction}>
                  {transaction}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid container className="button-container">
          <Grid item xs={9} lg={9} sm={9}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className="submit-button"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        {alertMessage && (
          <Grid item xs={12} sm={6}>
            <Alert severity="warning">{alertMessage}</Alert>
          </Grid>
        )}
        {showSameAddressAlert && (
          <Grid item xs={12} sm={6}>
            <Alert severity="error">
              From Address and To Address cannot be the same.
            </Alert>
          </Grid>
        )}
        {showReceipt && (
          <Grid item xs={12}>
            <Receipt receipt={receipt} />
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default Transfer;
