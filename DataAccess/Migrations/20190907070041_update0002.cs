using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccess.Migrations
{
    public partial class update0002 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreationTime",
                table: "Entities",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "Entities",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "ValueId",
                table: "Entities",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ValueParentId",
                table: "Entities",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Value",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    IntValue = table.Column<int>(nullable: true),
                    DoubleValue = table.Column<double>(nullable: true),
                    DateTimeValue = table.Column<DateTime>(nullable: true),
                    StringValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Value", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Entities_ValueId",
                table: "Entities",
                column: "ValueId");

            migrationBuilder.CreateIndex(
                name: "IX_Value_IntValue_DoubleValue_DateTimeValue_StringValue",
                table: "Value",
                columns: new[] { "IntValue", "DoubleValue", "DateTimeValue", "StringValue" });

            migrationBuilder.AddForeignKey(
                name: "FK_Entities_Entities_ValueId",
                table: "Entities",
                column: "ValueId",
                principalTable: "Entities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Entities_Entities_ValueId",
                table: "Entities");

            migrationBuilder.DropTable(
                name: "Value");

            migrationBuilder.DropIndex(
                name: "IX_Entities_ValueId",
                table: "Entities");

            migrationBuilder.DropColumn(
                name: "CreationTime",
                table: "Entities");

            migrationBuilder.DropColumn(
                name: "Order",
                table: "Entities");

            migrationBuilder.DropColumn(
                name: "ValueId",
                table: "Entities");

            migrationBuilder.DropColumn(
                name: "ValueParentId",
                table: "Entities");
        }
    }
}
