using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace RedCrossBingo.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "rooms",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(nullable: true),
                    url = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_rooms", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    email = table.Column<string>(nullable: true),
                    password = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "bingo_cards",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    rooms_id = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_bingo_cards", x => x.id);
                    table.ForeignKey(
                        name: "fk_bingo_cards_rooms_rooms_id",
                        column: x => x.rooms_id,
                        principalTable: "rooms",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "bingo_numbers",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    number = table.Column<long>(nullable: false),
                    is_chosen = table.Column<bool>(nullable: false),
                    rooms_id = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_bingo_numbers", x => x.id);
                    table.ForeignKey(
                        name: "fk_bingo_numbers_rooms_rooms_id",
                        column: x => x.rooms_id,
                        principalTable: "rooms",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "bingo_card_numbers",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    number = table.Column<long>(nullable: false),
                    is_selected = table.Column<bool>(nullable: false),
                    bingo_cards_id = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_bingo_card_numbers", x => x.id);
                    table.ForeignKey(
                        name: "fk_bingo_card_numbers_bingo_cards_bingo_cards_id",
                        column: x => x.bingo_cards_id,
                        principalTable: "bingo_cards",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_bingo_card_numbers_bingo_cards_id",
                table: "bingo_card_numbers",
                column: "bingo_cards_id");

            migrationBuilder.CreateIndex(
                name: "ix_bingo_cards_rooms_id",
                table: "bingo_cards",
                column: "rooms_id");

            migrationBuilder.CreateIndex(
                name: "ix_bingo_numbers_rooms_id",
                table: "bingo_numbers",
                column: "rooms_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "bingo_card_numbers");

            migrationBuilder.DropTable(
                name: "bingo_numbers");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "bingo_cards");

            migrationBuilder.DropTable(
                name: "rooms");
        }
    }
}
