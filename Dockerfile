# --- Estágio 1: Builder ---
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

RUN npm install -g pnpm@latest && \
  pnpm install

COPY . .

RUN pnpm prisma generate && \
  pnpm build


# --- Estágio 2: Final/Produção ---
FROM node:22-alpine

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

COPY --from=builder /app/node_modules ./node_modules

RUN npm install -g pnpm@latest && \
  pnpm prune --prod

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3004
CMD [ "pnpm", "start:prod" ]
