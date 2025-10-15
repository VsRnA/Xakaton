import User, { UserAttributes } from "../models/user"

export default async (email: UserAttributes['email'])  => User.findOne({
  where: { email },
  attributes: { exclude: ['password'] }
});
