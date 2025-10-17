import { role } from "./components/role";
import { createdAt, updatedAt } from "#types/sequelizeTimestamps";

export default {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: role.id
    },
    additionalProperties: false
  },
  body: {
    type: 'object',
    properties: {
      name: role.name,
      keyWord: role.keyWord,
    },
    additionalProperties: false,
    minProperties: 1 // Хотя бы одно поле должно быть передано
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: role.id,
        name: role.name,
        keyWord: role.keyWord,
        createdAt,
        updatedAt
      }
    },
    404: {
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' }
      }
    },
    400: {
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' }
      }
    },
    409: {
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' }
      }
    }
  }
} as const;