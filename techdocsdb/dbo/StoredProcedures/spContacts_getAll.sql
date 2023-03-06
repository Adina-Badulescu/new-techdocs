CREATE PROCEDURE [dbo].[spContacts_getAll]

AS
BEGIN
	SELECT ContactId, TemplateId, SelectedWebDomain, [Name], Email, Tel, OtherDetails, CTimeStampCreation, CTimeStampLastUpdate
	from dbo.Contacts;
END