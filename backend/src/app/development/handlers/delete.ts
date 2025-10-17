import { httpTransport } from "#infrastructure/fastify";
import DevelopmentPlanDeleteSchema from '#app/development/schemas/delete';
import deleteDevelopmentPlan from '#app/development/repositories/delete';
import findDevelopmentPlanByGuid from '#app/development/repositories/findByPk';
import { NotFoundError } from "#lib/http/errors";

httpTransport.handler.delete('/api/development/v1/:guid', DevelopmentPlanDeleteSchema, async (req) => {
  const { guid } = req.params;

  // Проверка существования плана развития
  const existingDevelopmentPlan = await findDevelopmentPlanByGuid(guid);
  if (!existingDevelopmentPlan) {
    throw new NotFoundError('План развития не найден');
  }

  // Удаление плана развития (soft delete)
  await deleteDevelopmentPlan(guid);
  
  return;
});