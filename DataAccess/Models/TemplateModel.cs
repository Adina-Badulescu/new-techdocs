using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class TemplateModel
    {
        public string Id { get; set; } = String.Empty;
        public string Title { get; set; } = String.Empty;         
        public string Description { get; set; } = String.Empty; 
        public string MainColors { get; set; } = String.Empty;
        public int ResponsiveColumns { get; set; } = 0;   
    }
}