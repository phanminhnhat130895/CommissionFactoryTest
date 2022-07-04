using Services.ViewModels.Input;
using Services.ViewModels.Output;

namespace Services.Interfaces
{
    public interface IUserService
    {
        Task<bool> CreateUser(CreateUserInput input);
        Task<UserViewModelOutput> Authenticate(UserLoginInput input);
    }
}
