{
  "title": "Meu Crédito",
  "description": "Meu Crédito é uma aplicação full stack desenvolvida para gerenciar o histórico de compras e dívidas de clientes. A aplicação permite calcular o valor máximo em aberto, visualizar contratos e realizar outras operações relacionadas ao crédito.",
  "technologies": {
    "frontend": "React",
    "backend": "Node.js, Express",
    "database": "MongoDB",
    "docker": "Para facilitar a configuração e o deploy da aplicação"
  },
  "projectStructure": [
    {
      "meuCredito": [
        "backend/",
        {
          "src": [],
          "package.json": null,
          "package-lock.json": null,
          "Dockerfile": null
        },
        "frontend/",
        {
          "src": [],
          "public": [],
          "package.json": null,
          "package-lock.json": null,
          "Dockerfile": null
        },
        "docker-compose.yml",
        "README.md"
      ]
    }
  ],
  "installation": [
    "Clone o repositório:",
    {
      "command": "git clone https://github.com/gatitoz-luan/meuCredito.git"
    },
    "cd meuCredito",
    "Para o backend:",
    {
      "command": "cd backend && npm install"
    },
    "Para o frontend:",
    {
      "command": "cd ../frontend && npm install"
    }
  ],
  "runningApplication": {
    "usingDocker": "Para executar tanto o frontend quanto o backend usando Docker, execute: docker-compose up --build",
    "withoutDocker": [
      "Execute o backend:",
      {
        "command": "cd backend && npm start"
      },
      "Em um novo terminal, execute o frontend:",
      {
        "command": "cd frontend && npm start"
      }
    ]
  },
  "testing": {
    "backend": {
      "command": "cd backend && npm test"
    },
    "frontend": {
      "command": "cd frontend && npm test"
    }
  },
  "deploy": "O projeto pode ser implantado em serviços como Vercel ou Render. Siga as instruções específicas de cada plataforma para realizar o deploy da aplicação.",
  "contribution": [
    "Contribuições são bem-vindas! Para contribuir, siga os passos:",
    "Fork o repositório.",
    "Crie uma nova branch (git checkout -b feature/NovaFuncionalidade).",
    "Faça suas alterações e commit (git commit -m 'Adicionando nova funcionalidade').",
    "Faça push para a branch (git push origin feature/NovaFuncionalidade).",
    "Abra um Pull Request."
  ],
  "license": "Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para mais detalhes."
}
