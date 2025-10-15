import { user } from "./components/user";

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
      properties: {}
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