CREATE PROCEDURE [dbo].[spContacts_Get]
	@Id uniqueidentifier
AS
BEGIN
	SELECT ContactId, TemplateId, SelectedWebDomain, [Name], Email, Tel, OtherDetails, CTimeStampCreation, CTimeStampLastUpdate
	FROM dbo.Contacts
	WHERE ContactId = @Id;
END
