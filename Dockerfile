# Usamos la imagen oficial de Nginx como base
FROM nginx:stable-alpine

# Copiamos los archivos de la web al directorio donde Nginx los sirve
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Exponemos el puerto 80
EXPOSE 80

# Comando por defecto para iniciar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
