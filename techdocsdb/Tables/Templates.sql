CREATE TABLE [dbo].[Templates]
(
	[Id] uniqueidentifier NOT NULL  PRIMARY KEY default newid(),
	[Title] nvarchar(40),
	[Description] nvarchar(100),
	[MainColors] nvarchar(30),
	[ResponsiveColumns] int,
	[ImgPath] nvarchar(50)

)
