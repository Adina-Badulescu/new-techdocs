using Microsoft.AspNetCore.Mvc;
using DataAccess.Models;
using Microsoft.AspNetCore.Authorization;
using newTD.UserService;
using Tokens;


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
                    _user.Email = request.Email;
                    _user.PasswordHash = passwordHash;
                    _user.PasswordSalt = passwordSalt;
                    _user.RefreshToken = string.Empty;
                    _user.TokenCreated = DateTime.UtcNow;
                    _user.TokenExpires = DateTime.UtcNow;
                   
                    await _userData.CreateUser(_user);
                    var token = _userService.CreateToken(_user);                    

                    return Ok(new AuthResponse(true, string.Empty, token));
                }

                return BadRequest(new AuthResponse(false, "An Error occured in creating a new user", string.Empty));
                
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
            {   if(ModelState.IsValid)
                {
                    UserModel userData = await _userData.GetUser(request.Email);                    
                    
                    if (userData?.ToString() is not null)
                    {
                        if (userData.Email != request.Email)
                        {
                            return BadRequest(new AuthResponse(false, "Wrong Credentials", string.Empty));
                        }
                        if (!_userService.VerifyPasswordHash(request.Password, userData.PasswordHash, userData.PasswordSalt))
                        {                            
                            return BadRequest(new AuthResponse(false, "Wrong Credentials", string.Empty));
                        }

                        string token = _userService.CreateToken(userData);
                        var refreshToken = _userService.GenerateRefreshToken();
                        _userService.SetRefreshToken(refreshToken);

                        return Ok(new AuthResponse(true, string.Empty, token));
                    }
                }

                return BadRequest(new AuthResponse(false, "User or Email not provided", string.Empty));
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
                return Unauthorized(new AuthResponse(false, "Invalid Refresh Token.", string.Empty));
            }
            else if (_user.TokenExpires < DateTime.Now)
            {
                return Unauthorized(new AuthResponse(false, "Token expired.", string.Empty));
            }

            string token = _userService.CreateToken(_user);
            var newRefreshToken = _userService.GenerateRefreshToken();
            _userService.SetRefreshToken(newRefreshToken);

            return Ok(new AuthResponse(true, string.Empty, token));
        }

        [HttpGet("GetUser"), Authorize]
        public ActionResult<string> GetMe()
        {
            var username = _userService.GetMyName();
            return Ok(username);
        }


    }
}
