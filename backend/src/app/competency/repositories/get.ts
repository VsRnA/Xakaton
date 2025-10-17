import { WhereOptions } from "sequelize";
import Competency, { CompetencyAttributes } from "../models/competency";
import User from "#app/user/models/user";
import { NotFoundError } from "#lib/http/errors";
import { plainify } from "#infrastructure/db/sequelize";

interface GetQuery {
  guid: CompetencyAttributes['guid'];
}

interface CompetencyWithRelations extends CompetencyAttributes {
  user?: {
    guid: string;
    email: string;
    firstName: string;
    lastName: string;
    roleId: number;
  };
  parentCompetency?: CompetencyAttributes;
  childCompetencies?: CompetencyAttributes[];
}

/**
 * Получение компетенции по GUID со всеми связями
 * @param query - параметры поиска
 * @returns компетенция с пользователем, родительской и дочерними компетенциями
 */
export default async function getCompetency(query: GetQuery): Promise<CompetencyWithRelations> {
  const where: WhereOptions<Competency> = {};

  if (query.guid) where.guid = query.guid;

  const competency = await Competency.findOne({
    where,
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['guid', 'email', 'firstName', 'lastName', 'roleId']
      },
      {
        model: Competency,
        as: 'parentCompetency',
        required: false,
        attributes: ['guid', 'userGuid', 'name', 'parentCompetencyId', 'description', 'planCount', 'factCount', 'isDone', 'createdAt', 'updatedAt']
      },
      {
        model: Competency,
        as: 'childCompetencies',
        required: false,
        attributes: ['guid', 'userGuid', 'name', 'parentCompetencyId', 'description', 'planCount', 'factCount', 'isDone', 'createdAt', 'updatedAt']
      }
    ]
  });

  if (!competency) {
    throw new NotFoundError('Компетенция не найдена');
  }

  const competencyPlain = plainify(competency) as unknown as CompetencyWithRelations;

  // Удаляем пустые массивы/объекты для чистоты ответа
  if (competencyPlain.childCompetencies && competencyPlain.childCompetencies.length === 0) {
    delete competencyPlain.childCompetencies;
  }

  return competencyPlain;
}