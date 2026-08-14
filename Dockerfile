FROM node:24-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

RUN corepack enable

WORKDIR /app

EXPOSE 3000


CMD ["pnpm", "exec", "next", "dev", "-H", "0.0.0.0", "-p", "3000"]
