import { ethers } from 'ethers';

let provider;
let signer;
let contract;

export const initEthers = (contractAddress, contractABI) => {
  if (typeof window.ethereum !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
  } else {
    console.error("Please install MetaMask!");
  }
};

export const getContract = () => contract;
