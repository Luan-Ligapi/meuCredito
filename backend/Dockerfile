# Use a imagem base do Node.js
FROM node:20.15.1

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install --legacy-peer-deps

# Copie o restante dos arquivos para o diretório de trabalho
COPY . .

# Exponha a porta do backend (caso necessário)
EXPOSE 4000

# Comando para iniciar o backend com ts-node
CMD ["npx", "ts-node", "src/app.ts"]
