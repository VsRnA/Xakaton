import {
  Model, InferAttributes, InferCreationAttributes, DataTypes,
  Attributes, CreationAttributes, CreationOptional,
} from '#infrastructure/db/sequelize';
import db from '#infrastructure/db/index';
import User from '#app/user/models/user';

export type KpiAttributes = Attributes<Kpi>;
export type KpiCreationAttributes = CreationAttributes<Kpi>;

export default class Kpi extends Model<InferAttributes<Kpi>, InferCreationAttributes<Kpi>> {
  /** UUID KPI */
  declare guid: CreationOptional<string>;
  /** GUID пользователя */
  declare userGuid: string;
  /** Название KPI */
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

Kpi.init({
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
  tableName: 'kpis',
  modelName: 'kpi',
  paranoid: true,
  timestamps: true,
});

db.associate(() => {
  // Kpi -> User (многие к одному)
  Kpi.belongsTo(User, {
    foreignKey: 'userGuid',
    as: 'user',
  });
});