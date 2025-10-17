import {
  Model, InferAttributes, InferCreationAttributes, DataTypes,
  Attributes, CreationAttributes, CreationOptional,
} from '#infrastructure/db/sequelize';
import db from '#infrastructure/db/index';
import User from '#app/user/models/user';
import UserRoleAssignment from '#app/userRole/models/userRole';

export type RoleAttributes = Attributes<Role>;
export type RoleCreationAttributes = CreationAttributes<Role>;

export default class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  /** ID роли */
  declare id: CreationOptional<number>;
  /** Название роли */
  declare name: string;
  /** Ключевое слово роли */
  declare keyWord: string;
  /** Дата создания */
  declare createdAt: CreationOptional<string>;
  /** Дата обновления */
  declare updatedAt: CreationOptional<string>;
  /** Дата софт-удаления */
  declare deletedAt: CreationOptional<string | null>;
}

Role.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  keyWord: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  sequelize: db.instance,
  tableName: 'roles',
  modelName: 'role',
  paranoid: true,
  timestamps: true,
});

db.associate(() => {
  // Role -> User (один ко многим)
  Role.hasMany(User, {
    foreignKey: 'roleId',
    as: 'users',
  });

  // Role -> UserRoleAssignment (один ко многим)
  Role.hasMany(UserRoleAssignment, {
    foreignKey: 'roleId',
    as: 'userRoleAssignments',
  });
});
