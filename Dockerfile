# Usar a imagem base do Node.js
FROM node:20.15.1

# Definir o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copiar os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar dependências necessárias
RUN npm install --legacy-peer-deps

# Copiar o restante dos arquivos para o diretório de trabalho
COPY . .

# Construir a aplicação (se aplicável, especialmente para frontend)
RUN npm run build || echo "Nenhuma build necessária"

# Expor a porta que a aplicação usa (por exemplo, 3000)
EXPOSE 3000

# Comando padrão para iniciar a aplicação
CMD ["npm", "start"]
