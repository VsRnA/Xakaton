import {
  Model, InferAttributes, InferCreationAttributes, DataTypes,
  Attributes, CreationAttributes, CreationOptional,
} from '#infrastructure/db/sequelize';
import db from '#infrastructure/db/index';
import User from '#app/user/models/user';

export type DevelopmentPlanAttributes = Attributes<DevelopmentPlan>;
export type DevelopmentPlanCreationAttributes = CreationAttributes<DevelopmentPlan>;

export default class DevelopmentPlan extends Model<
  InferAttributes<DevelopmentPlan>,
  InferCreationAttributes<DevelopmentPlan>
> {
  /** UUID плана развития */
  declare guid: CreationOptional<string>;
  /** GUID пользователя */
  declare userGuid: string;
  /** Название плана */
  declare name: string;
  /** Плановый процент */
  declare planPercent: number;
  /** Фактический процент */
  declare factPercent: number;
  /** Дата создания */
  declare createdAt: CreationOptional<string>;
  /** Дата обновления */
  declare updatedAt: CreationOptional<string>;
  /** Дата софт-удаления */
  declare deletedAt: CreationOptional<string | null>;
}

DevelopmentPlan.init({
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
  planPercent: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  factPercent: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  sequelize: db.instance,
  tableName: 'developments',
  modelName: 'development',
  paranoid: true,
  timestamps: true,
});

db.associate(() => {
  // DevelopmentPlan -> User (многие к одному)
  DevelopmentPlan.belongsTo(User, {
    foreignKey: 'userGuid',
    as: 'user',
  });
});