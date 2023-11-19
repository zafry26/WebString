using Microsoft.EntityFrameworkCore.Migrations;

namespace RCB.JavaScript.Migrations
{
    public partial class removefkfordeveloper : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Developers_Users_UserForeignKey",
                table: "Developers");

            migrationBuilder.DropIndex(
                name: "IX_Developers_UserForeignKey",
                table: "Developers");

            migrationBuilder.DropColumn(
                name: "UserForeignKey",
                table: "Developers");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserForeignKey",
                table: "Developers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Developers_UserForeignKey",
                table: "Developers",
                column: "UserForeignKey");

            migrationBuilder.AddForeignKey(
                name: "FK_Developers_Users_UserForeignKey",
                table: "Developers",
                column: "UserForeignKey",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
