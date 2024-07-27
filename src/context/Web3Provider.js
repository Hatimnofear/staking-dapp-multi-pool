import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const initializeProvider = async () => {
      if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const accounts = await provider.listAccounts();
          const account = accounts.length > 0 ? accounts[0] : null;

          setProvider(provider);
          setSigner(signer);
          setAccount(account);
        } catch (error) {
          console.error("Error initializing provider:", error);
        }
      } else {
        console.error("Metamask is not installed");
      }
    };

    initializeProvider();
  }, []);

  return (
    <Web3Context.Provider value={{ provider, signer, account }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  return useContext(Web3Context);
};
