using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuctionWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "JewelryTypes",
                columns: table => new
                {
                    JewelryTypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JewelryTypeName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JewelryTypes", x => x.JewelryTypeId);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.RoleId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<int>(type: "int", nullable: true),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Number = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Users_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "RoleId");
                });

            migrationBuilder.CreateTable(
                name: "Jewelries",
                columns: table => new
                {
                    JewelryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OwnerId = table.Column<int>(type: "int", nullable: true),
                    JewelryTypeId = table.Column<int>(type: "int", nullable: true),
                    JewelryName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JewelryDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JewelryImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JewelryStatus = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jewelries", x => x.JewelryId);
                    table.ForeignKey(
                        name: "FK_Jewelries_JewelryTypes_JewelryTypeId",
                        column: x => x.JewelryTypeId,
                        principalTable: "JewelryTypes",
                        principalColumn: "JewelryTypeId");
                    table.ForeignKey(
                        name: "FK_Jewelries_Users_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Users",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateTable(
                name: "AuctionRequests",
                columns: table => new
                {
                    RequestId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SellerId = table.Column<int>(type: "int", nullable: true),
                    JewelryId = table.Column<int>(type: "int", nullable: true),
                    RequestDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RequestStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InitialValuation = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    FinalValuation = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuctionRequests", x => x.RequestId);
                    table.ForeignKey(
                        name: "FK_AuctionRequests_Jewelries_JewelryId",
                        column: x => x.JewelryId,
                        principalTable: "Jewelries",
                        principalColumn: "JewelryId");
                    table.ForeignKey(
                        name: "FK_AuctionRequests_Users_SellerId",
                        column: x => x.SellerId,
                        principalTable: "Users",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateTable(
                name: "Auctions",
                columns: table => new
                {
                    AuctionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JewelryId = table.Column<int>(type: "int", nullable: true),
                    StaffId = table.Column<int>(type: "int", nullable: true),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EndTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    AuctionStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartingPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    FinalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Auctions", x => x.AuctionId);
                    table.ForeignKey(
                        name: "FK_Auctions_Jewelries_JewelryId",
                        column: x => x.JewelryId,
                        principalTable: "Jewelries",
                        principalColumn: "JewelryId");
                    table.ForeignKey(
                        name: "FK_Auctions_Users_StaffId",
                        column: x => x.StaffId,
                        principalTable: "Users",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateTable(
                name: "Bids",
                columns: table => new
                {
                    BidId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerId = table.Column<int>(type: "int", nullable: true),
                    AuctionId = table.Column<int>(type: "int", nullable: true),
                    BidTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    BidAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    BidStatus = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bids", x => x.BidId);
                    table.ForeignKey(
                        name: "FK_Bids_Auctions_AuctionId",
                        column: x => x.AuctionId,
                        principalTable: "Auctions",
                        principalColumn: "AuctionId");
                    table.ForeignKey(
                        name: "FK_Bids_Users_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Users",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    TransactionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AuctionId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TransactionFee = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.TransactionId);
                    table.ForeignKey(
                        name: "FK_Transactions_Auctions_AuctionId",
                        column: x => x.AuctionId,
                        principalTable: "Auctions",
                        principalColumn: "AuctionId");
                    table.ForeignKey(
                        name: "FK_Transactions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AuctionRequests_JewelryId",
                table: "AuctionRequests",
                column: "JewelryId");

            migrationBuilder.CreateIndex(
                name: "IX_AuctionRequests_SellerId",
                table: "AuctionRequests",
                column: "SellerId");

            migrationBuilder.CreateIndex(
                name: "IX_Auctions_JewelryId",
                table: "Auctions",
                column: "JewelryId");

            migrationBuilder.CreateIndex(
                name: "IX_Auctions_StaffId",
                table: "Auctions",
                column: "StaffId");

            migrationBuilder.CreateIndex(
                name: "IX_Bids_AuctionId",
                table: "Bids",
                column: "AuctionId");

            migrationBuilder.CreateIndex(
                name: "IX_Bids_CustomerId",
                table: "Bids",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Jewelries_JewelryTypeId",
                table: "Jewelries",
                column: "JewelryTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Jewelries_OwnerId",
                table: "Jewelries",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_AuctionId",
                table: "Transactions",
                column: "AuctionId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_UserId",
                table: "Transactions",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleId",
                table: "Users",
                column: "RoleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AuctionRequests");

            migrationBuilder.DropTable(
                name: "Bids");

            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.DropTable(
                name: "Auctions");

            migrationBuilder.DropTable(
                name: "Jewelries");

            migrationBuilder.DropTable(
                name: "JewelryTypes");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}
