using System.Text;
using API._Repositories.Interfaces;
using API._Repositories.Repositories;
using API._Servieces.Interfaces;
using API._Servieces.Services;
using API.Data;
using API.Helpers.AutoMapper;
using API.Helpers.Utilities;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ProjectContext>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
//add Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(o =>
{
    o.RequireHttpsMetadata = false;
    o.SaveToken = true;
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value)),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});
// Add AutoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<IMapper>(sp => new Mapper(AutoMapperConfig.RegisterMappings()));
builder.Services.AddSingleton(AutoMapperConfig.RegisterMappings());

// Add Scoped
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IRolesRepository, RolesRepository>();
builder.Services.AddScoped<IRoleUserRepository, RoleUserRepository>();
builder.Services.AddScoped<INewsRepository, NewsRepository>();
builder.Services.AddScoped<IProduct_Service_CategoryRepository, Product_Service_CategoryRepository>();
builder.Services.AddScoped<IProduct_ServiceRepository, Product_ServiceRepository>();
//Add service
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUsersService, UsersService>();
builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddScoped<INewsService, NewsService>();
builder.Services.AddScoped<IProduct_Service_CategoryService, Product_Service_CategoryService>();

// Add Middleware
builder.Services.AddTransient<ExceptionHandlingMiddleware>();
builder.Services.AddCors();
// Set Aspose License
AsposeCellsUtility.SetLicense();
//add SwaggerGen
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "GHF_API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please insert JWT with Bearer into field",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseRouting();

app.UseAuthorization();

app.UseStaticFiles();

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.MapControllers();

app.Run();