﻿// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Migrations
{
    [DbContext(typeof(ProjectContext))]
    [Migration("20211203083540_NameMigration")]
    partial class NameMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.9")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("API.Models.News", b =>
                {
                    b.Property<int>("News_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Contents")
                        .HasMaxLength(4000)
                        .HasColumnType("nvarchar(4000)");

                    b.Property<string>("Image")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Short_Description")
                        .HasMaxLength(254)
                        .HasColumnType("nvarchar(254)");

                    b.Property<string>("Title")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Update_By")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateTime?>("Update_Time")
                        .HasColumnType("datetime");

                    b.HasKey("News_ID");

                    b.ToTable("News");
                });

            modelBuilder.Entity("API.Models.Product_Service", b =>
                {
                    b.Property<int>("Product_Service_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("Amount")
                        .HasColumnType("int");

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Discount")
                        .HasColumnType("int");

                    b.Property<string>("FileImages")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FileVideos")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("From_Date_Sale")
                        .HasColumnType("datetime");

                    b.Property<bool?>("Hot_Sale")
                        .HasColumnType("bit");

                    b.Property<bool?>("IsSale")
                        .HasColumnType("bit");

                    b.Property<bool?>("New")
                        .HasColumnType("bit");

                    b.Property<int?>("Price")
                        .HasColumnType("int");

                    b.Property<string>("Price_Sale")
                        .HasMaxLength(100)
                        .HasColumnType("nchar(100)")
                        .IsFixedLength(true);

                    b.Property<string>("Product_Service_Cate_ID")
                        .IsRequired()
                        .HasMaxLength(20)
                        .IsUnicode(false)
                        .HasColumnType("varchar(20)");

                    b.Property<string>("Product_Service_Name")
                        .IsRequired()
                        .HasMaxLength(254)
                        .HasColumnType("nvarchar(254)");

                    b.Property<bool?>("Status")
                        .HasColumnType("bit");

                    b.Property<int?>("Time_Sale")
                        .HasColumnType("int");

                    b.Property<DateTime?>("To_Date_Sale")
                        .HasColumnType("datetime");

                    b.Property<string>("Update_By")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<DateTime?>("Update_Time")
                        .HasColumnType("datetime");

                    b.HasKey("Product_Service_ID");

                    b.ToTable("Product_Service");
                });

            modelBuilder.Entity("API.Models.Product_Service_Category", b =>
                {
                    b.Property<string>("Product_Service_Cate_ID")
                        .HasMaxLength(20)
                        .IsUnicode(false)
                        .HasColumnType("varchar(20)");

                    b.Property<int>("Position")
                        .HasColumnType("int");

                    b.Property<string>("Product_Service_Cate_Name")
                        .IsRequired()
                        .HasMaxLength(254)
                        .HasColumnType("nvarchar(254)");

                    b.Property<bool?>("Status")
                        .HasColumnType("bit");

                    b.Property<string>("Update_By")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<DateTime?>("Update_Time")
                        .HasColumnType("datetime");

                    b.HasKey("Product_Service_Cate_ID");

                    b.ToTable("Product_Service_Category");
                });

            modelBuilder.Entity("API.Models.RoleUser", b =>
                {
                    b.Property<string>("user_account")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("role_unique")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("create_by")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateTime>("create_time")
                        .HasColumnType("datetime");

                    b.HasKey("user_account", "role_unique");

                    b.ToTable("RoleUser");
                });

            modelBuilder.Entity("API.Models.Roles", b =>
                {
                    b.Property<string>("role_unique")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("role_name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("role_note")
                        .IsRequired()
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<decimal>("role_sequence")
                        .HasColumnType("numeric(5,2)");

                    b.Property<string>("role_type")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("update_by")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateTime>("update_time")
                        .HasColumnType("datetime");

                    b.HasKey("role_unique");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("API.Models.Users", b =>
                {
                    b.Property<string>("User_Account")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Email")
                        .HasMaxLength(254)
                        .HasColumnType("nvarchar(254)");

                    b.Property<string>("Image")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<DateTime?>("Last_Login")
                        .HasColumnType("datetime");

                    b.Property<string>("Password")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Phone_Number")
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.Property<string>("Update_By")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateTime?>("Update_Time")
                        .HasColumnType("datetime");

                    b.Property<string>("User_Name")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateTime?>("Valid_From")
                        .HasColumnType("date");

                    b.Property<DateTime?>("Valid_To")
                        .HasColumnType("date");

                    b.HasKey("User_Account");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
