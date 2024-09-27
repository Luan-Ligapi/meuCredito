import React from 'react';
import logo from '../assets/logo.png'; 

const Header: React.FC = () => {
  return (
    <header style={headerStyles}>
      <img src={logo} alt="MeuCreditário Logo" style={logoStyles} />
    </header>
  );
};

const headerStyles = {
    backgroundColor: 'var(--color-primary)', // Usando a cor primária definida
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  const logoStyles = {
    maxHeight: '60px',
  };
  

export default Header;
