using API.Configurations;
using API.Helpers.Utilities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

//add Database
builder.Services.AddDbContextUtilities(builder.Configuration);

//add Authentication
builder.Services.AddAuthenticationUtilities(builder.Configuration);

// Add AutoMapper
builder.Services.AddAutoMapperUtilities();

//add Dependency
builder.Services.AddDependencyUtilities();

// Add Middleware
builder.Services.AddTransient<ExceptionHandlingMiddleware>();

//add Cors
builder.Services.AddCors();

// Set Aspose License
AsposeCellsUtility.SetLicense();

//add SwaggerGen
builder.Services.AddSwaggerGenUtilities();


//Build
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