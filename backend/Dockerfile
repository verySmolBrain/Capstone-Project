# Dockerfile for Backend
FROM node:18

WORKDIR /app/backend

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "prod"]