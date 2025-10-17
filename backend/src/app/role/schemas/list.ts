import { role } from "./components/role";
import { createdAt, updatedAt } from "#types/sequelizeTimestamps";

const roleItemSchema = {
  type: 'object',
  properties: {
    id: role.id,
    name: role.name,
    keyWord: role.keyWord,
    createdAt,
    updatedAt
  }
};

export default {
  response: {
    200: {
      type: 'array',
      items: roleItemSchema
    }
  }
} as const;