import {
  Model, InferAttributes, InferCreationAttributes, DataTypes,
  Attributes, CreationAttributes,
} from '#infrastructure/db/sequelize';
import db from '#infrastructure/db/index';
import User from '#app/user/models/user';
import Role from '#app/role/models/role';

export type UserRoleAssignmentAttributes = Attributes<UserRoleAssignment>;
export type UserRoleAssignmentCreationAttributes = CreationAttributes<UserRoleAssignment>;

export default class UserRoleAssignment extends Model<
  InferAttributes<UserRoleAssignment>,
  InferCreationAttributes<UserRoleAssignment>
> {
  /** GUID пользователя */
  declare userGuid: string;
  /** ID роли */
  declare roleId: number;
}

UserRoleAssignment.init({
  userGuid: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
}, {
  sequelize: db.instance,
  tableName: 'userRoleAssignments',
  modelName: 'userRoleAssignment',
  timestamps: false,
});

db.associate(() => {
  // UserRoleAssignment -> User (многие к одному)
  UserRoleAssignment.belongsTo(User, {
    foreignKey: 'userGuid',
    as: 'user',
  });

  // UserRoleAssignment -> Role (многие к одному)
  UserRoleAssignment.belongsTo(Role, {
    foreignKey: 'roleId',
    as: 'role',
  });
});