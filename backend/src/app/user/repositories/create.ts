import User, { UserCreationAttributes } from "../models/user"

export default async (userData: UserCreationAttributes)  => User.create(userData);
