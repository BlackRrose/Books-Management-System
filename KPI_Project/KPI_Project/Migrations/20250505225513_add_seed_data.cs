using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace KPI_Project.Migrations
{
    /// <inheritdoc />
    public partial class add_seed_data : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ISBN",
                table: "Books",
                newName: "Isbn");

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "Author", "Description", "Isbn", "Price", "PublishedDate", "Title" },
                values: new object[,]
                {
                    { 1, "Alice Munro", "A mysterious novel about forgotten histories.", "978-1-4028-9462-6", 150.00m, new DateOnly(2022, 1, 15), "The Lost Pages" },
                    { 2, "Brian Kernighan", "An in-depth guide to coding practices in stealthy environments.", "978-0-13-110362-7", 175.00m, new DateOnly(2021, 7, 30), "Code in the Shadows" },
                    { 3, "Cathy O'Neil", "A thoughtful exploration of how data shapes our world.", "978-0-8129-9823-6", 150.00m, new DateOnly(2020, 3, 10), "Alice Munro" },
                    { 4, "Don Knuth", "An expert look at algorithms under time pressure.", "978-0-201-03801-2", 125.00m, new DateOnly(2023, 11, 5), "Alice Munro" },
                    { 5, "Elena Garcia", "Fictional journey into the quantum realm.", "978-1-56619-909-4", 100.00m, new DateOnly(2019, 6, 25), "Alice Munro" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.RenameColumn(
                name: "Isbn",
                table: "Books",
                newName: "ISBN");
        }
    }
}
