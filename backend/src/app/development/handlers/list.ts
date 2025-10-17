import { httpTransport } from "#infrastructure/fastify";
import DevelopmentPlanListSchema from '#app/development/schemas/list';
import getDevelopmentPlanList from '#app/development/repositories/list';

httpTransport.handler.get('/api/development/v1/list', DevelopmentPlanListSchema, async (req) => {
  const { userGuid } = req.query;

  const developmentPlans = await getDevelopmentPlanList({ userGuid });

  const Coef = developmentPlans.length > 0 && 
    developmentPlans.every(plan => plan.factPercent >= plan.planPercent) 
    ? 1 
    : 0;

  return { Coef, developmentPlans };
});