using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations.MsuNews
{
    public partial class News20 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EditedText",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "EditetTitle",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "NewPreviewImageUrl",
                table: "Reviews");

            migrationBuilder.AddColumn<bool>(
                name: "IsPublished",
                table: "Reviews",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsPinned",
                table: "Publications",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "Drafts",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsRequiresChanges",
                table: "Drafts",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPublished",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "IsPinned",
                table: "Publications");

            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "Drafts");

            migrationBuilder.DropColumn(
                name: "IsRequiresChanges",
                table: "Drafts");

            migrationBuilder.AddColumn<string>(
                name: "EditedText",
                table: "Reviews",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EditetTitle",
                table: "Reviews",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NewPreviewImageUrl",
                table: "Reviews",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
