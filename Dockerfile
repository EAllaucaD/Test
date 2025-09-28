FROM node:20-alpine

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar todo el código
COPY . .

# Exponer el puerto correcto
EXPOSE 80

# Usar la variable de entorno PORT si está definida, sino 80
ENV PORT=80
CMD ["node", "server.js"]
