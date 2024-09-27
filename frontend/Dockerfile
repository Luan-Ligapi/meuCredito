# Dockerfile
FROM node:20.15.1

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Executa o build
RUN npm run build

# Expondo a porta se necessário
EXPOSE 3000

# Comando padrão para iniciar a aplicação
CMD ["npm", "start"]
