using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class NameMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "News",
                columns: table => new
                {
                    News_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Short_Description = table.Column<string>(type: "nvarchar(254)", maxLength: 254, nullable: true),
                    Contents = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    Image = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Update_By = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Update_Time = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_News", x => x.News_ID);
                });

            migrationBuilder.CreateTable(
                name: "Product_Service",
                columns: table => new
                {
                    Product_Service_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Product_Service_Cate_ID = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
                    Product_Service_Name = table.Column<string>(type: "nvarchar(254)", maxLength: 254, nullable: false),
                    Time_Sale = table.Column<int>(type: "int", nullable: true),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<int>(type: "int", nullable: true),
                    Amount = table.Column<int>(type: "int", nullable: true),
                    IsSale = table.Column<bool>(type: "bit", nullable: true),
                    Discount = table.Column<int>(type: "int", nullable: true),
                    Price_Sale = table.Column<string>(type: "nchar(100)", fixedLength: true, maxLength: 100, nullable: true),
                    From_Date_Sale = table.Column<DateTime>(type: "datetime", nullable: true),
                    To_Date_Sale = table.Column<DateTime>(type: "datetime", nullable: true),
                    New = table.Column<bool>(type: "bit", nullable: true),
                    Hot_Sale = table.Column<bool>(type: "bit", nullable: true),
                    Status = table.Column<bool>(type: "bit", nullable: true),
                    FileImages = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileVideos = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Update_By = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    Update_Time = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product_Service", x => x.Product_Service_ID);
                });

            migrationBuilder.CreateTable(
                name: "Product_Service_Category",
                columns: table => new
                {
                    Product_Service_Cate_ID = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
                    Product_Service_Cate_Name = table.Column<string>(type: "nvarchar(254)", maxLength: 254, nullable: false),
                    Status = table.Column<bool>(type: "bit", nullable: true),
                    Position = table.Column<int>(type: "int", nullable: false),
                    Update_By = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    Update_Time = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product_Service_Category", x => x.Product_Service_Cate_ID);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    role_unique = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    role_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    role_type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    role_note = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    role_sequence = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    update_by = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    update_time = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.role_unique);
                });

            migrationBuilder.CreateTable(
                name: "RoleUser",
                columns: table => new
                {
                    user_account = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    role_unique = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    create_by = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    create_time = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleUser", x => new { x.user_account, x.role_unique });
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    User_Account = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    User_Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(254)", maxLength: 254, nullable: true),
                    Phone_Number = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    Valid_From = table.Column<DateTime>(type: "date", nullable: true),
                    Valid_To = table.Column<DateTime>(type: "date", nullable: true),
                    Last_Login = table.Column<DateTime>(type: "datetime", nullable: true),
                    Update_By = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Update_Time = table.Column<DateTime>(type: "datetime", nullable: true),
                    Image = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.User_Account);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "News");

            migrationBuilder.DropTable(
                name: "Product_Service");

            migrationBuilder.DropTable(
                name: "Product_Service_Category");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "RoleUser");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
