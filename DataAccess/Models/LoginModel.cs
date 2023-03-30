using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class LoginModel
    {
        [Required (ErrorMessage = "The Email is required")]
        [EmailAddress]
        public string? Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "The Password is required")]
        public string Password { get; set; } = string.Empty;
    }
}
