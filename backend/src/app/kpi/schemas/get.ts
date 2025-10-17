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
    200: {
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