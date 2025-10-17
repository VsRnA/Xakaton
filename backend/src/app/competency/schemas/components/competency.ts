export const competency = {
  guid: {
    type: 'string',
    description: 'Уникальный идентификатор компетенции'
  },
  userGuid: {
    type: 'string',
    description: 'GUID пользователя'
  },
  name: {
    type: 'string',
    minLength: 2,
    maxLength: 200,
    description: 'Название компетенции'
  },
  parentCompetencyId: {
    type: 'string',
    description: 'ID родительской компетенции'
  },
  description: {
    type: 'string',
    maxLength: 1000,
    description: 'Описание компетенции'
  },
  planCount: {
    type: 'number',
    minimum: 0,
    description: 'Количество запланированных'
  },
  factCount: {
    type: 'number',
    minimum: 0,
    description: 'Количество выполненных'
  },
  isDone: {
    type: 'boolean',
    description: 'Флаг завершения компетенции'
  }
} as const;