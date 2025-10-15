export const createdAt = {
  type: 'string',
  description: 'Время создания',
  format: 'date-time',
} as const;

export const updatedAt = {
  type: 'string',
  description: 'Время обновления',
  format: 'date-time',
} as const;

export const deletedAt = {
  type: 'string',
  description: 'Время софт-удаления',
  format: 'date-time',
  nullable: true,
} as const;
