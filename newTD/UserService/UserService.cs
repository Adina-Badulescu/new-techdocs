using Azure;
using DataAccess.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using newTD.Controllers;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;


namespace newTD.UserService
{
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IConfiguration _configuration;
        private readonly ILogger<UserService> _logger;
        private UserModel _user;

        public UserService(IHttpContextAccessor httpContextAccessor, IConfiguration configuration, ILogger<UserService> logger, UserModel user)
        {
            _httpContextAccessor = httpContextAccessor;
            _configuration = configuration;
            _logger = logger;
            _user = user;
        }

        public string GetMyName()
        {
            var result = string.Empty;
            if (_httpContextAccessor.HttpContext != null)
            {
                result = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);
            }
            return result;
        }

        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            //_logger.LogInformation(password);
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        public string CreateToken(UserModel? user)
        {
            List<Claim> claims;
            SymmetricSecurityKey key;
            SigningCredentials creds;
            JwtSecurityToken token;
            string jwt;

            if (user?.IsAdmin == 1)
            {
                claims = new List<Claim>
                {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, Role.Admin.ToString())
                };

                key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

                creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

                token = new JwtSecurityToken(
                        claims: claims,
                        expires: DateTime.Now.AddHours(1),
                        signingCredentials: creds);

                jwt = new JwtSecurityTokenHandler().WriteToken(token);

                return jwt;
            }

            claims = new List<Claim>
            {
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, Role.User.ToString())
            };


            key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddHours(1),
                    signingCredentials: creds);

            jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }



        public RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.Now.AddHours(3),
                Created = DateTime.Now
            };

            return refreshToken;
        }

        public void SetRefreshToken(RefreshToken newRefreshToken)
        {
            HttpResponse httpResponse = null;
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires
            };
            httpResponse?.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

            _user.RefreshToken = newRefreshToken.Token;
            _user.TokenCreated = newRefreshToken.Created;
            _user.TokenExpires = newRefreshToken.Expires;
        }


    }
}
