import { role } from "./components/role";
import { createdAt, updatedAt } from "#types/sequelizeTimestamps";

export default {
  body: {
    type: 'object',
    required: ['name', 'keyWord'],
    properties: {
      name: role.name,
      keyWord: role.keyWord,
    },
    additionalProperties: false
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: role.id,
        name: role.name,
        keyWord: role.keyWord,
        createdAt,
        updatedAt
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