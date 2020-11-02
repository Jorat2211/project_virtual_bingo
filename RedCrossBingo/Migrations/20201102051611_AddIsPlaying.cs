using Microsoft.EntityFrameworkCore.Migrations;

namespace RedCrossBingo.Migrations
{
    public partial class AddIsPlaying : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "is_playing",
                table: "bingo_cards",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "number_card",
                table: "bingo_cards",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "is_playing",
                table: "bingo_cards");

            migrationBuilder.DropColumn(
                name: "number_card",
                table: "bingo_cards");
        }
    }
}
