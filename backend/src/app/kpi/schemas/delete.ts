import { kpi } from "./components/kpi";

export default {
  params: {
    type: 'object',
    required: ['guid'],
    properties: {
      guid: kpi.guid
    },
    additionalProperties: false
  },
  response: {
    204: {
      type: 'null',
      description: 'KPI успешно удален'
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