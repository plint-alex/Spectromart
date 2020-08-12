using AutoMapper;
using BusinessLayer.Services;
using BusinessLayer.Services.Contracts.Authentication;
using BusinessLayer.Services.Contracts.Entities;
using BusinessLayer.Services.Contracts.Files;
using DataAccess;
using DataAccess.Contracts;
using DataAccess.Services;
using JavaScriptEngineSwitcher.ChakraCore;
using JavaScriptEngineSwitcher.Core;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Text;

namespace Spectromart
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContext<ApplicationDbContext>(options =>
              options.UseSqlServer(
                  Configuration.GetConnectionString("DefaultConnection")),
                    ServiceLifetime.Transient);


            services.AddMemoryCache();
            services.AddControllersWithViews();
            services.AddRazorPages();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("authentification_security_key!qwe123"));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.RequireHttpsMetadata = false;
                        options.SaveToken = true;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidIssuer = "SpectromartPortal",
                            ValidAudience = "Spectromart",
                            IssuerSigningKey = key,
                            ValidateLifetime = true,
                            ValidateIssuerSigningKey = true,
                            ClockSkew = TimeSpan.Zero
                        };
                    });

            services.AddTransient<DbInitializer>();

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());



            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<IEntitiesService, EntitiesService>();
            services.AddScoped<IFilesService, FilesService>();

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IFileService, FileService>();
            services.AddScoped<IEntityService, EntityService>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DbInitializer dbInitializer)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseExceptionHandler(new ExceptionHandlerOptions
            {
                ExceptionHandler = new JsonExceptionMiddleware().Invoke
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapRazorPages();
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            JsEngineSwitcher.Current.DefaultEngineName = ChakraCoreJsEngine.EngineName;
            JsEngineSwitcher.Current.EngineFactories.AddChakraCore();


            dbInitializer.Seed(new List<(Guid Id, string Name, string Description, string Code, bool hidden, Guid? parentId)> {
                (new Guid("00000000-0000-0000-0000-000000000001"), "special", "","special", false, null),
                (new Guid("00000000-0000-0000-0001-000000000001"), "mainImage", "","mainImage", false ,new Guid("00000000-0000-0000-0000-000000000001")),
                (new Guid("00000000-0000-0000-0001-000000000002"), "image", "","image", false ,new Guid("00000000-0000-0000-0000-000000000001")),
                (new Guid("00000000-0000-0000-0001-000000000003"), "category", "", "category", false ,new Guid("00000000-0000-0000-0000-000000000001")),
                (new Guid("00000000-0000-0000-0001-000000000004"), "product", "", "product", false ,new Guid("00000000-0000-0000-0000-000000000001")),
                (new Guid("00000000-0000-0000-0001-000000000005"), "languge", "","languge", false ,new Guid("00000000-0000-0000-0000-000000000001")),
                (new Guid("00000000-0000-0000-0001-000000000006"), "name", "","name", false ,new Guid("00000000-0000-0000-0000-000000000001")),
                (new Guid("00000000-0000-0000-0001-000000000007"), "description", "","description", false ,new Guid("00000000-0000-0000-0000-000000000001")),
                (new Guid("00000000-0000-0001-0005-000000000001"), "russian", "ru","русский", false ,new Guid("00000000-0000-0000-0001-000000000005")),
                (new Guid("00000000-0000-0000-0000-000000000002"), "categories", "","categories", false , null),
                (new Guid("00000000-0000-0000-0000-000000000004"), "messages", "","messages", false , null),
                (new Guid("00000000-0000-0000-0000-000000000005"), "ProductSamplePreparation", "","ProductSamplePreparation", false , new Guid("00000000-0000-0000-0000-000000000001")),
                (new Guid("00000000-0000-0000-0000-000000000006"), "ProductConsole", "","ProductConsole", false , new Guid("00000000-0000-0000-0000-000000000001")),
                (new Guid("00000000-0000-0000-0000-000000000007"), "Characteristic", "","Characteristic", false , new Guid("00000000-0000-0000-0000-000000000001")),
                (new Guid("00000000-0000-0000-0000-000000000008"), "News", "","News", false , null),
            }).Wait();
        }
    }
}
