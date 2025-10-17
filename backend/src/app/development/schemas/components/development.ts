export const developmentPlan = {
  guid: {
    type: 'string',
    description: 'Уникальный идентификатор плана развития'
  },
  userGuid: {
    type: 'string',
    description: 'GUID пользователя'
  },
  name: {
    type: 'string',
    minLength: 2,
    maxLength: 200,
    description: 'Название плана развития'
  },
  planPercent: {
    type: 'number',
    minimum: 0,
    maximum: 100,
    description: 'Плановый процент выполнения'
  },
  factPercent: {
    type: 'number',
    minimum: 0,
    maximum: 100,
    description: 'Фактический процент выполнения'
  }
} as const;