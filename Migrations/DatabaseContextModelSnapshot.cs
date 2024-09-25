﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RCB.JavaScript.Models;

namespace RCB.JavaScript.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.32")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("RCB.JavaScript.Models.AdmStoreCategory", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CategoryName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2");

                    b.Property<long>("CreatedBy")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.ToTable("AdmStoreCategories");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.AdmStorePayment", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2");

                    b.Property<long>("CreatedBy")
                        .HasColumnType("bigint");

                    b.Property<string>("PaymentCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PaymentName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PaymentStatus")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("AdmStorePayments");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.Developer", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("GetUtcDate()");

                    b.Property<long>("CreatedBy")
                        .HasColumnType("bigint");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<string>("Hobby")
                        .HasColumnType("nvarchar(500)")
                        .HasMaxLength(500);

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<string>("Skillsets")
                        .IsRequired()
                        .HasColumnType("nvarchar(500)")
                        .HasMaxLength(500);

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("Developers");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.Hero", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BackgroundImage")
                        .HasColumnType("nvarchar(500)")
                        .HasMaxLength(500);

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("GetUtcDate()");

                    b.Property<long>("CreatedBy")
                        .HasColumnType("bigint");

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<string>("FbUrl")
                        .HasColumnType("nvarchar(500)")
                        .HasMaxLength(500);

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<string>("InstagramUrl")
                        .HasColumnType("nvarchar(500)")
                        .HasMaxLength(500);

                    b.Property<string>("LinkedInUrl")
                        .HasColumnType("nvarchar(500)")
                        .HasMaxLength(500);

                    b.Property<string>("Standout")
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<int?>("UserForeignKey")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserForeignKey")
                        .IsUnique()
                        .HasFilter("[UserForeignKey] IS NOT NULL");

                    b.ToTable("Hero");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.HeroEducation", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Country")
                        .HasColumnType("nvarchar(20)")
                        .HasMaxLength(20);

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("GetUtcDate()");

                    b.Property<long>("CreatedBy")
                        .HasColumnType("bigint");

                    b.Property<string>("FromYear")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("HeroForeignKey")
                        .HasColumnType("bigint");

                    b.Property<string>("Qualification")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<string>("State")
                        .HasColumnType("nvarchar(20)")
                        .HasMaxLength(20);

                    b.Property<string>("ToYear")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("University")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.HasIndex("HeroForeignKey");

                    b.ToTable("HeroEducations");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.HeroExperience", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(20)")
                        .HasMaxLength(20);

                    b.Property<string>("Company")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<string>("Country")
                        .HasColumnType("nvarchar(20)")
                        .HasMaxLength(20);

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("GetUtcDate()");

                    b.Property<long>("CreatedBy")
                        .HasColumnType("bigint");

                    b.Property<string>("FromYear")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("HeroForeignKey")
                        .HasColumnType("bigint");

                    b.Property<string>("PositionTitle")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<string>("State")
                        .HasColumnType("nvarchar(20)")
                        .HasMaxLength(20);

                    b.Property<string>("ToYear")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("HeroForeignKey");

                    b.ToTable("HeroExperiences");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.HeroExperienceDetail", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("GetUtcDate()");

                    b.Property<long>("CreatedBy")
                        .HasColumnType("bigint");

                    b.Property<long?>("ExperienceForeignKey")
                        .HasColumnType("bigint");

                    b.Property<string>("WorkScope")
                        .HasColumnType("nvarchar(500)")
                        .HasMaxLength(500);

                    b.HasKey("Id");

                    b.HasIndex("ExperienceForeignKey");

                    b.ToTable("HeroExperienceDetails");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.HeroPortfolio", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Category")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("GetUtcDate()");

                    b.Property<long>("CreatedBy")
                        .HasColumnType("bigint");

                    b.Property<long?>("HeroForeignKey")
                        .HasColumnType("bigint");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(200)")
                        .HasMaxLength(200);

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("HeroForeignKey");

                    b.ToTable("HeroPortfolios");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.HeroPortfolioDetail", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Category")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("GetUtcDate()");

                    b.Property<long>("CreatedBy")
                        .HasColumnType("bigint");

                    b.Property<string>("Detail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<long?>("PortfolioForeignKey")
                        .HasColumnType("bigint");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("PortfolioForeignKey")
                        .IsUnique()
                        .HasFilter("[PortfolioForeignKey] IS NOT NULL");

                    b.ToTable("HeroPortfolioDetails");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.HeroPortfolioImage", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("GetUtcDate()");

                    b.Property<long>("CreatedBy")
                        .HasColumnType("bigint");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<long?>("PortfolioDetailForeignKey")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("PortfolioDetailForeignKey");

                    b.ToTable("HeroPortfolioImages");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.HeroService", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("GetUtcDate()");

                    b.Property<long>("CreatedBy")
                        .HasColumnType("bigint");

                    b.Property<string>("Detail")
                        .HasColumnType("nvarchar(500)")
                        .HasMaxLength(500);

                    b.Property<long?>("HeroForeignKey")
                        .HasColumnType("bigint");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(200)")
                        .HasMaxLength(200);

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.HasIndex("HeroForeignKey");

                    b.ToTable("HeroServices");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.HeroSummary", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(20)")
                        .HasMaxLength(20);

                    b.Property<string>("Country")
                        .HasColumnType("nvarchar(20)")
                        .HasMaxLength(20);

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("GetUtcDate()");

                    b.Property<long>("CreatedBy")
                        .HasColumnType("bigint");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<long?>("HeroForeignKey")
                        .HasColumnType("bigint");

                    b.Property<string>("State")
                        .HasColumnType("nvarchar(20)")
                        .HasMaxLength(20);

                    b.Property<string>("Summary")
                        .HasColumnType("nvarchar(300)")
                        .HasMaxLength(300);

                    b.HasKey("Id");

                    b.HasIndex("HeroForeignKey")
                        .IsUnique()
                        .HasFilter("[HeroForeignKey] IS NOT NULL");

                    b.ToTable("HeroSummaries");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.HeroTechnical", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("GetUtcDate()");

                    b.Property<long>("CreatedBy")
                        .HasColumnType("bigint");

                    b.Property<string>("Detail")
                        .HasColumnType("nvarchar(500)")
                        .HasMaxLength(500);

                    b.Property<long?>("HeroForeignKey")
                        .HasColumnType("bigint");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(200)")
                        .HasMaxLength(200);

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.HasIndex("HeroForeignKey");

                    b.ToTable("HeroTechnicals");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2");

                    b.Property<string>("RoleName")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.StoreCategory", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long?>("AdmStoreCategoryForeignKey")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2");

                    b.Property<long>("CreatedBy")
                        .HasColumnType("bigint");

                    b.Property<long?>("StoreSummaryForeignKey")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("AdmStoreCategoryForeignKey")
                        .IsUnique()
                        .HasFilter("[AdmStoreCategoryForeignKey] IS NOT NULL");

                    b.HasIndex("StoreSummaryForeignKey");

                    b.ToTable("StoreCategories");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.StoreCategorySize", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2");

                    b.Property<long>("CreatedBy")
                        .HasColumnType("bigint");

                    b.Property<string>("SizeCode")
                        .HasColumnType("nvarchar(10)")
                        .HasMaxLength(10);

                    b.Property<string>("SizeName")
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<long?>("StoreCategoryForeignKey")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("StoreCategoryForeignKey");

                    b.ToTable("StoreCategorySizes");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.StorePayment", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long?>("AdmStorePaymentForeignKey")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2");

                    b.Property<long>("CreatedBy")
                        .HasColumnType("bigint");

                    b.Property<long?>("StoreSummaryId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("AdmStorePaymentForeignKey")
                        .IsUnique()
                        .HasFilter("[AdmStorePaymentForeignKey] IS NOT NULL");

                    b.HasIndex("StoreSummaryId");

                    b.ToTable("StorePayments");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.StoreSummary", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2");

                    b.Property<long>("CreatedBy")
                        .HasColumnType("bigint");

                    b.Property<string>("FbUrl")
                        .HasColumnType("nvarchar(500)")
                        .HasMaxLength(500);

                    b.Property<string>("InstagramUrl")
                        .HasColumnType("nvarchar(500)")
                        .HasMaxLength(500);

                    b.Property<string>("LinkedInUrl")
                        .HasColumnType("nvarchar(500)")
                        .HasMaxLength(500);

                    b.Property<string>("Logo")
                        .HasColumnType("nvarchar(500)")
                        .HasMaxLength(500);

                    b.Property<string>("Standout")
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<string>("StoreName")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<int?>("UserForeignKey")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserForeignKey")
                        .IsUnique()
                        .HasFilter("[UserForeignKey] IS NOT NULL");

                    b.ToTable("StoreSummaries");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("GetUtcDate()");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.Hero", b =>
                {
                    b.HasOne("RCB.JavaScript.Models.User", "User")
                        .WithOne("Hero")
                        .HasForeignKey("RCB.JavaScript.Models.Hero", "UserForeignKey");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.HeroEducation", b =>
                {
                    b.HasOne("RCB.JavaScript.Models.Hero", "Hero")
                        .WithMany("HeroEducations")
                        .HasForeignKey("HeroForeignKey");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.HeroExperience", b =>
                {
                    b.HasOne("RCB.JavaScript.Models.Hero", "Hero")
                        .WithMany("HeroExperiences")
                        .HasForeignKey("HeroForeignKey");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.HeroExperienceDetail", b =>
                {
                    b.HasOne("RCB.JavaScript.Models.HeroExperience", "HeroExperience")
                        .WithMany("HeroExperienceDetails")
                        .HasForeignKey("ExperienceForeignKey");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.HeroPortfolio", b =>
                {
                    b.HasOne("RCB.JavaScript.Models.Hero", "Hero")
                        .WithMany("HeroPortfolios")
                        .HasForeignKey("HeroForeignKey");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.HeroPortfolioDetail", b =>
                {
                    b.HasOne("RCB.JavaScript.Models.HeroPortfolio", "HeroPortfolio")
                        .WithOne("HeroPortfolioDetails")
                        .HasForeignKey("RCB.JavaScript.Models.HeroPortfolioDetail", "PortfolioForeignKey");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.HeroPortfolioImage", b =>
                {
                    b.HasOne("RCB.JavaScript.Models.HeroPortfolioDetail", "HeroPortfolioDetail")
                        .WithMany("HeroPortfolioImages")
                        .HasForeignKey("PortfolioDetailForeignKey");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.HeroService", b =>
                {
                    b.HasOne("RCB.JavaScript.Models.Hero", "Hero")
                        .WithMany("HeroServices")
                        .HasForeignKey("HeroForeignKey");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.HeroSummary", b =>
                {
                    b.HasOne("RCB.JavaScript.Models.Hero", "Hero")
                        .WithOne("HeroSummary")
                        .HasForeignKey("RCB.JavaScript.Models.HeroSummary", "HeroForeignKey");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.HeroTechnical", b =>
                {
                    b.HasOne("RCB.JavaScript.Models.Hero", "Hero")
                        .WithMany("HeroTechnicals")
                        .HasForeignKey("HeroForeignKey");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.StoreCategory", b =>
                {
                    b.HasOne("RCB.JavaScript.Models.AdmStoreCategory", "admStoreCategory")
                        .WithOne("StoreCategory")
                        .HasForeignKey("RCB.JavaScript.Models.StoreCategory", "AdmStoreCategoryForeignKey");

                    b.HasOne("RCB.JavaScript.Models.StoreSummary", "storeSummary")
                        .WithMany("StoreCategories")
                        .HasForeignKey("StoreSummaryForeignKey");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.StoreCategorySize", b =>
                {
                    b.HasOne("RCB.JavaScript.Models.StoreCategory", "StoreCategory")
                        .WithMany("StoreCategorySizes")
                        .HasForeignKey("StoreCategoryForeignKey");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.StorePayment", b =>
                {
                    b.HasOne("RCB.JavaScript.Models.AdmStorePayment", "admStorePayment")
                        .WithOne("StorePayment")
                        .HasForeignKey("RCB.JavaScript.Models.StorePayment", "AdmStorePaymentForeignKey");

                    b.HasOne("RCB.JavaScript.Models.StoreSummary", null)
                        .WithMany("StorePayments")
                        .HasForeignKey("StoreSummaryId");
                });

            modelBuilder.Entity("RCB.JavaScript.Models.StoreSummary", b =>
                {
                    b.HasOne("RCB.JavaScript.Models.User", "User")
                        .WithOne("storeSummary")
                        .HasForeignKey("RCB.JavaScript.Models.StoreSummary", "UserForeignKey");
                });
#pragma warning restore 612, 618
        }
    }
}
