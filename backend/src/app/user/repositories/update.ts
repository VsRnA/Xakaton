import User, { UserAttributes } from '#app/user/models/user';

type UpdateUserData = Partial<Pick<UserAttributes, 'email' | 'password' | 'firstName' | 'lastName'>>;

export default async (guid: string, updatedData: UpdateUserData) => User.update(updatedData, {
  where: { guid }
});
