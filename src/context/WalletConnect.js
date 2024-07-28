// WalletConnect.js
import React, { useEffect, useState } from 'react';
import { initializeProvider } from './Web3Provider';

const WalletConnect = () => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);

    useEffect(() => {
        async function connect() {
            const { provider, signer } = await initializeProvider();
            setProvider(provider);
            setSigner(signer);
        }
        connect();
    }, []);

    return (
        <div>
            {signer ? (
                <p>Wallet connected: {signer.getAddress()}</p>
            ) : (
                <button onClick={initializeProvider}>Connect Wallet</button>
            )}
        </div>
    );
};

export default WalletConnect;
