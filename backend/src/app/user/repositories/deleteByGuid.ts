import User, { UserAttributes } from '#app/user/models/user';

export default async function deleteUser(guid: UserAttributes['guid']){
  await User.destroy({
    where: { guid }
  });
}