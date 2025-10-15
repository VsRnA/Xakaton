import { user } from "./components/user";
import { createdAt } from "#types/sequelizeTimestamps";

export default {
  body: {
    type: 'object',
    required: ['email', 'password', 'firstName', 'lastName'],
    properties: {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName
    },
    additionalProperties: false
  },
  response: {
    201: {
      type: 'object',
      properties: {
        guid: user.guid,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt,
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