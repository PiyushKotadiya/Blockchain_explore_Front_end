import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Transactions from "./components/Transactions";
import Transfer from "./components/Transfer";
import Blocks from "./components/Blocks";
import Header from "./components/Header";
import { faker } from "@faker-js/faker";
import configureStore from './app/store'
import { setWalletAddresses } from "./features/transactionsSlice";

function App() {

  useEffect(() => {
    const generatedAddresses = [];
    for (let i = 0; i < 10; i++) {
      generatedAddresses.push(faker.finance.ethereumAddress());
    }

    configureStore.dispatch(setWalletAddresses(generatedAddresses));
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Transactions />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/blocks" element={<Blocks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;