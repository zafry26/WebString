using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RCB.JavaScript.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdmStoreCategories",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    CreatedBy = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdmStoreCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AdmStorePayments",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PaymentCode = table.Column<string>(nullable: true),
                    PaymentName = table.Column<string>(nullable: true),
                    PaymentStatus = table.Column<bool>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    CreatedBy = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdmStorePayments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Developers",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(maxLength: 50, nullable: false),
                    Email = table.Column<string>(maxLength: 50, nullable: false),
                    PhoneNumber = table.Column<string>(maxLength: 50, nullable: false),
                    Skillsets = table.Column<string>(maxLength: 500, nullable: false),
                    Hobby = table.Column<string>(maxLength: 500, nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    CreatedBy = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Developers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(maxLength: 50, nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(maxLength: 50, nullable: false),
                    Name = table.Column<string>(maxLength: 100, nullable: false),
                    UserName = table.Column<string>(maxLength: 50, nullable: false),
                    Password = table.Column<string>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Hero",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(maxLength: 100, nullable: true),
                    DisplayName = table.Column<string>(maxLength: 50, nullable: false),
                    Standout = table.Column<string>(maxLength: 50, nullable: true),
                    FbUrl = table.Column<string>(maxLength: 500, nullable: true),
                    LinkedInUrl = table.Column<string>(maxLength: 500, nullable: true),
                    InstagramUrl = table.Column<string>(maxLength: 500, nullable: true),
                    BackgroundImage = table.Column<string>(maxLength: 500, nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    CreatedBy = table.Column<long>(nullable: false),
                    UserForeignKey = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hero", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Hero_Users_UserForeignKey",
                        column: x => x.UserForeignKey,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "StoreSummaries",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StoreName = table.Column<string>(maxLength: 100, nullable: true),
                    Standout = table.Column<string>(maxLength: 50, nullable: true),
                    FbUrl = table.Column<string>(maxLength: 500, nullable: true),
                    LinkedInUrl = table.Column<string>(maxLength: 500, nullable: true),
                    InstagramUrl = table.Column<string>(maxLength: 500, nullable: true),
                    Logo = table.Column<string>(maxLength: 500, nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    CreatedBy = table.Column<long>(nullable: false),
                    UserForeignKey = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoreSummaries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StoreSummaries_Users_UserForeignKey",
                        column: x => x.UserForeignKey,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HeroEducations",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Qualification = table.Column<string>(maxLength: 100, nullable: true),
                    FromYear = table.Column<string>(nullable: true),
                    ToYear = table.Column<string>(nullable: true),
                    University = table.Column<string>(maxLength: 100, nullable: true),
                    State = table.Column<string>(maxLength: 20, nullable: true),
                    Country = table.Column<string>(maxLength: 20, nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    CreatedBy = table.Column<long>(nullable: false),
                    HeroForeignKey = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HeroEducations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HeroEducations_Hero_HeroForeignKey",
                        column: x => x.HeroForeignKey,
                        principalTable: "Hero",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HeroExperiences",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PositionTitle = table.Column<string>(maxLength: 100, nullable: true),
                    FromYear = table.Column<string>(nullable: true),
                    ToYear = table.Column<string>(nullable: true),
                    Company = table.Column<string>(maxLength: 100, nullable: true),
                    City = table.Column<string>(maxLength: 20, nullable: true),
                    State = table.Column<string>(maxLength: 20, nullable: true),
                    Country = table.Column<string>(maxLength: 20, nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    CreatedBy = table.Column<long>(nullable: false),
                    HeroForeignKey = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HeroExperiences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HeroExperiences_Hero_HeroForeignKey",
                        column: x => x.HeroForeignKey,
                        principalTable: "Hero",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HeroPortfolios",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Image = table.Column<string>(maxLength: 200, nullable: true),
                    Category = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    CreatedBy = table.Column<long>(nullable: false),
                    HeroForeignKey = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HeroPortfolios", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HeroPortfolios_Hero_HeroForeignKey",
                        column: x => x.HeroForeignKey,
                        principalTable: "Hero",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HeroServices",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Image = table.Column<string>(maxLength: 200, nullable: true),
                    Title = table.Column<string>(maxLength: 100, nullable: true),
                    Detail = table.Column<string>(maxLength: 500, nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    CreatedBy = table.Column<long>(nullable: false),
                    HeroForeignKey = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HeroServices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HeroServices_Hero_HeroForeignKey",
                        column: x => x.HeroForeignKey,
                        principalTable: "Hero",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HeroSummaries",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Summary = table.Column<string>(maxLength: 300, nullable: true),
                    City = table.Column<string>(maxLength: 20, nullable: true),
                    State = table.Column<string>(maxLength: 20, nullable: true),
                    Country = table.Column<string>(maxLength: 20, nullable: true),
                    Email = table.Column<string>(maxLength: 50, nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    CreatedBy = table.Column<long>(nullable: false),
                    HeroForeignKey = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HeroSummaries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HeroSummaries_Hero_HeroForeignKey",
                        column: x => x.HeroForeignKey,
                        principalTable: "Hero",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HeroTechnicals",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Image = table.Column<string>(maxLength: 200, nullable: true),
                    Title = table.Column<string>(maxLength: 100, nullable: true),
                    Detail = table.Column<string>(maxLength: 500, nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    CreatedBy = table.Column<long>(nullable: false),
                    HeroForeignKey = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HeroTechnicals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HeroTechnicals_Hero_HeroForeignKey",
                        column: x => x.HeroForeignKey,
                        principalTable: "Hero",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "StoreCategories",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AdmStoreCategoryForeignKey = table.Column<long>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    CreatedBy = table.Column<long>(nullable: false),
                    StoreSummaryForeignKey = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoreCategories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StoreCategories_AdmStoreCategories_AdmStoreCategoryForeignKey",
                        column: x => x.AdmStoreCategoryForeignKey,
                        principalTable: "AdmStoreCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StoreCategories_StoreSummaries_StoreSummaryForeignKey",
                        column: x => x.StoreSummaryForeignKey,
                        principalTable: "StoreSummaries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "StorePayments",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AdmStorePaymentForeignKey = table.Column<long>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    CreatedBy = table.Column<long>(nullable: false),
                    StoreSummaryId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StorePayments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StorePayments_AdmStorePayments_AdmStorePaymentForeignKey",
                        column: x => x.AdmStorePaymentForeignKey,
                        principalTable: "AdmStorePayments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StorePayments_StoreSummaries_StoreSummaryId",
                        column: x => x.StoreSummaryId,
                        principalTable: "StoreSummaries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HeroExperienceDetails",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WorkScope = table.Column<string>(maxLength: 500, nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    CreatedBy = table.Column<long>(nullable: false),
                    ExperienceForeignKey = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HeroExperienceDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HeroExperienceDetails_HeroExperiences_ExperienceForeignKey",
                        column: x => x.ExperienceForeignKey,
                        principalTable: "HeroExperiences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HeroPortfolioDetails",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Image = table.Column<string>(maxLength: 50, nullable: true),
                    Category = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    Detail = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    CreatedBy = table.Column<long>(nullable: false),
                    PortfolioForeignKey = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HeroPortfolioDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HeroPortfolioDetails_HeroPortfolios_PortfolioForeignKey",
                        column: x => x.PortfolioForeignKey,
                        principalTable: "HeroPortfolios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "StoreCategorySizes",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SizeCode = table.Column<string>(maxLength: 10, nullable: true),
                    SizeName = table.Column<string>(maxLength: 50, nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    CreatedBy = table.Column<long>(nullable: false),
                    StoreCategoryForeignKey = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoreCategorySizes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StoreCategorySizes_StoreCategories_StoreCategoryForeignKey",
                        column: x => x.StoreCategoryForeignKey,
                        principalTable: "StoreCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HeroPortfolioImages",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Image = table.Column<string>(maxLength: 50, nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    CreatedBy = table.Column<long>(nullable: false),
                    PortfolioDetailForeignKey = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HeroPortfolioImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HeroPortfolioImages_HeroPortfolioDetails_PortfolioDetailForeignKey",
                        column: x => x.PortfolioDetailForeignKey,
                        principalTable: "HeroPortfolioDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Hero_UserForeignKey",
                table: "Hero",
                column: "UserForeignKey",
                unique: true,
                filter: "[UserForeignKey] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_HeroEducations_HeroForeignKey",
                table: "HeroEducations",
                column: "HeroForeignKey");

            migrationBuilder.CreateIndex(
                name: "IX_HeroExperienceDetails_ExperienceForeignKey",
                table: "HeroExperienceDetails",
                column: "ExperienceForeignKey");

            migrationBuilder.CreateIndex(
                name: "IX_HeroExperiences_HeroForeignKey",
                table: "HeroExperiences",
                column: "HeroForeignKey");

            migrationBuilder.CreateIndex(
                name: "IX_HeroPortfolioDetails_PortfolioForeignKey",
                table: "HeroPortfolioDetails",
                column: "PortfolioForeignKey",
                unique: true,
                filter: "[PortfolioForeignKey] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_HeroPortfolioImages_PortfolioDetailForeignKey",
                table: "HeroPortfolioImages",
                column: "PortfolioDetailForeignKey");

            migrationBuilder.CreateIndex(
                name: "IX_HeroPortfolios_HeroForeignKey",
                table: "HeroPortfolios",
                column: "HeroForeignKey");

            migrationBuilder.CreateIndex(
                name: "IX_HeroServices_HeroForeignKey",
                table: "HeroServices",
                column: "HeroForeignKey");

            migrationBuilder.CreateIndex(
                name: "IX_HeroSummaries_HeroForeignKey",
                table: "HeroSummaries",
                column: "HeroForeignKey",
                unique: true,
                filter: "[HeroForeignKey] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_HeroTechnicals_HeroForeignKey",
                table: "HeroTechnicals",
                column: "HeroForeignKey");

            migrationBuilder.CreateIndex(
                name: "IX_StoreCategories_AdmStoreCategoryForeignKey",
                table: "StoreCategories",
                column: "AdmStoreCategoryForeignKey",
                unique: true,
                filter: "[AdmStoreCategoryForeignKey] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_StoreCategories_StoreSummaryForeignKey",
                table: "StoreCategories",
                column: "StoreSummaryForeignKey");

            migrationBuilder.CreateIndex(
                name: "IX_StoreCategorySizes_StoreCategoryForeignKey",
                table: "StoreCategorySizes",
                column: "StoreCategoryForeignKey");

            migrationBuilder.CreateIndex(
                name: "IX_StorePayments_AdmStorePaymentForeignKey",
                table: "StorePayments",
                column: "AdmStorePaymentForeignKey",
                unique: true,
                filter: "[AdmStorePaymentForeignKey] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_StorePayments_StoreSummaryId",
                table: "StorePayments",
                column: "StoreSummaryId");

            migrationBuilder.CreateIndex(
                name: "IX_StoreSummaries_UserForeignKey",
                table: "StoreSummaries",
                column: "UserForeignKey",
                unique: true,
                filter: "[UserForeignKey] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Developers");

            migrationBuilder.DropTable(
                name: "HeroEducations");

            migrationBuilder.DropTable(
                name: "HeroExperienceDetails");

            migrationBuilder.DropTable(
                name: "HeroPortfolioImages");

            migrationBuilder.DropTable(
                name: "HeroServices");

            migrationBuilder.DropTable(
                name: "HeroSummaries");

            migrationBuilder.DropTable(
                name: "HeroTechnicals");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "StoreCategorySizes");

            migrationBuilder.DropTable(
                name: "StorePayments");

            migrationBuilder.DropTable(
                name: "HeroExperiences");

            migrationBuilder.DropTable(
                name: "HeroPortfolioDetails");

            migrationBuilder.DropTable(
                name: "StoreCategories");

            migrationBuilder.DropTable(
                name: "AdmStorePayments");

            migrationBuilder.DropTable(
                name: "HeroPortfolios");

            migrationBuilder.DropTable(
                name: "AdmStoreCategories");

            migrationBuilder.DropTable(
                name: "StoreSummaries");

            migrationBuilder.DropTable(
                name: "Hero");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
