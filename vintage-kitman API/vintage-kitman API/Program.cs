using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using System.Text;
using vintage_kitman_API.Data.Repositories.Authentication;
using vintage_kitman_API.Data.Repositories.Categories;
using vintage_kitman_API.Data.Repositories.Orders;
using vintage_kitman_API.Data.Repositories.Products;
using vintage_kitman_API.Model;
using vintage_kitman_API.NewFolder;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(
    options => options.AddDefaultPolicy(include =>
    {
        include.AllowAnyHeader();
        include.AllowAnyMethod();
        include.AllowAnyOrigin();
    }));



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();


builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("AzureDBConnection"),
    sqlServerOptionsAction: sqlOptions =>
    {
        sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5, // Adjust the maximum number of retries
            maxRetryDelay: TimeSpan.FromSeconds(30), // Adjust the delay between retries
            errorNumbersToAdd: null // You can specify specific error numbers to trigger retries
        );
    });
    options.EnableSensitiveDataLogging();

});
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<ICategoriesRepository, CategoriesRepository>();
builder.Services.AddScoped<IProductsRepository, ProductsRepository>();
builder.Services.AddScoped<IOrdersRepository, OrdersRepository>();

builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
    options.AddPolicy("Customer", policy => policy.RequireRole("Customer"));
});
// loop handling

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
   .AddJwtBearer(options =>
   {
       options.RequireHttpsMetadata = false;
       options.SaveToken = true;
       options.TokenValidationParameters = new TokenValidationParameters
       {
           ValidateIssuer = true,
           ValidateAudience = true,
           ValidateLifetime = true,
           ValidateIssuerSigningKey = true,
           ValidIssuer = builder.Configuration["Jwt:Issuer"],
           ValidAudience = builder.Configuration["Jwt:Audience"],
           IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"]))
       };
   });
//Add email config



builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequiredLength = 5;
    options.Password.RequireUppercase = true;
    options.User.RequireUniqueEmail = true;
})
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();
app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());
app.UseAuthorization();

app.MapControllers();

app.Run();
