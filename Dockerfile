# Usar a imagem oficial do Node.js
FROM node:18

# Definir o diretório de trabalho
WORKDIR /app

# Copiar arquivos do projeto
COPY . .

# Instalar dependências do React
RUN npm install

# Expôr a porta do React
EXPOSE 3000

# Rodar o servidor do React
CMD ["npm", "run", "dev"]
