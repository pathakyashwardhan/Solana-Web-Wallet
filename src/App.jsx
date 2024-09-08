import React from "react";

import SolanaWallet from "./components/SolanaWallet";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Solana Web Wallet</h1>
      <div>
        <SolanaWallet />
      </div>
    </div>
  );
}

export default App;
