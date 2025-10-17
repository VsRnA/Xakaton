import { kpi } from "./components/kpi";
import { createdAt, updatedAt } from "#types/sequelizeTimestamps";

export default {
  body: {
    type: 'object',
    required: ['userGuid', 'name', 'planPercent', 'factPercent'],
    properties: {
      userGuid: kpi.userGuid,
      name: kpi.name,
      planPercent: kpi.planPercent,
      factPercent: kpi.factPercent,
    },
    additionalProperties: false
  },
  response: {
    201: {
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
    400: {
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' }
      }
    }
  }
} as const;