# Dockerfile for Frontend
FROM node:18

WORKDIR /app/frontend

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "prod"]