import { project } from "./components/project";
import { createdAt, updatedAt } from "#types/sequelizeTimestamps";

export default {
  body: {
    type: 'object',
    required: ['userGuid', 'name', 'planNumber', 'factNumber'],
    properties: {
      userGuid: project.userGuid,
      name: project.name,
      planNumber: project.planNumber,
      factNumber: project.factNumber,
    },
    additionalProperties: false
  },
  response: {
    201: {
      type: 'object',
      properties: {
        guid: project.guid,
        userGuid: project.userGuid,
        name: project.name,
        planNumber: project.planNumber,
        factNumber: project.factNumber,
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