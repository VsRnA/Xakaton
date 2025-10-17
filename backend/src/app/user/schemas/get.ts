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
    role: roleSchema
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