import { httpTransport } from "#infrastructure/fastify";
import ProjectListSchema from '#app/project/schemas/list';
import getProjectList from '#app/project/repositories/list';
  
// Весовые коэффициенты для каждого типа проекта
const weights = {
  'Предложения по улучшению': 1,
  'Наставничество': 0.5,
  'Синертимы': 0.3
};

httpTransport.handler.get('/api/project/v1/list', ProjectListSchema, async (req) => {
  const { userGuid } = req.query;

  const projects = await getProjectList({ userGuid });

  const coefficient = projects.reduce((sum, project) => {
    if (project.factNumber > project.planNumber) {
      return sum + (weights[project.name] || 0);
    }

    return sum;
  }, 0);

  return { coefficient, projects };
});