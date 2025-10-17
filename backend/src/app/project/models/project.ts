import {
  Model, InferAttributes, InferCreationAttributes, DataTypes,
  Attributes, CreationAttributes, CreationOptional,
} from '#infrastructure/db/sequelize';
import db from '#infrastructure/db/index';
import User from '#app/user/models/user';

export type ProjectAttributes = Attributes<Project>;
export type ProjectCreationAttributes = CreationAttributes<Project>;

export default class Project extends Model<InferAttributes<Project>, InferCreationAttributes<Project>> {
  /** UUID проекта */
  declare guid: CreationOptional<string>;
  /** GUID пользователя */
  declare userGuid: string;
  /** Название проекта */
  declare name: string;
  /** Плановое количество */
  declare planNumber: number;
  /** Фактическое количество */
  declare factNumber: number;
  /** Дата создания */
  declare createdAt: CreationOptional<string>;
  /** Дата обновления */
  declare updatedAt: CreationOptional<string>;
  /** Дата софт-удаления */
  declare deletedAt: CreationOptional<string | null>;
}

Project.init({
  guid: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  userGuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  planNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  factNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  sequelize: db.instance,
  tableName: 'projects',
  modelName: 'project',
  paranoid: true,
  timestamps: true,
});

db.associate(() => {
  // Project -> User (многие к одному)
  Project.belongsTo(User, {
    foreignKey: 'userGuid',
    as: 'user',
  });
});