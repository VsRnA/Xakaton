import { plainify } from "#infrastructure/db/sequelize";
import User, { UserAttributes } from "../models/user"

export default async (guid: UserAttributes['email'])  => {
  const user = await User.findOne({
    where: { guid },
  });

  return plainify(user);
}
