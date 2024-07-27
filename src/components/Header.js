import React from 'react';

const Header = ({ connectWallet }) => {
  return (
    <header>
      <button onClick={connectWallet}>Connect Wallet</button>
    </header>
  );
};

export default Header;
