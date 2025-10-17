import { WhereOptions } from "sequelize";
import Role, { RoleAttributes } from "../models/role";
import { BadRequestError } from "#lib/http/errors";
import { plainify } from "#infrastructure/db/sequelize";

interface GetQuery {
  roleId: RoleAttributes['id'];

}

export default async (query: GetQuery) => {
  const where: WhereOptions<Role> = {};

  if (query.roleId) where.id = query.roleId;

  const role = Role.findOne({ where });

  if (!role) {
    throw new BadRequestError('Роль не найдена');
  }

  return plainify(role);
}