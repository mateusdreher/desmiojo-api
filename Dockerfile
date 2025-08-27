FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm@latest && \
  pnpm install

COPY . .
RUN npx prisma generate
RUN pnpm build 

FROM node:22

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm@latest && \ 
  pnpm install --prod

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

