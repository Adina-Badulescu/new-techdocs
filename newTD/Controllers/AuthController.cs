using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DataAccess.Models;
using System.Security.Cryptography;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using newTD.UserService;
using Microsoft.Extensions.Logging;
using System.Text;

namespace newTD.Controllers
{    
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;        
        //private UserModel _user = new();
        private UserModel _user;
        private readonly IUserService _userService;
        private readonly IUserData _userData;

        public AuthController(ILogger<AuthController> logger, IUserService userService, IUserData userData, UserModel userModel)
        {
            _logger = logger;                       
            _userService = userService;
            _userData = userData;
            _user = userModel;
        }

        
        [HttpPost("Register")]
        public async Task<ActionResult<UserModel>> Register(LoginModel request)
        {
            try
            {
                
                if(ModelState.IsValid)
                {
                    
                    _userService.CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
                    _user.Username = request.Username;
                    _user.PasswordHash = passwordHash;
                    _user.PasswordSalt = passwordSalt;
                    _user.RefreshToken = string.Empty;
                    _user.TokenCreated = DateTime.UtcNow;
                    _user.TokenExpires = DateTime.UtcNow;
                   
                    await _userData.CreateUser(_user);
                    _logger.LogInformation("_user.Username 1 " + _user.Username);

                    return Ok(new AuthResponse(true, string.Empty));
                }

                return BadRequest(new AuthResponse(false, "An Error occured in creating a new user"));
                
            }
            catch (Exception ex)
            {
                _logger.LogError("error into Auth Controller on Register() " + ex.Message);
                throw;
            }

        }

        [HttpPost("Login")]
        public async Task<ActionResult<string>> Login(LoginModel request)
        {
            try
            {

                if (_user.Username != request.Username)
                {
                    _logger.LogInformation("_user.Username" + _user.Username);
                    _logger.LogInformation("request.Username" + request.Username);                    
                    _logger.LogInformation("request.Password" + request.Password);
                    return BadRequest("Wrong Username");
                }
                if (!_userService.VerifyPasswordHash(request.Password, _user.PasswordHash, _user.PasswordSalt))
                {
                    //_logger.LogInformation("LOGIN: " + System.Text.Encoding.UTF8.GetString(_user.PasswordHash, 0, _user.PasswordHash.Length) + " " + System.Text.Encoding.UTF8.GetString(_user.PasswordSalt, 0, _user.PasswordSalt.Length));
                    return BadRequest("User or Password Wrong");
                }

                string token = _userService.CreateToken(_user);
                var refreshToken = _userService.GenerateRefreshToken();
                _userService.SetRefreshToken(refreshToken);

                return Ok(token);
            }
            catch (Exception ex)
            {
                _logger.LogError("error into Auth Controller on Login() " + ex.Message);
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

            string token = _userService.CreateToken(_user);
            var newRefreshToken = _userService.GenerateRefreshToken();
            _userService.SetRefreshToken(newRefreshToken);

            return Ok(token);
        }

        [HttpGet, Authorize]
        public ActionResult<string> GetMe()
        {
            var username = _userService.GetMyName();
            return Ok(username);
        }

        //private void SetRefreshToken(RefreshToken newRefreshToken)
        //{
        //    var cookieOptions = new CookieOptions
        //    {
        //        HttpOnly = true,
        //        Expires = newRefreshToken.Expires
        //    };
        //    Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

        //    _user.RefreshToken = newRefreshToken.Token;
        //    _user.TokenCreated = newRefreshToken.Created;
        //    _user.TokenExpires = newRefreshToken.Expires;
        //}

    }
}
