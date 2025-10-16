import { user } from "#app/user/schemas/components/user";

export default {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: user.email,
      password: user.password,
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            guid: user.guid,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          }
        },
        token: { 
          type: 'string',
          description: 'JWT токен для аутентификации'
        }
      }
    },
    400: {
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' }
      }
    },
    401: {
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' }
      }
    }
  }
} as const;