import { WhereOptions } from "sequelize";
import User, { UserAttributes } from "../models/user";
import { NotFoundError } from "#lib/http/errors";

interface GetQuery {
  guid?: UserAttributes['guid'],
}

export default async (query: GetQuery) =>  {
  const where: WhereOptions<User> = {};

  if (query.guid) where.guid = query.guid;
  
  const user = await User.findOne({
    where,
    attributes: { exclude: ['password'] }
  });

  if (!user) {
    throw new NotFoundError('Пользователь не найден');
  }

  return user;
}