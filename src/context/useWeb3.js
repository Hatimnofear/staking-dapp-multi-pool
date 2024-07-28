// src/context/useWeb3.js
import { useEffect, useState } from 'react';
import { initializeProvider } from './Web3Provider';

export const useWeb3 = () => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const connectWallet = async () => {
            const { provider, signer } = await initializeProvider();
            setProvider(provider);
            setSigner(signer);

            if (signer) {
                const address = await signer.getAddress();
                setAccount(address);
            }
        };
        connectWallet();
    }, []);

    return { provider, signer, account };
};
