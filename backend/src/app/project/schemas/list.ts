import { project } from "./components/project";
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

const projectItemSchema = {
  type: 'object',
  properties: {
    guid: project.guid,
    userGuid: project.userGuid,
    name: project.name,
    planNumber: project.planNumber,
    factNumber: project.factNumber,
    user: userSchema,
    createdAt,
    updatedAt
  }
};

export default {
  querystring: {
    type: 'object',
    properties: {
      userGuid: project.userGuid
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'array',
      items: projectItemSchema
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