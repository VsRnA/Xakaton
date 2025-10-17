import { competency } from "./components/competency";
import { createdAt, updatedAt } from "#types/sequelizeTimestamps";

// Схема для пользователя
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

// Базовая схема для дочерней компетенции
const childCompetencySchema = {
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
};

// Схема для родительской компетенции
const parentCompetencySchema = {
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
};

export default {
  params: {
    type: 'object',
    required: ['guid'],
    properties: {
      guid: competency.guid
    },
    additionalProperties: false
  },
  response: {
    200: {
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
        user: userSchema,
        parentCompetency: parentCompetencySchema,
        childCompetencies: {
          type: 'array',
          items: childCompetencySchema
        },
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