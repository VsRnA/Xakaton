import { WhereOptions } from "sequelize";
import User, { UserAttributes } from "../models/user";
import Role from "#app/role/models/role";
import { NotFoundError } from "#lib/http/errors";
import { plainify } from "#infrastructure/db/sequelize";

interface GetQuery {
  guid?: UserAttributes['guid'],
  email?: UserAttributes['email'],
  managerGuid?: UserAttributes['managerGuid'],
}

interface UserWithRelations extends UserAttributes {
  role?: {
    id: number;
    name: string;
    keyWord: string;
  };
  subordinates?: Array<UserAttributes & {
    role?: {
      id: number;
      name: string;
      keyWord: string;
    };
  }>;
}

export default async (query: GetQuery): Promise<UserWithRelations> => {
  const where: WhereOptions<User> = {};

  if (query.guid) where.guid = query.guid;
  if (query.email) where.email = query.email;
  if (query.managerGuid) where.managerGuid = query.managerGuid;
  
  const user = await User.findOne({ 
    where,
    include: [
      {
        model: Role,
        as: 'role',
        attributes: ['id', 'name', 'keyWord']
      },
      {
        model: User,
        as: 'subordinates',
        required: false,
        attributes: ['guid', 'email', 'firstName', 'lastName', 'roleId'],
        include: [
          {
            model: Role,
            as: 'role',
            attributes: ['id', 'name', 'keyWord']
          }
        ]
      }
    ]
  });

  if (!user) {
    throw new NotFoundError('Пользователь не найден');
  }

  const userPlain = plainify(user) as unknown as UserWithRelations;

  if (userPlain.subordinates && userPlain.subordinates.length === 0) {
    delete userPlain.subordinates;
  }

  return userPlain;
}