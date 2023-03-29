using DataAccess.Models;

namespace newTD.UserService
{
    public interface IUserService
    {
        void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
        string CreateToken(UserModel _user);
        RefreshToken GenerateRefreshToken();
        string GetMyName();
        void SetRefreshToken(RefreshToken newRefreshToken);
        bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt);
    }
}