import React, { useState } from "react";
import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";


function SolanaWallet() {
  const [mnemonic, setMnemonic] = useState("");
  let [numberOfWallets, setNumberOfWallets] = useState(0);
  const [walletAddress, setWalletAddress] = useState([]);

  function generateMnemonics() {
    const mn = generateMnemonic();
    setMnemonic(mn);
  }

  function createSolanaWallet() {
    setNumberOfWallets(numberOfWallets + 1);
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${numberOfWallets}'/0'`; // This is the derivation path
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
    setWalletAddress((prev) => [...prev, publicKey]);
  }
  return (
    <div>
      <h3>Solana Wallet</h3>
      <button onClick={generateMnemonics}>Generate Mnemonic</button>

      <button onClick={createSolanaWallet}>Create Solana Wallet</button>
      <p>Mnemonic: {mnemonic}</p>
      <div>
        {walletAddress.map((wallets, index) => (
          <div key={index}>{wallets}</div>
        ))}
      </div>
    </div>
  );
}

export default SolanaWallet;
