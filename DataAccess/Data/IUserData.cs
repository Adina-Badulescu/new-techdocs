using DataAccess.Models;

namespace DataAccess.Data
{
    public interface IUserData
    {
        Task CreateUser(UserModel user);
        Task DeleteUser(string email);
        Task<UserModel?> GetUser(string username);
        Task UpdateUser(UserModel user);
    }
}