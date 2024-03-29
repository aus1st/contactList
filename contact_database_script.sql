USE [master]
GO
/****** Object:  Database [contacts]    Script Date: 12/23/2019 2:35:57 PM ******/
CREATE DATABASE [contacts]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'cotacts', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER_12\MSSQL\DATA\cotacts.mdf' , SIZE = 3072KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'cotacts_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER_12\MSSQL\DATA\cotacts_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [contacts] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [contacts].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [contacts] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [contacts] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [contacts] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [contacts] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [contacts] SET ARITHABORT OFF 
GO
ALTER DATABASE [contacts] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [contacts] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [contacts] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [contacts] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [contacts] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [contacts] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [contacts] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [contacts] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [contacts] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [contacts] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [contacts] SET  DISABLE_BROKER 
GO
ALTER DATABASE [contacts] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [contacts] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [contacts] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [contacts] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [contacts] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [contacts] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [contacts] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [contacts] SET RECOVERY FULL 
GO
ALTER DATABASE [contacts] SET  MULTI_USER 
GO
ALTER DATABASE [contacts] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [contacts] SET DB_CHAINING OFF 
GO
ALTER DATABASE [contacts] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [contacts] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
EXEC sys.sp_db_vardecimal_storage_format N'contacts', N'ON'
GO
USE [contacts]
GO
/****** Object:  Table [dbo].[contact_dtl]    Script Date: 12/23/2019 2:35:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[contact_dtl](
	[cntct_dtl_id] [int] NOT NULL,
	[cntct_mst_id] [int] NULL,
	[cntct_no_typ] [varchar](50) NULL,
	[cntct_no] [varchar](20) NULL,
 CONSTRAINT [PK_contact_dtl] PRIMARY KEY CLUSTERED 
(
	[cntct_dtl_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[contact_mst]    Script Date: 12/23/2019 2:35:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[contact_mst](
	[cntct_mst_id] [int] IDENTITY(1,1) NOT NULL,
	[cntct_nme] [varchar](200) NULL,
	[cntct_ocptn] [varchar](50) NULL,
	[cntct_gndr] [varchar](50) NULL,
	[cntct_addrss_1] [varchar](200) NULL,
	[cntct_addrss_2] [varchar](200) NULL,
	[cntct_city] [varchar](50) NULL,
	[cntct_country] [varchar](50) NULL,
 CONSTRAINT [PK_contact_mst] PRIMARY KEY CLUSTERED 
(
	[cntct_mst_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[contact_social_dtl]    Script Date: 12/23/2019 2:35:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[contact_social_dtl](
	[contact_socl_id] [int] IDENTITY(1,1) NOT NULL,
	[cntct_mst_id] [int] NOT NULL,
	[socl_typ] [varchar](50) NOT NULL,
	[socl_lnk] [varchar](200) NULL,
 CONSTRAINT [PK_contact_social_dtl] PRIMARY KEY CLUSTERED 
(
	[contact_socl_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  View [dbo].[contactMstDtl]    Script Date: 12/23/2019 2:35:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[contactMstDtl] as
select m.cntct_mst_id, m.cntct_nme,m.cntct_city,m.cntct_country, (select top 1 cntct_no from contact_dtl d where m.cntct_mst_id = d.cntct_mst_id) as ContactNo from contact_mst m
GO
ALTER TABLE [dbo].[contact_dtl]  WITH CHECK ADD  CONSTRAINT [FK_contact_dtl_contact_mst1] FOREIGN KEY([cntct_mst_id])
REFERENCES [dbo].[contact_mst] ([cntct_mst_id])
GO
ALTER TABLE [dbo].[contact_dtl] CHECK CONSTRAINT [FK_contact_dtl_contact_mst1]
GO
ALTER TABLE [dbo].[contact_social_dtl]  WITH CHECK ADD  CONSTRAINT [FK_contact_social_dtl_contact_mst] FOREIGN KEY([cntct_mst_id])
REFERENCES [dbo].[contact_mst] ([cntct_mst_id])
GO
ALTER TABLE [dbo].[contact_social_dtl] CHECK CONSTRAINT [FK_contact_social_dtl_contact_mst]
GO
USE [master]
GO
ALTER DATABASE [contacts] SET  READ_WRITE 
GO
