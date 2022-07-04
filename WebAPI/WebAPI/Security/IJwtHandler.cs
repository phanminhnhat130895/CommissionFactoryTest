using Microsoft.IdentityModel.Tokens;
using Services.ViewModels.Output;

namespace WebAPI.Security
{
    public interface IJwtHandler
    {
        string Create(UserViewModelOutput userVM);
        TokenValidationParameters Parameters { get; }
    }
}
