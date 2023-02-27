using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class TemplateParamsModel
    {
        public Guid? ParamId { get; set; }
        public string? ParamTitle { get; set; } = string.Empty;
        public string? ParamDescription { get; set; } = string.Empty;
        public string? ParamMainColors { get; set; } = string.Empty; 
        public int? ParamResponsiveColumns { get; set; } = 0;

    }
}
