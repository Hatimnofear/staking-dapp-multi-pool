import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Pool from '../components/Pool';
import { pools } from '../utils/pools';

const Home = () => {
  const [walletConnected, setWalletConnected] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletConnected(true);
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      alert("Please install Metamask");
    }
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      connectWallet();
    }
  }, []);

  return (
    <div>
      <Header connectWallet={connectWallet} />
      {walletConnected ? (
        <div>
          {pools.map((pool) => (
            <Pool key={pool.id} pool={pool} />
          ))}
        </div>
      ) : (
        <p>Please connect your wallet</p>
      )}
    </div>
  );
};

export default Home;
