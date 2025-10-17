import { competency } from "./components/competency";
import { createdAt, updatedAt } from "#types/sequelizeTimestamps";

// Базовая схема для компетенции без дочерних
const baseCompetencySchema = {
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

// Схема для компетенции второго уровня (внуки)
const childCompetencyLevel2Schema = {
  type: 'object',
  properties: {
    ...baseCompetencySchema.properties,
    childCompetencies: {
      type: 'array',
      items: baseCompetencySchema
    }
  }
};

// Схема для компетенции первого уровня (дети)
const childCompetencyLevel1Schema = {
  type: 'object',
  properties: {
    ...baseCompetencySchema.properties,
    childCompetencies: {
      type: 'array',
      items: childCompetencyLevel2Schema
    }
  }
};

// Схема для корневой компетенции
const competencyItemSchema = {
  type: 'object',
  properties: {
    ...baseCompetencySchema.properties,
    childCompetencies: {
      type: 'array',
      items: childCompetencyLevel1Schema
    }
  }
};

export default {
  querystring: {
    type: 'object',
    properties: {
      userGuid: competency.userGuid
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'array',
      items: competencyItemSchema
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