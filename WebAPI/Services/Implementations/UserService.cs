using Repositories.Interfaces;
using Repositories.Models;
using Services.Interfaces;
using Services.ViewModels.Input;
using Services.ViewModels.Output;

namespace Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserViewModelOutput> Authenticate(UserLoginInput input)
        {
            var result = new UserViewModelOutput();
            try
            {
                var user = await _userRepository.Authenticate(input.Email.Trim());

                if(user == null || !BCrypt.Net.BCrypt.Verify(input.Password.Trim(), user.Password))
                {
                    result.message = "Username or password incorrect";
                    result.isSuccess = false;
                    return result;
                }

                result.ID = user.ID;
                result.Email = user.Email;
                result.message = "Login success";
                result.isSuccess = true;
                
                return result;
            }
            catch(Exception ex)
            {
                // TODO: log exception
                result.message = "Login failed";
                result.isSuccess = false;
                return result;
            }
        }

        public async Task<bool> CreateUser(CreateUserInput input)
        {
            try
            {
                var user = new Users();
                user.ID = Guid.NewGuid().ToString();
                user.Email = input.Email.Trim();
                user.Password = BCrypt.Net.BCrypt.HashPassword(input.Password.Trim());

                await _userRepository.CreateUser(user);

                return true;
            }
            catch(Exception ex)
            {
                // TODO: log exception
                return false;
            }
        }
    }
}
