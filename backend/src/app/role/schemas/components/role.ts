export const role = {
  id: {
    type: 'number',
    description: 'ID роли'
  },
  name: {
    type: 'string',
    minLength: 2,
    maxLength: 100,
    description: 'Название роли'
  },
  keyWord: {
    type: 'string',
    minLength: 2,
    maxLength: 50,
    description: 'Ключевое слово роли (lowercase, underscore)'
  }
} as const;