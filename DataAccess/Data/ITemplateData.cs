using DataAccess.Models;

namespace DataAccess.Data
{
    public interface ITemplateData
    {
        Task DeleteTemplate(Guid id);
        Task<TemplateModel?> GetTemplate(Guid id);
        Task<IEnumerable<TemplateModel>> GetTemplates();
        Task InsertTemplate(TemplateModel template);
        Task UpdateTemplate(TemplateModel template);
    }
}