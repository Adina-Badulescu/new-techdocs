CREATE TABLE [dbo].[Orders]
(
	[OrderId] uniqueidentifier NOT NULL  PRIMARY KEY default newid(),
	[ContactId] uniqueidentifier foreign key (ContactId) references [dbo].[Contacts](ContactId) NOT NULL,
    [TemplateId] uniqueidentifier foreign key (TemplateId) references [dbo].[Templates](TemplateId) NOT NULL, 
    [AcceptedTC] BIT NOT NULL, 
    [HostingPremium] BIT NULL, 
    [HostingRegular] BIT NULL, 
    [HostingBasic] BIT NULL, 
    [Maintenance12M] BIT NULL, 
    [Maintenance6M] BIT NULL, 
    [Maintenance3M] BIT NULL, 
    [OTimeStampCreation] DATETIME NOT NULL DEFAULT(GETDATE()), 
    [OTimeStampLastUpdate] DATETIME NULL


)
