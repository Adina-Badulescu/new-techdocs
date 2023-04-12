using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class TemplateModel
    {
        public Guid TemplateId { get; set; } 
        public string? Title { get; set; } = string.Empty;         
        public string? Description { get; set; } = string.Empty;
        public IFormFileCollection? Content { get; set; }
        //public List<IFormFile> Content { get; set; }
        public string? MainColors { get; set; } = string.Empty;
        public int? ResponsiveColumns { get; set; } = 0;
        public string? ImgPath { get; set; } = string.Empty;
        public int? NumberOfTemplates { get; set; } = 0;
    }

}