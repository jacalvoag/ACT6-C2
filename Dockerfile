FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto del backend
EXPOSE 4000

# Comando para desarrollo
CMD ["npm", "run", "dev", "--", "-p", "4000"]
