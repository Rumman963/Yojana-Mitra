# step-1 build the app
FROM node:22-slim  
WORKDIR /app

RUN npm install -g bun

COPY package.json bun.lock ./
RUN bun install --frozen-lockerfile

COPY . . 

ENV DATABASE_URL="postgresql://user:password@localhost:5432/db" 
RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "start"]