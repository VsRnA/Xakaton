import { WhereOptions } from "sequelize";
import User, { UserAttributes } from "../models/user";
import { NotFoundError } from "#lib/http/errors";
import { plainify } from "#infrastructure/db/sequelize";

interface GetQuery {
  guid?: UserAttributes['guid'],
  email?: UserAttributes['email']
}

export default async (query: GetQuery) =>  {
  const where: WhereOptions<User> = {};

  if (query.guid) where.guid = query.guid;
  if (query.email) where.email = query.email;
  
  const user = await User.findOne({ where });

  if (!user) {
    throw new NotFoundError('Пользователь не найден');
  }

  return plainify(user);
}