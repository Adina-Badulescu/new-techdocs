using DataAccess.DbAccess;
using DataAccess.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Data
{
    public class UserData : IUserData

    {
        private readonly ISqlDataAccess _db;
        private readonly ILogger _logger;
        public UserData(ISqlDataAccess db, ILogger<TemplateData> logger)
        {
            _db = db;
            _logger = logger;
        }

        public async Task<UserModel?> GetUser(string Email)
        {
            try
            {
                var result = await _db.LoadData<UserModel, dynamic>("dbo.spUser_Get", new { Email });
                return result.FirstOrDefault();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in GetUser() " + ex.Message);
                throw;
            }
        }

        public async Task CreateUser(UserModel user)
        {
            try
            {
                _logger.LogInformation("_user.Username" + user.Email);                
                await _db.SaveData("dbo.spUser_Create", new { user.Email, user.PasswordHash, user.PasswordSalt, user.RefreshToken, user.TokenCreated, user.TokenExpires });
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in CreateUser() " + ex.Message);
                throw;
            }
        }

        public async Task UpdateUser(UserModel user)
        {
            try
            {
                await _db.SaveData("dbo.spUser_Update", user);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in UpdateUser() " + ex.Message);
                throw;
            }
        }

        public async Task DeleteUser(string email)
        {
            try
            {
                await _db.SaveData("dbo.spUser_Delete", new { email });
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in DeleteUser() " + ex.Message);
                throw;
            }
        }
    }
}
