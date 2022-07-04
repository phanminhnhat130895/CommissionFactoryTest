using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Security;

namespace WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            // jwt handler
            builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("jwt_settings"));
            builder.Services.AddSingleton<IJwtHandler, JwtHandler>();

            DependencyInjection.Start(builder);

            // add cors
            builder.Services.AddCors();

            var serviceProvider = buildServiceProvider(builder.Services);

            // add authenticate
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.TokenValidationParameters = serviceProvider.GetService<IJwtHandler>().Parameters;
                //options.TokenValidationParameters = new TokenValidationParameters
                //{
                //    ValidateIssuer = true,
                //    ValidateAudience = true,
                //    ValidateLifetime = true,
                //    ValidateIssuerSigningKey = true,
                //    ValidIssuer = Configuration["Jwt:Issuer"],
                //    ValidAudience = Configuration["Jwt:Issuer"],
                //    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                //};

                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                        {
                            context.Response.Headers.Add("Token-Expired", "true");
                        }

                        return Task.CompletedTask;
                    }
                };
            });

            builder.Services.AddMvc()
                            .AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

            var app = builder.Build();

            // Configure the HTTP request pipeline.

            // authenticate
            app.UseAuthentication();

            // cors
            app.UseCors(builder =>
            {
                //builder.WithOrigins(Configuration["Origins"]).AllowAnyHeader().AllowAnyMethod();
                builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
            });

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });

            app.Run();
        }

        static ServiceProvider buildServiceProvider(IServiceCollection serivces)
        {
            return serivces.BuildServiceProvider();
        }
    }
}