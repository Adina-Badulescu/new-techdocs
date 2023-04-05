
namespace DataAccess.Models
{
    public class UserModel
    {
        public string? Email { get; set; } = string.Empty;
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordSalt { get; set; }
        public string? RefreshToken { get; set; } = string.Empty;
        public DateTime TokenCreated { get; set; } 
        public DateTime TokenExpires { get; set; }
        public int? IsAdmin { get; set; } = (int)Role.user;
    }
    public enum Role
    {
        user = 0,
        admin = 1
    }

}
