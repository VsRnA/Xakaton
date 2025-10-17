import { developmentPlan } from "./components/development";
import { createdAt, updatedAt } from "#types/sequelizeTimestamps";

const userSchema = {
  type: 'object',
  properties: {
    guid: { type: 'string' },
    email: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    roleId: { type: 'number' }
  }
};

const developmentPlanItemSchema = {
  type: 'object',
  properties: {
    guid: developmentPlan.guid,
    userGuid: developmentPlan.userGuid,
    name: developmentPlan.name,
    planPercent: developmentPlan.planPercent,
    factPercent: developmentPlan.factPercent,
    user: userSchema,
    createdAt,
    updatedAt
  }
};

export default {
  querystring: {
    type: 'object',
    properties: {
      userGuid: developmentPlan.userGuid
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'array',
      items: developmentPlanItemSchema
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