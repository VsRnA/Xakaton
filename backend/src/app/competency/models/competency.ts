import {
  Model, InferAttributes, InferCreationAttributes, DataTypes,
  Attributes, CreationAttributes, CreationOptional,
} from '#infrastructure/db/sequelize';
import db from '#infrastructure/db/index';
import User from '#app/user/models/user';

export type CompetencyAttributes = Attributes<Competency>;
export type CompetencyCreationAttributes = CreationAttributes<Competency>;

export default class Competency extends Model<
  InferAttributes<Competency>,
  InferCreationAttributes<Competency>
> {
  /** UUID компетенции */
  declare guid: CreationOptional<string>;
  /** GUID пользователя */
  declare userGuid: string;
  /** Название компетенции */
  declare name: string;
  /** ID родительской компетенции */
  declare parentCompetencyId: string | null;
  /** Описание */
  declare description: string | null;
  /** Количество запланированных */
  declare planCount: number;
  /** Количество выполненных */
  declare factCount: number;
  /** Флаг завершения */
  declare isDone: boolean;
  /** Дата создания */
  declare createdAt: CreationOptional<string>;
  /** Дата обновления */
  declare updatedAt: CreationOptional<string>;
  /** Дата софт-удаления */
  declare deletedAt: CreationOptional<string | null>;
}

Competency.init({
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
  parentCompetencyId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  planCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  factCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  sequelize: db.instance,
  tableName: 'competencies',
  modelName: 'competency',
  paranoid: true,
  timestamps: true,
});

db.associate(() => {
  // Competency -> User (многие к одному)
  Competency.belongsTo(User, {
    foreignKey: 'userGuid',
    as: 'user',
  });

  // Competency -> Competency (самоссылка: родительская компетенция)
  Competency.belongsTo(Competency, {
    foreignKey: 'parentCompetencyId',
    as: 'parentCompetency',
  });

  Competency.hasMany(Competency, {
    foreignKey: 'parentCompetencyId',
    as: 'childCompetencies',
  });
});