import { user } from "./components/user";
import { createdAt, updatedAt } from "#types/sequelizeTimestamps";

const roleSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    keyWord: { type: 'string' }
  }
};

const subordinateSchema = {
  type: 'object',
  properties: {
    guid: user.guid,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    roleId: user.roleId,
    role: roleSchema,
    avgPlanPercent: {
      type: 'number',
      description: 'Средний плановый процент по всем KPI подчиненного'
    },
    avgFactPercent: {
      type: 'number',
      description: 'Средний фактический процент по всем KPI подчиненного'
    }
  }
};

const teamKpiAverageSchema = {
  type: 'object',
  properties: {
    avgPlanPercent: {
      type: 'number',
      description: 'Средний плановый процент по команде'
    },
    avgFactPercent: {
      type: 'number',
      description: 'Средний фактический процент по команде'
    }
  }
};

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
      properties: {
        guid: user.guid,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roleId: user.roleId,
        managerGuid: user.managerGuid,
        role: roleSchema,
        subordinates: {
          type: 'array',
          items: subordinateSchema
        },
        teamKpiAverage: teamKpiAverageSchema,
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