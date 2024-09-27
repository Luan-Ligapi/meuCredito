import React from 'react';

// Defina o tipo das props que o componente espera
type CalculateDebtButtonProps = {
  onCalculate: () => void;  // Define que onCalculate é uma função que não recebe parâmetros e não retorna nada
};

const CalculateDebtButton: React.FC<CalculateDebtButtonProps> = ({ onCalculate }) => {
  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <button style={buttonStyles} onClick={onCalculate}>
        Calcular Dívida
      </button>
    </div>
  );
};

const buttonStyles = {
  padding: '10px 20px',
  backgroundColor: 'var(--color-primary)', // Usando a cor primária definida
  color: 'var(--color-white)', // Usando a cor branca definida
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: 'var(--font-small)', // Usando a variável de tamanho de fonte
  fontWeight: 'bold'
};


export default CalculateDebtButton;
