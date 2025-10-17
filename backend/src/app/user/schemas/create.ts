import { user } from "./components/user";
import { createdAt, updatedAt } from "#types/sequelizeTimestamps";

export default {
  body: {
    type: 'object',
    required: ['email', 'password', 'firstName', 'roleId'],
    properties: {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      roleId: user.roleId,
      managerGuid: user.managerGuid
    },
    additionalProperties: false
  },
  response: {
    201: {
      type: 'object',
      properties: {
        guid: user.guid,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roleId: user.roleId,
        managerGuid: user.managerGuid,
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
    },
    409: {
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' }
      }
    }
  }
} as const;