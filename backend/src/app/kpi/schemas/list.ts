import { kpi } from "./components/kpi";
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

const kpiItemSchema = {
  type: 'object',
  properties: {
    guid: kpi.guid,
    userGuid: kpi.userGuid,
    name: kpi.name,
    planPercent: kpi.planPercent,
    factPercent: kpi.factPercent,
    user: userSchema,
    createdAt,
    updatedAt
  }
};

export default {
  querystring: {
    type: 'object',
    properties: {
      userGuid: kpi.userGuid
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'array',
      items: kpiItemSchema
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