FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

# Instala dependências e Tailwind
RUN npm install --legacy-peer-deps \
    && npm install -D tailwindcss postcss autoprefixer

# Copia todo o código do frontend
COPY . .

# Copia environment.docker.ts para environment.ts
RUN cp src/environments/environment.docker.ts src/environments/environment.ts

# Porta do Angular
EXPOSE 4200

# Iniciar Angular Dev Server com hot reload
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--poll=2000"]
