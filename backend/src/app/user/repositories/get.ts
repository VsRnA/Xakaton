import { WhereOptions } from "sequelize";
import User, { UserAttributes } from "../models/user";
import Role from "#app/role/models/role";
import Kpi from "#app/kpi/models/kpi";
import { NotFoundError } from "#lib/http/errors";
import { plainify } from "#infrastructure/db/sequelize";

interface GetQuery {
  guid?: UserAttributes['guid'],
  email?: UserAttributes['email'],
  managerGuid?: UserAttributes['managerGuid'],
}

interface SubordinateWithKpi {
  guid: string;
  email: string;
  firstName: string;
  lastName: string;
  roleId: number;
  role?: {
    id: number;
    name: string;
    keyWord: string;
  };
  avgPlanPercent: number;
  avgFactPercent: number;
}

interface TeamKpiAverage {
  avgPlanPercent: number;
  avgFactPercent: number;
}

interface UserWithRelations extends UserAttributes {
  role?: {
    id: number;
    name: string;
    keyWord: string;
  };
  subordinates?: SubordinateWithKpi[];
  teamKpiAverage?: TeamKpiAverage;
}

/**
 * Вычисление средних процентов KPI для пользователя
 */
async function calculateAvgKpi(userGuid: string): Promise<{ avgPlanPercent: number; avgFactPercent: number }> {
  const kpis = await Kpi.findAll({
    where: { userGuid },
    attributes: ['planPercent', 'factPercent']
  });

  if (kpis.length === 0) {
    return { avgPlanPercent: 0, avgFactPercent: 0 };
  }

  const totalPlan = kpis.reduce((sum, kpi) => sum + Number(kpi.planPercent), 0);
  const totalFact = kpis.reduce((sum, kpi) => sum + Number(kpi.factPercent), 0);

  return {
    avgPlanPercent: Math.round((totalPlan / kpis.length) * 100) / 100,
    avgFactPercent: Math.round((totalFact / kpis.length) * 100) / 100
  };
}


function calculateTeamAverage(subordinates: SubordinateWithKpi[]): TeamKpiAverage {
  if (subordinates.length === 0) {
    return { avgPlanPercent: 0, avgFactPercent: 0 };
  }

  const totalPlan = subordinates.reduce((sum, sub) => sum + sub.avgPlanPercent, 0);
  const totalFact = subordinates.reduce((sum, sub) => sum + sub.avgFactPercent, 0);

  return {
    avgPlanPercent: Math.round((totalPlan / subordinates.length) * 100) / 100,
    avgFactPercent: Math.round((totalFact / subordinates.length) * 100) / 100
  };
}

export default async (query: GetQuery): Promise<UserWithRelations> => {
  const where: WhereOptions<User> = {};

  if (query.guid) where.guid = query.guid;
  if (query.email) where.email = query.email;
  if (query.managerGuid) where.managerGuid = query.managerGuid;
  
  const user = await User.findOne({ 
    where,
    include: [
      {
        model: Role,
        as: 'role', // изменено с 'roles' на 'role'
        attributes: ['id', 'name', 'keyWord'],
        required: false
      },
      {
        model: User,
        as: 'subordinates',
        required: false,
        attributes: ['guid', 'email', 'firstName', 'lastName', 'roleId'],
        include: [
          {
            model: Role,
            as: 'role',
            attributes: ['id', 'name', 'keyWord']
          }
        ]
      }
    ]
  });

  if (!user) {
    throw new NotFoundError('Пользователь не найден');
  }

  const userPlain = await plainify(user) as unknown as UserWithRelations;

  // Если есть подчиненные, добавляем средние KPI для каждого
  if (userPlain.subordinates && userPlain.subordinates.length > 0) {
    const subordinatesWithKpi = await Promise.all(
      userPlain.subordinates.map(async (subordinate) => {
        const kpiAverages = await calculateAvgKpi(subordinate.guid);
        return {
          ...subordinate,
          avgPlanPercent: kpiAverages.avgPlanPercent,
          avgFactPercent: kpiAverages.avgFactPercent
        };
      })
    );

    userPlain.subordinates = subordinatesWithKpi;

    // Вычисляем средний KPI по всей команде
    userPlain.teamKpiAverage = calculateTeamAverage(subordinatesWithKpi);
  } else if (userPlain.subordinates && userPlain.subordinates.length === 0) {
    delete userPlain.subordinates;
  }

  return userPlain;
}