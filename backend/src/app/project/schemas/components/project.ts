export const project = {
  guid: {
    type: 'string',
    description: 'Уникальный идентификатор проекта'
  },
  userGuid: {
    type: 'string',
    description: 'GUID пользователя'
  },
  name: {
    type: 'string',
    minLength: 2,
    maxLength: 200,
    description: 'Название проекта'
  },
  planNumber: {
    type: 'number',
    minimum: 0,
    description: 'Плановое количество'
  },
  factNumber: {
    type: 'number',
    minimum: 0,
    description: 'Фактическое количество'
  }
} as const;