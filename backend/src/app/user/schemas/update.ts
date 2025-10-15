import { user } from "./components/user";
import { createdAt, updatedAt } from "#types/sequelizeTimestamps";

export default {
  params: {
    type: 'object',
    required: ['guid'],
    properties: {
      guid: user.guid
    },
    additionalProperties: false
  },
  body: {
    type: 'object',
    properties: {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {}
    },
    400: {
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' }
      }
    },
    404: {
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