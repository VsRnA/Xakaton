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

export default {
  params: {
    type: 'object',
    required: ['guid'],
    properties: {
      guid: project.guid
    },
    additionalProperties: false
  },
  response: {
    200: {
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