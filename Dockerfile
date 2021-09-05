FROM node:lts-alpine3.14
# membuat folder di docker
WORKDIR /app

# COPY package.jsin
COPY package*.json ./

# jalankan npm
RUN npm install

# ambil semua dan pindahkan ke folder /app
COPY . .
# samain sama env.PORT
EXPOSE 2021
# RUN
CMD ["npm","start"]