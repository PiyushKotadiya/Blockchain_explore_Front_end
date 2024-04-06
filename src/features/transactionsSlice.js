import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  walletBalances: [],
  walletAddresses: [],
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const {
        id,
        from,
        to,
        amount,
        transactionHash,
        blockHash,
        blockNumber,
        gasUsed,
        createdAt,
        status,
      } = action.payload;

      if (status === "SUCCESS") {
        state.walletBalances[from] =
          (state.walletBalances[from] || 0) - parseFloat(amount) - gasUsed;
        state.walletBalances[to] =
          (state.walletBalances[to] || 0) + parseFloat(amount);
      } else if (status === "FAILED") {
        state.walletBalances[from] =
          (state.walletBalances[from] || 0) - gasUsed;
      }

      state.transactions.push({
        id,
        from,
        to,
        amount,
        transactionHash,
        blockHash,
        blockNumber,
        gasUsed,
        createdAt,
        status,
      });
    },
    setWalletAddresses: (state, action) => {
      state.walletAddresses = action.payload;

      const initialBalances = {};
      for (const address of action.payload) {
        initialBalances[address] = 1000.0;
      }
      state.walletBalances = initialBalances;
    },
  },
});

export const { addTransaction, setWalletAddresses } = transactionsSlice.actions;

export default transactionsSlice.reducer;
