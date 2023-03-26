using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DataAccess.Models;
using System.Security.Cryptography;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using newTD.UserService;

namespace newTD.Controllers
{    
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;
        private readonly IConfiguration _configuration;
        private static UserModel _user = new UserModel();
        private readonly IUserService _userService;

        public AuthController(ILogger<AuthController> logger, IConfiguration configuration, IUserService userService)
        {
            _logger = logger;
            _configuration = configuration;            
            _userService = userService;
        }

        
        [HttpPost("Register")]
        public async Task<ActionResult<UserModel>> Register(LoginModel request)
        {
            try
            {
                CreatePasswordHash(request.Email, out byte[] passwordHash, out byte[] passwordSalt);
                _user.Email = request.Email;
                _user.PasswordHash = passwordHash;
                _user.PasswordSalt = passwordSalt;

                return Ok(_user);
            }
            catch (Exception ex)
            {
                _logger.LogError("error into Template Controller on Register() " + ex.Message);
                throw;
            }

        }

        [HttpPost("Login")]
        public async Task<ActionResult<string>> Login(LoginModel request)
        {
            try
            {
                if (_user.Email != request.Email)
                {
                    return BadRequest("User or Password Wrong");
                }
                if (!VerifyPasswordHash(request.Password, _user.PasswordHash, _user.PasswordSalt))
                {
                    return BadRequest("User or Password Wrong");
                }

                string token = CreateToken(_user);
                var refreshToken = GenerateRefreshToken();
                SetRefreshToken(refreshToken);

                return Ok(token);
            }
            catch (Exception ex)
            {
                _logger.LogError("error into Template Controller on Login() " + ex.Message);
                throw;
            }

        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<string>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (!_user.RefreshToken.Equals(refreshToken))
            {
                return Unauthorized("Invalid Refresh Token.");
            }
            else if (_user.TokenExpires < DateTime.Now)
            {
                return Unauthorized("Token expired.");
            }

            string token = CreateToken(_user);
            var newRefreshToken = GenerateRefreshToken();
            SetRefreshToken(newRefreshToken);

            return Ok(token);
        }

        [HttpGet, Authorize]
        public ActionResult<string> GetMe()
        {
            var username = _userService.GetMyName();
            return Ok(username);
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512(passwordSalt);
            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(passwordHash);
        }

        private string CreateToken(UserModel _user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, _user.Email),
                new Claim(ClaimTypes.Role, "Admin")
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
        private RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.Now.AddDays(7),
                Created = DateTime.Now
            };

            return refreshToken;
        }

        private void SetRefreshToken(RefreshToken newRefreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires
            };
            Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

            _user.RefreshToken = newRefreshToken.Token;
            _user.TokenCreated = newRefreshToken.Created;
            _user.TokenExpires = newRefreshToken.Expires;
        }

    }
}
