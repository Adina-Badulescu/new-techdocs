CREATE TABLE [dbo].[Contacts]
(
	[ContactId] UNIQUEIDENTIFIER NOT NULL  PRIMARY KEY default newid(),
	[TemplateId] UNIQUEIDENTIFIER FOREIGN KEY (TemplateId) REFERENCES [dbo].[Templates](TemplateId) NULL,
	[SelectedWebDomain] nvarchar(60),
	[Name] nvarchar(40),
	[Email] nvarchar(50),
	[Tel] nvarchar(18), 
	[OtherDetails] nvarchar(150),
	[CTimeStampCreation] DATETIME NULL DEFAULT(GETDATE()), 
    [CTimeStampLastUpdate] DATETIME NULL
)
