using Repositories.Models;

namespace Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task CreateUser(Users user);
        Task<Users> Authenticate(string userName);
    }
}
