// src/context/Web3Provider.js
import { ethers } from 'ethers';

export async function initializeProvider() {
    console.log("Initializing provider...");
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            console.log("Account connected: ", await signer.getAddress());
            return { provider, signer };
        } catch (error) {
            console.error("Error initializing provider: ", error);
            return { provider: null, signer: null };
        }
    } else {
        console.log("Please install MetaMask!");
        return { provider: null, signer: null };
    }
}
