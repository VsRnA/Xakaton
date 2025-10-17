import { WhereOptions } from "sequelize";
import Kpi, { KpiAttributes } from "../models/kpi";
import User from "#app/user/models/user";
import { plainify } from "#infrastructure/db/sequelize";

interface GetListQuery {
  userGuid?: KpiAttributes['userGuid'];
}

interface KpiWithUser extends KpiAttributes {
  user?: {
    guid: string;
    email: string;
    firstName: string;
    lastName: string;
    roleId: number;
  };
}

/**
 * Получение списка KPI по фильтрам
 * @param query - фильтры для поиска
 * @returns массив KPI с пользователями
 */
export default async function getKpiList(query: GetListQuery): Promise<KpiWithUser[]> {
  const where: WhereOptions<Kpi> = {};

  if (query.userGuid) {
    where.userGuid = query.userGuid;
  }

  const kpis = await Kpi.findAll({
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

  return plainify(kpis) as unknown as KpiWithUser[];
}