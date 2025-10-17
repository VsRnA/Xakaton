export const user = {
  guid: {
    type: 'string',
    description: 'Уникальный идентификатор пользователя'
  },
  email: {
    type: 'string',
    format: 'email',
    description: 'Email пользователя'
  },
  password: {
    type: 'string',
    minLength: 6,
    description: 'Пароль пользователя'
  },
  roleId: {
    type: 'number',
    description: 'ID роли пользователя'
  },
  firstName: {
    type: 'string',
    minLength: 2,
    maxLength: 100,
    description: 'Имя пользователя'
  },
  lastName: {
    type: 'string',
    minLength: 2,
    maxLength: 100,
    description: 'Фамилия пользователя'
  },
  managerGuid: {
    type: 'string',
    description: 'GUID менеджера пользователя'
  },
  createdAt: {
    type: 'string',
    description: 'Дата создания пользователя'
  },
  updatedAt: {
    type: 'string',
    description: 'Дата обновления пользователя'
  }
} as const;