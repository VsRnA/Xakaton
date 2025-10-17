import {
  Model, InferAttributes, InferCreationAttributes, DataTypes,
  Attributes, CreationAttributes, CreationOptional,
} from '#infrastructure/db/sequelize';
import db from '#infrastructure/db/index';
import UserRoleAssignment from '#app/userRole/models/userRole';
import Kpi from '#app/kpi/models/kpi';
import Competency from '#app/competency/models/competency';
import DevelopmentPlan from '#app/development/models/development';
import Project from '#app/project/models/project';

export type UserAttributes = Attributes<User>;
export type UserCreationAttributes = CreationAttributes<User>;

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  /** UUID пользователя */
  declare guid: CreationOptional<string>;
  /** Email пользователя */
  declare email: string;
  /** Hash пароль пользователя */
  declare password: string;
  /** ID роли */
  declare roleId: number;
  /** Имя пользователя */
  declare firstName: string;
  /** Фамилия пользователя */
  declare lastName: string;
  /** GUID менеджера */
  declare managerGuid: string | null;
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
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  managerGuid: {
    type: DataTypes.UUID,
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
});

db.associate(() => {
  User.hasMany(UserRoleAssignment, {
    foreignKey: 'userGuid',
    as: 'roleAssignments',
  });

  // User -> Kpi (один ко многим)
  User.hasMany(Kpi, {
    foreignKey: 'userGuid',
    as: 'kpis',
  });

  // User -> Competency (один ко многим)
  User.hasMany(Competency, {
    foreignKey: 'userGuid',
    as: 'competencies',
  });

  // User -> DevelopmentPlan (один ко многим)
  User.hasMany(DevelopmentPlan, {
    foreignKey: 'userGuid',
    as: 'developmentPlans',
  });

  // User -> Project (один ко многим)
  User.hasMany(Project, {
    foreignKey: 'userGuid',
    as: 'projects',
  });

  // User -> User (самоссылка: менеджер)
  User.belongsTo(User, {
    foreignKey: 'managerGuid',
    as: 'manager',
  });

  User.hasMany(User, {
    foreignKey: 'managerGuid',
    as: 'subordinates',
  });
});