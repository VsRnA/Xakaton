import { developmentPlan } from "./components/development";
import { createdAt, updatedAt } from "#types/sequelizeTimestamps";

export default {
  body: {
    type: 'object',
    required: ['userGuid', 'name', 'planPercent', 'factPercent'],
    properties: {
      userGuid: developmentPlan.userGuid,
      name: developmentPlan.name,
      planPercent: developmentPlan.planPercent,
      factPercent: developmentPlan.factPercent,
    },
    additionalProperties: false
  },
  response: {
    201: {
      type: 'object',
      properties: {
        guid: developmentPlan.guid,
        userGuid: developmentPlan.userGuid,
        name: developmentPlan.name,
        planPercent: developmentPlan.planPercent,
        factPercent: developmentPlan.factPercent,
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