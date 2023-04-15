CREATE TABLE [dbo].[Templates]
(
	[TemplateId] uniqueidentifier NOT NULL  PRIMARY KEY  ,
	[Title] nvarchar(40),
	[Description] nvarchar(100),
	[MainColors] nvarchar(30),
	[ResponsiveColumns] int,
	[ImgPath] nvarchar(50), 
    [EntryDirectory] NVARCHAR(50)

)
