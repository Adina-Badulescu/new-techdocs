using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class AuthResponse
    {
        public AuthResponse(bool result, string errors)
        {
            //Token = token; 
            Result = result;
            Errors = errors;
        }
        //public string Token { get; set; } = string.Empty;
        public bool Result { get; set; }
        public string Errors { get; set; } = string.Empty;
    }
}
