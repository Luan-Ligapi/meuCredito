# backend/Dockerfile

# Usando uma imagem Node.js como base
FROM node:14

# Definindo o diretório de trabalho
WORKDIR /usr/src/app

# Copiando os arquivos de dependência
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando o restante do código
COPY . .

# Expondo a porta que o app vai rodar
EXPOSE 4000

# Comando para rodar a aplicação
CMD ["npm", "start"]
