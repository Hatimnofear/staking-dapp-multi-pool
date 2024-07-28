import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Provider';
import { getStakingContract, getTokenContract } from '../utils/contract';
import { ethers } from 'ethers';

const Pool = ({ pool }) => {
  const { provider, signer, account } = useWeb3();
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState('');
  const [tokenBalance, setTokenBalance] = useState('');

  useEffect(() => {
    if (signer) {
      getTokenBalance();
    }
  }, [signer]);

  const stake = async () => {
    if (!signer) return alert('Signer is not available');

    try {
      const tokenContract = getTokenContract(signer);
      const stakingContract = getStakingContract(signer);

      const amountInWei = ethers.utils.parseEther(amount);

      const approveTx = await tokenContract.approve(stakingContract.address, amountInWei);
      await approveTx.wait();

      const stakeTx = await stakingContract.stake(pool.id, amountInWei);
      await stakeTx.wait();
      alert('Staked successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const withdraw = async () => {
    if (!signer) return alert('Signer is not available');

    try {
      const stakingContract = getStakingContract(signer);
      const amountInWei = ethers.utils.parseEther(amount);

      const withdrawTx = await stakingContract.withdraw(pool.id, amountInWei);
      await withdrawTx.wait();
      alert('Withdrawn successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const getBalance = async () => {
    if (!signer) return alert('Signer is not available');

    try {
      const stakingContract = getStakingContract(signer);
      const balance = await stakingContract.balanceOf(pool.id);
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error(error);
    }
  };

  const getTokenBalance = async () => {
    if (!signer) return alert('Signer is not available');

    try {
      const tokenContract = getTokenContract(signer);
      const balance = await tokenContract.balanceOf(await signer.getAddress());
      setTokenBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>{pool.name}</h3>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={stake}>Stake</button>
      <button onClick={withdraw}>Withdraw</button>
      <button onClick={getBalance}>Get Balance</button>
      <button onClick={getTokenBalance}>Get Token Balance</button>
      {balance && <p>Staking Balance: {balance}</p>}
      {tokenBalance && <p>Token Balance: {tokenBalance}</p>}
    </div>
  );
};

export default Pool;
