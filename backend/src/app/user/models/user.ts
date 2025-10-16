import {
  Model, InferAttributes, InferCreationAttributes, DataTypes,
  Attributes, CreationAttributes, CreationOptional,
} from '#infrastructure/db/sequelize';
import db from '#infrastructure/db/index';

export type UserAttributes = Attributes<User>;
export type UserCreationAttributes = CreationAttributes<User>;

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  /** UUID пользователя */
  declare guid: CreationOptional<string>
  /** Email пользователя*/
  declare email: string;
  /** Hash пароль пользователя */
  declare password: string;
  /** Имя пользователя */
  declare firstName: string;
  /** Фамилия пользователя */
  declare lastName: string;
  /** Дата создания */
  declare createdAt: CreationOptional<string>;
  /** Дата обновления */
  declare updatedAt: CreationOptional<string>;
  /** Дата софт-удаления */
  declare deletedAt: CreationOptional<string | null>;
}

User.init({
  guid: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  sequelize: db.instance,
  tableName: 'users',
  modelName: 'user',
  paranoid: true,
  timestamps: true,
  updatedAt: false,
});

db.associate(() => {
  // // User -> Categories (один ко многим)
  // User.hasMany(Category, {
  //   foreignKey: 'userGuid',
  //   as: 'categories',
  // });

  // // User -> Transactions (один ко многим)
  // User.hasMany(Transaction, {
  //   foreignKey: 'userGuid',
  //   as: 'transactions',
  // });

  // // User -> Goals (один ко многим)
  // User.hasMany(Goal, {
  //   foreignKey: 'userGuid',
  //   as: 'goals',
  // });
});