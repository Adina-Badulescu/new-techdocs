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
        public string? Title { get; set; } 
        public string? Description { get; set; } 
        public IFormFileCollection? Files { get; set; }
        public string? EntryDirectory { get; set;}
        public string? MainColors { get; set; }
        public int? ResponsiveColumns { get; set; }
        public string? ImgPath { get; set; }
        public int? NumberOfTemplates { get; set; } 
    }

}