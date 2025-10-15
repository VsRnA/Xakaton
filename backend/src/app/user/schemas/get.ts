import { user } from "./components/user";
import { createdAt } from "#types/sequelizeTimestamps";

export default {
  params: {
    type: 'object',
    required: ['guid'],
    properties: {
      guid: user.guid
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        guid: user.guid,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt,
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