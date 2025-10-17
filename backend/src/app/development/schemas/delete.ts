import { developmentPlan } from "./components/development";

export default {
  params: {
    type: 'object',
    required: ['guid'],
    properties: {
      guid: developmentPlan.guid
    },
    additionalProperties: false
  },
  response: {
    204: {
      type: 'null',
      description: 'План развития успешно удален'
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