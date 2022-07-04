using Microsoft.EntityFrameworkCore;
using Repositories;
using Repositories.Implementations;
using Repositories.Interfaces;
using Services.Implementations;
using Services.Interfaces;

namespace WebAPI
{
    public class DependencyInjection
    {
        public static void Start(WebApplicationBuilder builder)
        {
            builder.Services.AddDbContext<DatabaseContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
            });

            builder.Services.AddTransient<ITaskRepository, TaskRepository>();
            builder.Services.AddTransient<ITaskService, TaskService>();

            builder.Services.AddTransient<IUserRepository, UserRepository>();
            builder.Services.AddTransient<IUserService, UserService>();
        }
    }
}
