USE [GHF]
GO
/****** Object:  Table [dbo].[News]    Script Date: 10/15/2021 9:58:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[News](
	[News_ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](50) NOT NULL,
	[Short_Description] [nvarchar](254) NULL,
	[Contents] [nvarchar](4000) NULL,
	[Image] [nvarchar](255) NULL,
	[Update_By] [varchar](50) NULL,
	[Update_Time] [datetime] NULL,
 CONSTRAINT [PK_News] PRIMARY KEY CLUSTERED 
(
	[News_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product_Service]    Script Date: 10/15/2021 9:58:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product_Service](
	[Product_Service_ID] [int] IDENTITY(1,1) NOT NULL,
	[Product_Service_Cate_ID] [varchar](20) NOT NULL,
	[Product_Service_Name] [nvarchar](254) NOT NULL,
	[Time_Sale] [int] NULL,
	[Content] [nvarchar](max) NULL,
	[Price] [int] NULL,
	[Amount] [int] NULL,
	[IsSale] [bit] NULL,
	[Discount] [int] NULL,
	[Price_Sale] [nchar](100) NULL,
	[From_Date_Sale] [datetime] NULL,
	[To_Date_Sale] [datetime] NULL,
	[New] [bit] NULL,
	[Hot_Sale] [bit] NULL,
	[Status] [bit] NULL,
	[FileImages] [nvarchar](max) NULL,
	[FileVideos] [nvarchar](max) NULL,
	[Update_By] [varchar](50) NULL,
	[Update_Time] [datetime] NULL,
 CONSTRAINT [PK_Product_Service] PRIMARY KEY CLUSTERED 
(
	[Product_Service_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product_Service_Category]    Script Date: 10/15/2021 9:58:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product_Service_Category](
	[Product_Service_Cate_ID] [varchar](20) NOT NULL,
	[Product_Service_Cate_Name] [nvarchar](254) NOT NULL,
	[Status] [bit] NULL,
	[Position] [int] NOT NULL,
	[Update_By] [varchar](50) NULL,
	[Update_Time] [datetime] NULL,
 CONSTRAINT [PK_Product_Service_Category] PRIMARY KEY CLUSTERED 
(
	[Product_Service_Cate_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 10/15/2021 9:58:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[role_unique] [nvarchar](50) NOT NULL,
	[role_name] [nvarchar](100) NULL,
	[role_type] [nvarchar](50) NULL,
	[role_note] [nvarchar](250) NULL,
	[role_sequence] [numeric](5, 2) NULL,
	[update_by] [nvarchar](50) NULL,
	[update_time] [datetime] NULL,
 CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[role_unique] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RoleUser]    Script Date: 10/15/2021 9:58:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RoleUser](
	[user_account] [nvarchar](50) NOT NULL,
	[role_unique] [nvarchar](50) NOT NULL,
	[create_by] [nvarchar](50) NULL,
	[create_time] [datetime] NULL,
 CONSTRAINT [PK_RoleUser] PRIMARY KEY CLUSTERED 
(
	[user_account] ASC,
	[role_unique] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 10/15/2021 9:58:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[User_Account] [varchar](20) NOT NULL,
	[Password] [varchar](20) NULL,
	[User_Name] [nvarchar](50) NULL,
	[Email] [varchar](254) NULL,
	[Phone_Number] [varchar](10) NULL,
	[Valid_From] [date] NULL,
	[Valid_To] [date] NULL,
	[Last_Login] [datetime] NULL,
	[Update_By] [varchar](50) NULL,
	[Update_Time] [datetime] NULL,
	[Image] [nvarchar](255) NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[User_Account] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[News] ON 

INSERT [dbo].[News] ([News_ID], [Title], [Short_Description], [Contents], [Image], [Update_By], [Update_Time]) VALUES (99, N'asdf', N'asdf', N'asdf', NULL, N'administrator', CAST(N'2021-10-01T13:29:05.483' AS DateTime))
INSERT [dbo].[News] ([News_ID], [Title], [Short_Description], [Contents], [Image], [Update_By], [Update_Time]) VALUES (1002, N'asdfdfa', N'dsfa', N'fsafasf', NULL, N'administrator', CAST(N'2021-10-05T08:26:47.553' AS DateTime))
INSERT [dbo].[News] ([News_ID], [Title], [Short_Description], [Contents], [Image], [Update_By], [Update_Time]) VALUES (1004, N'asdf', N'asdf', N'undefined', NULL, N'administrator', CAST(N'2021-10-05T08:28:26.093' AS DateTime))
INSERT [dbo].[News] ([News_ID], [Title], [Short_Description], [Contents], [Image], [Update_By], [Update_Time]) VALUES (1005, N'afsd', N'asdf', N'asdf', NULL, N'administrator', CAST(N'2021-10-05T09:52:35.863' AS DateTime))
INSERT [dbo].[News] ([News_ID], [Title], [Short_Description], [Contents], [Image], [Update_By], [Update_Time]) VALUES (1006, N'asdf', N'asdf', N'asdf', NULL, N'administrator', CAST(N'2021-10-05T10:04:27.203' AS DateTime))
INSERT [dbo].[News] ([News_ID], [Title], [Short_Description], [Contents], [Image], [Update_By], [Update_Time]) VALUES (1007, N'asdf', N'sadf', N'asdf', NULL, N'administrator', CAST(N'2021-10-05T10:04:47.363' AS DateTime))
INSERT [dbo].[News] ([News_ID], [Title], [Short_Description], [Contents], [Image], [Update_By], [Update_Time]) VALUES (1008, N'fdfdsdf', N'adfasdf', N'aa', NULL, N'administrator', CAST(N'2021-10-05T10:04:53.463' AS DateTime))
INSERT [dbo].[News] ([News_ID], [Title], [Short_Description], [Contents], [Image], [Update_By], [Update_Time]) VALUES (1009, N'aadf', N'dsfafa', N'aadf', NULL, N'administrator', CAST(N'2021-10-05T10:05:03.833' AS DateTime))
INSERT [dbo].[News] ([News_ID], [Title], [Short_Description], [Contents], [Image], [Update_By], [Update_Time]) VALUES (1010, N'fddda', N'aaa', N'sss', NULL, N'administrator', CAST(N'2021-10-05T10:05:09.533' AS DateTime))
INSERT [dbo].[News] ([News_ID], [Title], [Short_Description], [Contents], [Image], [Update_By], [Update_Time]) VALUES (1011, N'aaa', N'aa', N'aaaaa', NULL, N'administrator', CAST(N'2021-10-05T10:05:15.327' AS DateTime))
INSERT [dbo].[News] ([News_ID], [Title], [Short_Description], [Contents], [Image], [Update_By], [Update_Time]) VALUES (1012, N'a', N'a', N'a', NULL, N'administrator', CAST(N'2021-10-05T10:11:13.147' AS DateTime))
INSERT [dbo].[News] ([News_ID], [Title], [Short_Description], [Contents], [Image], [Update_By], [Update_Time]) VALUES (1013, N'a', N'a', N'a', NULL, N'administrator', CAST(N'2021-10-05T10:13:42.477' AS DateTime))
SET IDENTITY_INSERT [dbo].[News] OFF
GO
INSERT [dbo].[Product_Service_Category] ([Product_Service_Cate_ID], [Product_Service_Cate_Name], [Status], [Position], [Update_By], [Update_Time]) VALUES (N'ProductService_0066', N'Category 6', 0, 1, N'administrator', CAST(N'2021-10-15T08:46:52.950' AS DateTime))
INSERT [dbo].[Product_Service_Category] ([Product_Service_Cate_ID], [Product_Service_Cate_Name], [Status], [Position], [Update_By], [Update_Time]) VALUES (N'ProductService_0067', N'Category 7', 1, 1, N'administrator', CAST(N'2021-10-15T08:46:52.953' AS DateTime))
INSERT [dbo].[Product_Service_Category] ([Product_Service_Cate_ID], [Product_Service_Cate_Name], [Status], [Position], [Update_By], [Update_Time]) VALUES (N'ProductService_0068', N'Category 8', 0, 1, N'administrator', CAST(N'2021-10-15T08:46:52.953' AS DateTime))
INSERT [dbo].[Product_Service_Category] ([Product_Service_Cate_ID], [Product_Service_Cate_Name], [Status], [Position], [Update_By], [Update_Time]) VALUES (N'ProductService_0069', N'Category 9', 1, 1, N'administrator', CAST(N'2021-10-15T08:46:52.957' AS DateTime))
INSERT [dbo].[Product_Service_Category] ([Product_Service_Cate_ID], [Product_Service_Cate_Name], [Status], [Position], [Update_By], [Update_Time]) VALUES (N'ProductService_0070', N'Category 10', 0, 1, N'administrator', CAST(N'2021-10-15T08:46:52.960' AS DateTime))
INSERT [dbo].[Product_Service_Category] ([Product_Service_Cate_ID], [Product_Service_Cate_Name], [Status], [Position], [Update_By], [Update_Time]) VALUES (N'ProductService_0071', N'Category 11', 1, 1, N'administrator', CAST(N'2021-10-15T08:46:52.963' AS DateTime))
INSERT [dbo].[Product_Service_Category] ([Product_Service_Cate_ID], [Product_Service_Cate_Name], [Status], [Position], [Update_By], [Update_Time]) VALUES (N'ProductService_0072', N'Category 12', 0, 1, N'administrator', CAST(N'2021-10-15T08:46:52.967' AS DateTime))
INSERT [dbo].[Product_Service_Category] ([Product_Service_Cate_ID], [Product_Service_Cate_Name], [Status], [Position], [Update_By], [Update_Time]) VALUES (N'ProductService_0073', N'Category 13', 0, 1, N'administrator', CAST(N'2021-10-15T08:46:52.967' AS DateTime))
INSERT [dbo].[Product_Service_Category] ([Product_Service_Cate_ID], [Product_Service_Cate_Name], [Status], [Position], [Update_By], [Update_Time]) VALUES (N'ProductService_0074', N'Category 14', 0, 1, N'administrator', CAST(N'2021-10-15T08:46:52.970' AS DateTime))
INSERT [dbo].[Product_Service_Category] ([Product_Service_Cate_ID], [Product_Service_Cate_Name], [Status], [Position], [Update_By], [Update_Time]) VALUES (N'ProductService_0075', N'Category 15', 0, 1, N'administrator', CAST(N'2021-10-15T08:46:52.973' AS DateTime))
INSERT [dbo].[Product_Service_Category] ([Product_Service_Cate_ID], [Product_Service_Cate_Name], [Status], [Position], [Update_By], [Update_Time]) VALUES (N'ProductService_0076', N'Category 1', 1, 1, N'administrator', CAST(N'2021-10-15T09:37:30.090' AS DateTime))
INSERT [dbo].[Product_Service_Category] ([Product_Service_Cate_ID], [Product_Service_Cate_Name], [Status], [Position], [Update_By], [Update_Time]) VALUES (N'ProductService_0077', N'Category 2', 1, 1, N'administrator', CAST(N'2021-10-15T09:37:30.167' AS DateTime))
INSERT [dbo].[Product_Service_Category] ([Product_Service_Cate_ID], [Product_Service_Cate_Name], [Status], [Position], [Update_By], [Update_Time]) VALUES (N'ProductService_0078', N'Category 3', 1, 1, N'administrator', CAST(N'2021-10-15T09:37:30.173' AS DateTime))
INSERT [dbo].[Product_Service_Category] ([Product_Service_Cate_ID], [Product_Service_Cate_Name], [Status], [Position], [Update_By], [Update_Time]) VALUES (N'ProductService_0079', N'Category 4', 0, 1, N'administrator', CAST(N'2021-10-15T09:37:30.177' AS DateTime))
INSERT [dbo].[Product_Service_Category] ([Product_Service_Cate_ID], [Product_Service_Cate_Name], [Status], [Position], [Update_By], [Update_Time]) VALUES (N'ProductService_0080', N'Category 5', 0, 1, N'administrator', CAST(N'2021-10-15T09:37:30.180' AS DateTime))
INSERT [dbo].[Product_Service_Category] ([Product_Service_Cate_ID], [Product_Service_Cate_Name], [Status], [Position], [Update_By], [Update_Time]) VALUES (N'ProductService_0081', N'Category 6', 0, 1, N'administrator', CAST(N'2021-10-15T09:37:30.180' AS DateTime))
INSERT [dbo].[Product_Service_Category] ([Product_Service_Cate_ID], [Product_Service_Cate_Name], [Status], [Position], [Update_By], [Update_Time]) VALUES (N'ProductService_0082', N'Category 7', 1, 1, N'administrator', CAST(N'2021-10-15T09:37:30.183' AS DateTime))
INSERT [dbo].[Product_Service_Category] ([Product_Service_Cate_ID], [Product_Service_Cate_Name], [Status], [Position], [Update_By], [Update_Time]) VALUES (N'ProductService_0083', N'Category 8', 0, 1, N'administrator', CAST(N'2021-10-15T09:37:30.187' AS DateTime))
INSERT [dbo].[Product_Service_Category] ([Product_Service_Cate_ID], [Product_Service_Cate_Name], [Status], [Position], [Update_By], [Update_Time]) VALUES (N'ProductService_0084', N'Category 9', 1, 1, N'administrator', CAST(N'2021-10-15T09:37:30.190' AS DateTime))
INSERT [dbo].[Product_Service_Category] ([Product_Service_Cate_ID], [Product_Service_Cate_Name], [Status], [Position], [Update_By], [Update_Time]) VALUES (N'ProductService_0085', N'Category 10', 0, 1, N'administrator', CAST(N'2021-10-15T09:37:30.193' AS DateTime))
INSERT [dbo].[Product_Service_Category] ([Product_Service_Cate_ID], [Product_Service_Cate_Name], [Status], [Position], [Update_By], [Update_Time]) VALUES (N'ProductService_0086', N'Category 11', 1, 1, N'administrator', CAST(N'2021-10-15T09:37:30.197' AS DateTime))
INSERT [dbo].[Product_Service_Category] ([Product_Service_Cate_ID], [Product_Service_Cate_Name], [Status], [Position], [Update_By], [Update_Time]) VALUES (N'ProductService_0087', N'Category 12', 0, 1, N'administrator', CAST(N'2021-10-15T09:37:30.200' AS DateTime))
INSERT [dbo].[Product_Service_Category] ([Product_Service_Cate_ID], [Product_Service_Cate_Name], [Status], [Position], [Update_By], [Update_Time]) VALUES (N'ProductService_0088', N'Category 13', 0, 1, N'administrator', CAST(N'2021-10-15T09:37:30.203' AS DateTime))
INSERT [dbo].[Product_Service_Category] ([Product_Service_Cate_ID], [Product_Service_Cate_Name], [Status], [Position], [Update_By], [Update_Time]) VALUES (N'ProductService_0089', N'Category 14', 0, 1, N'administrator', CAST(N'2021-10-15T09:37:30.207' AS DateTime))
INSERT [dbo].[Product_Service_Category] ([Product_Service_Cate_ID], [Product_Service_Cate_Name], [Status], [Position], [Update_By], [Update_Time]) VALUES (N'ProductService_0090', N'Category 15', 0, 1, N'administrator', CAST(N'2021-10-15T09:37:30.210' AS DateTime))
GO
INSERT [dbo].[Roles] ([role_unique], [role_name], [role_type], [role_note], [role_sequence], [update_by], [update_time]) VALUES (N'sets.NewsList', N'2.1 News', N'News', N'', CAST(2.10 AS Numeric(5, 2)), N'administrator', CAST(N'2020-10-22T11:15:00.000' AS DateTime))
INSERT [dbo].[Roles] ([role_unique], [role_name], [role_type], [role_note], [role_sequence], [update_by], [update_time]) VALUES (N'sets.Product_Service_CategoryList', N'3.1 Products and Services', N'Products', N'', CAST(3.10 AS Numeric(5, 2)), N'administrator', CAST(N'2020-10-22T11:15:00.000' AS DateTime))
INSERT [dbo].[Roles] ([role_unique], [role_name], [role_type], [role_note], [role_sequence], [update_by], [update_time]) VALUES (N'sets.UserList', N'1.1 User List', N'Settings', N'', CAST(1.10 AS Numeric(5, 2)), N'administrator', CAST(N'2020-10-22T11:15:00.000' AS DateTime))
GO
INSERT [dbo].[RoleUser] ([user_account], [role_unique], [create_by], [create_time]) VALUES (N'administrator', N'sets.NewsList', N'administrator', CAST(N'2021-10-09T16:12:40.347' AS DateTime))
INSERT [dbo].[RoleUser] ([user_account], [role_unique], [create_by], [create_time]) VALUES (N'administrator', N'sets.Product_Service_CategoryList', N'administrator', CAST(N'2021-10-09T16:12:40.347' AS DateTime))
INSERT [dbo].[RoleUser] ([user_account], [role_unique], [create_by], [create_time]) VALUES (N'administrator', N'sets.UserList', N'administrator', CAST(N'2021-10-09T16:12:40.347' AS DateTime))
INSERT [dbo].[RoleUser] ([user_account], [role_unique], [create_by], [create_time]) VALUES (N'test1', N'sets.NewsList', N'administrator', CAST(N'2021-09-29T07:51:24.977' AS DateTime))
INSERT [dbo].[RoleUser] ([user_account], [role_unique], [create_by], [create_time]) VALUES (N'test9', N'sets.UserList', N'administrator', CAST(N'2021-08-26T21:28:19.160' AS DateTime))
INSERT [dbo].[RoleUser] ([user_account], [role_unique], [create_by], [create_time]) VALUES (N'testt', N'sets.NewsList', N'administrator', CAST(N'2021-10-05T08:26:16.930' AS DateTime))
INSERT [dbo].[RoleUser] ([user_account], [role_unique], [create_by], [create_time]) VALUES (N'testt', N'sets.UserList', N'administrator', CAST(N'2021-10-05T08:26:16.930' AS DateTime))
INSERT [dbo].[RoleUser] ([user_account], [role_unique], [create_by], [create_time]) VALUES (N'ttt', N'sets.NewsList', N'administrator', CAST(N'2021-10-05T16:01:05.243' AS DateTime))
INSERT [dbo].[RoleUser] ([user_account], [role_unique], [create_by], [create_time]) VALUES (N'ttt', N'sets.UserList', N'administrator', CAST(N'2021-10-05T16:01:05.243' AS DateTime))
GO
INSERT [dbo].[Users] ([User_Account], [Password], [User_Name], [Email], [Phone_Number], [Valid_From], [Valid_To], [Last_Login], [Update_By], [Update_Time], [Image]) VALUES (N'administrator', N'123', N'Ha Phan', N'phanha@gmail.com', N'0974761679', CAST(N'2021-08-23' AS Date), CAST(N'9999-12-31' AS Date), NULL, N'administrator', CAST(N'2021-10-09T16:12:40.377' AS DateTime), N'administrator_a554aa5e-f74b-4376-8640-89a4803e086a.jpg')
INSERT [dbo].[Users] ([User_Account], [Password], [User_Name], [Email], [Phone_Number], [Valid_From], [Valid_To], [Last_Login], [Update_By], [Update_Time], [Image]) VALUES (N'eee', N'eee', N'eee', N'eeee@gmail.com', N'0988888888', CAST(N'2021-10-05' AS Date), CAST(N'9999-12-31' AS Date), CAST(N'2021-10-05T16:01:26.990' AS DateTime), N'administrator', CAST(N'2021-10-05T16:01:26.990' AS DateTime), NULL)
INSERT [dbo].[Users] ([User_Account], [Password], [User_Name], [Email], [Phone_Number], [Valid_From], [Valid_To], [Last_Login], [Update_By], [Update_Time], [Image]) VALUES (N'test', N'test', N'test', N'test@gmail.com', N'0988888888', CAST(N'2021-10-05' AS Date), CAST(N'9999-12-31' AS Date), CAST(N'2021-10-05T08:22:10.100' AS DateTime), N'administrator', CAST(N'2021-10-05T08:22:10.100' AS DateTime), NULL)
INSERT [dbo].[Users] ([User_Account], [Password], [User_Name], [Email], [Phone_Number], [Valid_From], [Valid_To], [Last_Login], [Update_By], [Update_Time], [Image]) VALUES (N'test1', N'123', N'test 1', N'test1', N'0988888888', CAST(N'2021-08-26' AS Date), CAST(N'9999-12-31' AS Date), CAST(N'2021-08-26T14:27:50.237' AS DateTime), N'administrator', CAST(N'2021-09-29T07:51:25.157' AS DateTime), NULL)
INSERT [dbo].[Users] ([User_Account], [Password], [User_Name], [Email], [Phone_Number], [Valid_From], [Valid_To], [Last_Login], [Update_By], [Update_Time], [Image]) VALUES (N'test2', N'test', N'test', N'test@gmail.com', N'0988888888', CAST(N'2021-10-05' AS Date), CAST(N'9999-12-31' AS Date), CAST(N'2021-10-05T08:22:44.377' AS DateTime), N'administrator', CAST(N'2021-10-05T08:22:44.377' AS DateTime), NULL)
INSERT [dbo].[Users] ([User_Account], [Password], [User_Name], [Email], [Phone_Number], [Valid_From], [Valid_To], [Last_Login], [Update_By], [Update_Time], [Image]) VALUES (N'test5', N'123', N'test 5', N'test5', N'0988888888', CAST(N'2021-08-26' AS Date), CAST(N'9999-12-31' AS Date), CAST(N'2021-08-26T14:29:01.097' AS DateTime), N'administrator', CAST(N'2021-08-26T14:29:01.097' AS DateTime), NULL)
INSERT [dbo].[Users] ([User_Account], [Password], [User_Name], [Email], [Phone_Number], [Valid_From], [Valid_To], [Last_Login], [Update_By], [Update_Time], [Image]) VALUES (N'test6', N'123', N'test 6', N'test6', N'0988888888', CAST(N'2021-08-26' AS Date), CAST(N'9999-12-31' AS Date), CAST(N'2021-08-26T14:29:10.693' AS DateTime), N'administrator', CAST(N'2021-08-26T14:29:10.693' AS DateTime), NULL)
INSERT [dbo].[Users] ([User_Account], [Password], [User_Name], [Email], [Phone_Number], [Valid_From], [Valid_To], [Last_Login], [Update_By], [Update_Time], [Image]) VALUES (N'test7', N'123', N'test 7', N'test7', N'0988888888', CAST(N'2021-08-26' AS Date), CAST(N'9999-12-31' AS Date), CAST(N'2021-08-26T14:29:23.787' AS DateTime), N'administrator', CAST(N'2021-08-26T14:29:23.787' AS DateTime), NULL)
INSERT [dbo].[Users] ([User_Account], [Password], [User_Name], [Email], [Phone_Number], [Valid_From], [Valid_To], [Last_Login], [Update_By], [Update_Time], [Image]) VALUES (N'test8', N'123', N'test 8', N'test8', N'0888888888', CAST(N'2021-08-26' AS Date), CAST(N'9999-12-31' AS Date), CAST(N'2021-08-26T14:29:38.783' AS DateTime), N'test9', CAST(N'2021-08-26T21:46:53.007' AS DateTime), NULL)
INSERT [dbo].[Users] ([User_Account], [Password], [User_Name], [Email], [Phone_Number], [Valid_From], [Valid_To], [Last_Login], [Update_By], [Update_Time], [Image]) VALUES (N'test9', N'123', N'test 9', N'test9', N'0977777777', CAST(N'2021-08-26' AS Date), CAST(N'9999-12-31' AS Date), CAST(N'2021-08-26T14:29:50.963' AS DateTime), N'administrator', CAST(N'2021-08-26T21:28:19.240' AS DateTime), N'test9_db6f128e-be24-4a80-a517-7e97aa657510.jpg')
INSERT [dbo].[Users] ([User_Account], [Password], [User_Name], [Email], [Phone_Number], [Valid_From], [Valid_To], [Last_Login], [Update_By], [Update_Time], [Image]) VALUES (N'testt', N'testt', N'testt', N'testt@gmail.com', N'0988888888', CAST(N'2021-10-05' AS Date), CAST(N'9999-12-31' AS Date), CAST(N'2021-10-05T08:25:52.957' AS DateTime), N'administrator', CAST(N'2021-10-05T08:26:16.957' AS DateTime), NULL)
INSERT [dbo].[Users] ([User_Account], [Password], [User_Name], [Email], [Phone_Number], [Valid_From], [Valid_To], [Last_Login], [Update_By], [Update_Time], [Image]) VALUES (N'ttt', N'ttt', N'tttt', N'ttt@gmail.com', N'0988888888', CAST(N'2021-10-05' AS Date), CAST(N'9999-12-31' AS Date), CAST(N'2021-10-05T16:00:46.860' AS DateTime), N'administrator', CAST(N'2021-10-05T16:01:05.270' AS DateTime), NULL)
GO
