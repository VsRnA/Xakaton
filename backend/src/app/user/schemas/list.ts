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

const managerSchema = {
  type: 'object',
  properties: {
    guid: user.guid,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  }
};

const userItemSchema = {
  type: 'object',
  properties: {
    guid: user.guid,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    roleId: user.roleId,
    managerGuid: user.managerGuid,
    role: roleSchema,
    manager: managerSchema,
    createdAt,
    updatedAt
  }
};

export default {
  querystring: {
    type: 'object',
    properties: {
      roleId: user.roleId,
      managerGuid: user.managerGuid
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'array',
      items: userItemSchema
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