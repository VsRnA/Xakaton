import { WhereOptions } from "sequelize";
import DevelopmentPlan, { DevelopmentPlanAttributes } from "../models/development";
import User from "#app/user/models/user";
import { plainify } from "#infrastructure/db/sequelize";

interface GetListQuery {
  userGuid?: DevelopmentPlanAttributes['userGuid'];
}

interface DevelopmentPlanWithUser extends DevelopmentPlanAttributes {
  user?: {
    guid: string;
    email: string;
    firstName: string;
    lastName: string;
    roleId: number;
  };
}

/**
 * Получение списка планов развития по фильтрам
 * @param query - фильтры для поиска
 * @returns массив планов развития с пользователями
 */
export default async function getDevelopmentPlanList(query: GetListQuery): Promise<DevelopmentPlanWithUser[]> {
  const where: WhereOptions<DevelopmentPlan> = {};

  if (query.userGuid) {
    where.userGuid = query.userGuid;
  }

  const developmentPlans = await DevelopmentPlan.findAll({
    where,
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['guid', 'email', 'firstName', 'lastName', 'roleId']
      }
    ],
    order: [['createdAt', 'DESC']]
  });

  return plainify(developmentPlans) as unknown as DevelopmentPlanWithUser[];
}