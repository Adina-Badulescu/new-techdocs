using newTD.Models;
using Tokens;

namespace newTD.Repository
{
    public interface ITemplateRepository
    {
        public Task<IEnumerable<TemplatesList>> ListTemplates();
    }
}
