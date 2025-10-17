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
    }
  }
} as const;