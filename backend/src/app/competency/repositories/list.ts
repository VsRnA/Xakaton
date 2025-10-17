import { WhereOptions } from "sequelize";
import Competency, { CompetencyAttributes } from "../models/competency";
import { plainify } from "#infrastructure/db/sequelize";

interface GetListQuery {
  userGuid?: CompetencyAttributes['userGuid'];
}

interface CompetencyWithChildren extends CompetencyAttributes {
  childCompetencies?: CompetencyWithChildren[];
}

/**
 * Получение списка компетенций по фильтрам
 * @param query - фильтры для поиска
 * @returns массив компетенций с дочерними компетенциями
 */
export default async function getCompetencies(query: GetListQuery): Promise<CompetencyWithChildren[]> {
  const where: WhereOptions<Competency> = {
    parentCompetencyId: null
  };

  if (query.userGuid) {
    where.userGuid = query.userGuid;
  }

  const competencies = await Competency.findAll({
    where,
    include: [
      {
        model: Competency,
        as: 'childCompetencies',
        required: false, // LEFT JOIN - вернет компетенцию даже если нет дочерних
        include: [
          {
            model: Competency,
            as: 'childCompetencies',
            required: false, // Второй уровень вложенности
          }
        ]
      }
    ],
    order: [['createdAt', 'DESC']]
  });

  return plainify(competencies) as unknown as CompetencyWithChildren[];
}