FROM node:22-alpine

ENV NODE_ENV=development
ENV TZ=Europe/Moscow

WORKDIR /app

# Копируем package файлы
COPY package*.json ./

# Устанавливаем все зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Порт приложения
EXPOSE 3000

# Запускаем dev скрипт (esbuild + nodemon)
CMD ["npm", "run", "dev"]