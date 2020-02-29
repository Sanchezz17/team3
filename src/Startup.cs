using System.Reflection;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using thegame.DTO;
using thegame.Game;
using thegame.Repositories;

namespace thegame
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
            services.AddAutoMapper(cfg =>
            {
                cfg.CreateMap<Game.Game, GameDTO>()
                    .ForMember(dest => dest.Field, opt => opt.MapFrom(src => src.Field.Field))
                    .ForMember(dest => dest.Height, opt => opt.MapFrom(src => src.Field.Height))
                    .ForMember(dest => dest.IsFinished, opt => opt.MapFrom(src => src.IsGameFinished))
                    .ForMember(dest => dest.Width, opt => opt.MapFrom(src => src.Field.Width));
            }, new Assembly[0]);
            services.AddRouting(options => options.LowercaseUrls = true);
            services.AddSingleton<IGameRepository, InMemoryGameRepository>();
            services.AddSingleton<IGameFieldGenerator, RandomGameFieldGenerator>((s)=> new RandomGameFieldGenerator(Game.Game.Difficulties));
            services.AddMvc()
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    options.SerializerSettings.DefaultValueHandling = DefaultValueHandling.Populate;
                })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseDeveloperExceptionPage();
            if (env.IsDevelopment())
            {
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
            }

            app.UseStaticFiles();
            app.UseMvc();
            app.UseSpa(spa => { spa.Options.SourcePath = "ClientApp"; });
        }
    }
}