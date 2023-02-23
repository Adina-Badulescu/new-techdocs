CREATE TABLE [dbo].[Templates]
(
	[Id] uniqueidentifier NOT NULL  PRIMARY KEY default newid(),
	[Title] varchar(40),
	[Description] varchar(100),
	[MainColors] varchar(30),
	[ResponsiveColumns] int

)
