using DataAccess.DbAccess;
using DataAccess.Models;
using Microsoft.Extensions.Logging;

namespace DataAccess.Data
{
    public class TemplateData : ITemplateData
    {
        private readonly ISqlDataAccess _db;
        private readonly ILogger _logger;
        public TemplateData(ISqlDataAccess db, ILogger<TemplateData> logger)
        {
            _db = db;
            _logger = logger;
        }

        public async Task<IEnumerable<TemplateModel>> GetTemplates(int numberOfResults, string? searchString)
        {
            try
            {
                return await _db.LoadData<TemplateModel, dynamic>("dbo.spTemplate_getAll", new { numberOfResults, searchString });
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in GetTemplates() " + ex.Message);
                throw;
            }

        }


        public async Task<TemplateModel?> GetTemplate(Guid id)
        {
            try
            {


                var result = await _db.LoadData<TemplateModel, Guid>("dbo.spTemplate_Get", id );
                return result.FirstOrDefault();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in GetTemplate() " + ex.Message);
                throw;
            }
        }

        public async Task InsertTemplate(TemplateModel template)
        {
            try
            {
                await _db.SaveData("dbo.spTemplate_Insert", new { template.Title, template.Description, template.MainColors, template.ResponsiveColumns, template.ImgPath });
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in InsertTemplate() " + ex.Message);
                throw;
            }
        }

        public async Task UpdateTemplate(TemplateModel template)
        {
            try
            {
                await _db.SaveData("dbo.spTemplate_Update", template);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in UpdateTemplate() " + ex.Message);
                throw;
            }
        }

        public async Task DeleteTemplate(Guid Id)
        {
            try
            {
                await _db.SaveData("dbo.spTemplate_Delete", new { Id });
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in DeleteTemplate() " + ex.Message);
                throw;
            }
        }



    }
}
