import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Provider';

const Header = () => {
  const { provider, signer } = useWeb3();
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (provider) {
      try {
        await provider.send('eth_requestAccounts', []);
        const accounts = await provider.listAccounts();
        const account = accounts.length > 0 ? accounts[0] : null;
        setAccount(account);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      console.error('No provider available');
    }
  };

  return (
    <header>
      <h1>Staking DApp</h1>
      <button onClick={connectWallet}>
        {account ? `Connected: ${account}` : 'Connect Wallet'}
      </button>
    </header>
  );
};

export default Header;
