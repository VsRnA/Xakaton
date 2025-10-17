import { competency } from "./components/competency";
import { createdAt, updatedAt } from "#types/sequelizeTimestamps";

export default {
  body: {
    type: 'object',
    required: ['userGuid', 'name', 'planCount', 'factCount'],
    properties: {
      userGuid: competency.userGuid,
      name: competency.name,
      parentCompetencyId: competency.parentCompetencyId,
      description: competency.description,
      planCount: competency.planCount,
      factCount: competency.factCount,
      isDone: competency.isDone,
    },
    additionalProperties: false
  },
  response: {
    201: {
      type: 'object',
      properties: {
        guid: competency.guid,
        userGuid: competency.userGuid,
        name: competency.name,
        parentCompetencyId: competency.parentCompetencyId,
        description: competency.description,
        planCount: competency.planCount,
        factCount: competency.factCount,
        isDone: competency.isDone,
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