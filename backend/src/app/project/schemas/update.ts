import { project } from "./components/project";
import { createdAt, updatedAt } from "#types/sequelizeTimestamps";

export default {
  params: {
    type: 'object',
    required: ['guid'],
    properties: {
      guid: project.guid
    },
    additionalProperties: false
  },
  body: {
    type: 'object',
    properties: {
      name: project.name,
      planNumber: project.planNumber,
      factNumber: project.factNumber,
    },
    additionalProperties: false,
    minProperties: 1 // Хотя бы одно поле должно быть передано
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