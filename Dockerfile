# Usa una imagen oficial de Node para construir el proyecto
FROM node:18-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios y construye
COPY package*.json ./
RUN npm install
COPY . .
COPY .env .env  
RUN npm run build

# Usa Nginx para servir los archivos estáticos
FROM nginx:stable-alpine

# Copia los archivos de construcción a Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia un archivo de configuración de Nginx opcional si lo necesitas
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
