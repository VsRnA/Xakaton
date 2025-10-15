# Smart Budget Planning Assistant

Умный помощник для планирования бюджета

## Требования

- [Docker] (версия 20.10 или выше)
- [Docker Compose] (версия 2.0 или выше)

## Быстрый старт

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Запуск проекта

**Первый запуск (с построением образа):**
```bash
docker-compose up --build
```

**Последующие запуски:**
```bash
docker-compose up
```

**Запуск в фоновом режиме:**
```bash
docker-compose up -d
```

### 3. Проверка работы

После успешного запуска сервисы будут доступны по адресам:

- **API приложения:** http://localhost:3000

### 4. Остановка проекта

**Остановка контейнеров:**
```bash
docker-compose down
```

**Остановка с удалением данных БД:**
```bash
docker-compose down -v
```

## Разработка

### Hot Reload

Проект настроен на автоматическую перезагрузку при изменении файлов:

1. **esbuild** следит за изменениями в `backend/src/`
2. **nodemon** автоматически перезапускает приложение

### Структура проекта

```
.
├── backend/
│   └── src/          # Исходный код TypeScript
├── _dev/             # Скомпилированный код (генерируется автоматически)
├── docker-compose.yml
├── Dockerfile
├── esbuild.mjs
├── package.json
└── README.md
```

## Дополнительная информация

### Версии

- Node.js: 22 (Alpine)
- PostgreSQL: 15 (Alpine)
- TypeScript: (указать версию)

### NPM скрипты

- `npm run dev` - Запуск в режиме разработки с hot-reload
- `npm run build` - Сборка production версии
- `npm run prebuild` - Проверка типов TypeScript


