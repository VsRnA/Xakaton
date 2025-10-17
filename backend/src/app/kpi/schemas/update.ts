import { kpi } from "./components/kpi";
import { createdAt, updatedAt } from "#types/sequelizeTimestamps";

export default {
  params: {
    type: 'object',
    required: ['guid'],
    properties: {
      guid: kpi.guid
    },
    additionalProperties: false
  },
  body: {
    type: 'object',
    properties: {
      name: kpi.name,
      planPercent: kpi.planPercent,
      factPercent: kpi.factPercent,
    },
    additionalProperties: false,
    minProperties: 1 // Хотя бы одно поле должно быть передано
  },
  response: {
    200: {
      type: 'object',
      properties: {
        guid: kpi.guid,
        userGuid: kpi.userGuid,
        name: kpi.name,
        planPercent: kpi.planPercent,
        factPercent: kpi.factPercent,
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
    }
  }
} as const;