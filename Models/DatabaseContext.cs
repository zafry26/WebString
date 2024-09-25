using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols;
using RCB.JavaScript.Models;

namespace RCB.JavaScript.Models
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext() : base()
        {
        }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var builder = new ConfigurationBuilder()
                             .SetBasePath(Directory.GetCurrentDirectory())
                             .AddJsonFile($"appsettings.Development.json");
                var config = builder.Build();
                var connectionString = config.GetConnectionString("FreeProject");
                optionsBuilder.UseSqlServer(connectionString);

                base.OnConfiguring(optionsBuilder);
            }
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Hero> Hero { get; set; }
        public DbSet<Developer> Developers { get; set; }
        public DbSet<HeroSummary> HeroSummaries { get; set; }
        public DbSet<HeroEducation> HeroEducations { get; set; }
        public DbSet<HeroExperience> HeroExperiences { get; set; }
        public DbSet<HeroExperienceDetail> HeroExperienceDetails { get; set; }
        public DbSet<HeroService> HeroServices { get; set; }
        public DbSet<HeroTechnical> HeroTechnicals { get; set; }
        public DbSet<HeroPortfolio> HeroPortfolios { get; set; }
        public DbSet<HeroPortfolioDetail> HeroPortfolioDetails { get; set; }
        public DbSet<HeroPortfolioImage> HeroPortfolioImages { get; set; }

        public DbSet<AdmStoreCategory> AdmStoreCategories { get; set; }
        public DbSet<AdmStorePayment> AdmStorePayments { get; set; }
        public DbSet<StoreCategory> StoreCategories { get; set; }
        public DbSet<StoreCategorySize> StoreCategorySizes { get; set; }
        public DbSet<StorePayment> StorePayments { get; set; }
        public DbSet<StoreSummary> StoreSummaries { get; set; }

        //FLUENT API. TO GIVE DEFAULT VALUE TO INSERTED ROW.
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .Property(p => p.CreatedAt)
                .HasDefaultValueSql("GetUtcDate()");

            modelBuilder.Entity<Hero>()
                .Property(p => p.CreatedAt)
                .HasDefaultValueSql("GetUtcDate()");


            modelBuilder.Entity<HeroSummary>()
                .Property(p => p.CreatedAt)
                .HasDefaultValueSql("GetUtcDate()");

            modelBuilder.Entity<HeroEducation>()
                .Property(p => p.CreatedAt)
                .HasDefaultValueSql("GetUtcDate()");

            modelBuilder.Entity<HeroExperience>()
                .Property(p => p.CreatedAt)
                .HasDefaultValueSql("GetUtcDate()");

            modelBuilder.Entity<HeroExperienceDetail>()
                .Property(p => p.CreatedAt)
                .HasDefaultValueSql("GetUtcDate()");

            modelBuilder.Entity<HeroService>()
                .Property(p => p.CreatedAt)
                .HasDefaultValueSql("GetUtcDate()");

            modelBuilder.Entity<HeroTechnical>()
                .Property(p => p.CreatedAt)
                .HasDefaultValueSql("GetUtcDate()");

            modelBuilder.Entity<HeroPortfolio>()
                .Property(p => p.CreatedAt)
                .HasDefaultValueSql("GetUtcDate()");

            modelBuilder.Entity<HeroPortfolioDetail>()
                .Property(p => p.CreatedAt)
                .HasDefaultValueSql("GetUtcDate()");

            modelBuilder.Entity<HeroPortfolioImage>()
                .Property(p => p.CreatedAt)
                .HasDefaultValueSql("GetUtcDate()");

            modelBuilder.Entity<Developer>()
                .Property(p => p.CreatedAt)
                .HasDefaultValueSql("GetUtcDate()");
        }
    }
}