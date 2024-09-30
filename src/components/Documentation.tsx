import React from 'react';

const DocumentationHeader = () => {
  return (
    <div style={documentationStyles}>
      <h1 style={headerStyles}>Documentação do Projeto - Desafio MeuCrediário</h1>
      <p style={textStyles}>
        Este sistema é destinado à realização do desafio do processo seletivo da empresa MeuCrediário,
        com o intuito de comprovar conhecimento em fullstack.
      </p>
      <p style={textStyles}>
        Funcionalidades principais incluem:
      </p>
      <ul style={listStyles}>
        <li>Registrar usuário</li>
        <li>Login</li>
        <li>Listar contratos</li>
        <li>Calcular a maior dívida acumulada dado um conjunto de contratos</li>
      </ul>
      <p style={textStyles}>
        Tecnologias utilizadas:
      </p>
      <ul style={listStyles}>
        <li>Frontend: React</li>
        <li>Backend: Node.js, Express</li>
        <li>Banco de Dados: MongoDB</li>
        <li>Containerização: Docker</li>
      </ul>
      <p style={textStyles}>
        O público-alvo deste sistema são gerenciadores de contratos, líderes técnicos ou tech recruiters.
      </p>
      <p style={textStyles}>
        Features:
      </p>
      <ul style={listStyles}>
        <li>Ao carregar a página, rotas de autenticação e listagem de contratos são usadas</li>
        <li>Ao clicar no botão "calcular dívida", aparece o maior valor em aberto encontrado no arquivo JSON fornecido</li>
        <li>Na parte de baixo tem a listagem dos contratos onde é possível:</li>
        <ul>
          <li>Listar em ordem crescente e decrescente baseados nas colunas</li>
          <li>Filtrar contratos</li>
          <li>Abrir detalhes das parcelas</li>
        </ul>
      </ul>
    </div>
  );
};

const documentationStyles = {
  backgroundColor: 'var(--color-white)', // Usando a cor branca definida
  padding: '20px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  marginBottom: '20px',
};

const headerStyles = {
  color: 'var(--color-primary)', // Usando a cor primária definida
};

const textStyles = {
  fontSize: 'var(--font-body)', // Usando a variável de tamanho de fonte
  lineHeight: '1.5',
};

const listStyles = {
  paddingLeft: '20px', // Adiciona um pouco de recuo para a lista
};

export default DocumentationHeader;
