// src/context/WalletConnect.js
import React, { useState, useEffect } from 'react';
import { initializeProvider } from './Web3Provider';

const WalletConnect = () => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [address, setAddress] = useState(null);

    const connectWallet = async () => {
        const { provider, signer } = await initializeProvider();
        setProvider(provider);
        setSigner(signer);

        if (signer) {
            const address = await signer.getAddress();
            setAddress(address);
        }
    };

    useEffect(() => {
        connectWallet();
    }, []);

    return (
        <div>
            {signer ? (
                <p>Wallet connected: {address}</p>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </div>
    );
};

export default WalletConnect;
