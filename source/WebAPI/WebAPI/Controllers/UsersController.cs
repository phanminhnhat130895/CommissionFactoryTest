using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Services.ViewModels.Input;
using Services.ViewModels.Output;
using WebAPI.Security;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IJwtHandler _jwtHandler;

        public UsersController(IUserService userService,
                               IJwtHandler jwtHandler)
        {
            _userService = userService;
            _jwtHandler = jwtHandler;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginInput input)
        {
            var result = new LoginOutput();

            var user = await _userService.Authenticate(input);

            result.message = user.message;

            if (user.isSuccess == false)
            {
                return Ok(result);
            }

            result.Token = _jwtHandler.Create(user);
            return Ok(result);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(CreateUserInput input)
        {
            return Ok(await _userService.CreateUser(input));
        }

        [HttpGet("is-authenticated")]
        [Authorize]
        public IActionResult IsAuthenticated()
        {
            return Ok(true);
        }
    }
}
