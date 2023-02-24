﻿using DataAccess.Models;

namespace DataAccess.Data
{
    public interface ITemplateData
    {
        Task DeleteTemplate(string id);
        Task<TemplateModel?> GetTemplate(string id);
        Task<IEnumerable<TemplateModel>> GetTemplates();
        Task InsertTemplate(TemplateModel template);
        Task UpdateTemplate(TemplateModel template);
    }
}