using Dapper;
using newTD.Context;
using newTD.Models;

namespace newTD.Repository
{
    public class TemplatesRepository : ITemplateRepository
    {
        private readonly DbContext _context;

        public TemplatesRepository(DbContext context)
        {
            _context = context;           
        }

        public async Task<IEnumerable<TemplatesList>> ListTemplates()
        {
            var getAllTemplates = "SELECT * FROM dbo.templates";

            using (var connection = _context.CreateaConection())
            {
                var companies = await connection.QueryAsync<TemplatesList>(getAllTemplates);
                return companies.ToList();
            }
        }

    }
}
