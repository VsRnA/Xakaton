import { WhereOptions } from "sequelize";
import Kpi, { KpiAttributes } from "../models/kpi";
import User from "#app/user/models/user";
import { NotFoundError } from "#lib/http/errors";
import { plainify } from "#infrastructure/db/sequelize";

interface GetQuery {
  guid: KpiAttributes['guid'];
}

interface KpiWithRelations extends KpiAttributes {
  user?: {
    guid: string;
    email: string;
    firstName: string;
    lastName: string;
    roleId: number;
  };
}

/**
 * Получение KPI по GUID со всеми связями
 * @param query - параметры поиска
 * @returns KPI с пользователем
 */
export default async function getKpi(query: GetQuery): Promise<KpiWithRelations> {
  const where: WhereOptions<Kpi> = {};

  if (query.guid) where.guid = query.guid;

  const kpi = await Kpi.findOne({
    where,
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['guid', 'email', 'firstName', 'lastName', 'roleId']
      }
    ]
  });

  if (!kpi) {
    throw new NotFoundError('KPI не найден');
  }

  return plainify(kpi) as unknown as KpiWithRelations;
}