using Microsoft.EntityFrameworkCore;
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
                string cn = @"";
                optionsBuilder.UseMySql(cn);

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
    }
}