CREATE TABLE [dbo].[Orders]
(
	[OrderId] uniqueidentifier NOT NULL  PRIMARY KEY default newid(),
	[ContactId] uniqueidentifier foreign key (ContactId) references [dbo].[Contacts](ContactId) NULL,
    [TemplateId] uniqueidentifier foreign key (TemplateId) references [dbo].[Templates](TemplateId) NULL, 
    [AcceptedTC] BIT NULL, 
    [HostingPremium] BIT NULL, 
    [HostingRegular] BIT NULL, 
    [HostingBasic] BIT NULL, 
    [Maintenance12M] BIT NULL, 
    [Maintenance6M] BIT NULL, 
    [Maintenance3M] BIT NULL, 
    [OTimeStampCreation] DATETIME NULL DEFAULT(GETDATE()), 
    [OTimeStampLastUpdate] DATETIME NULL


)
