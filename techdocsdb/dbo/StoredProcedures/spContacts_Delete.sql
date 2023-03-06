CREATE PROCEDURE [dbo].[spContacts_Delete]
	@Id uniqueidentifier
AS
BEGIN
	DELETE  
	FROM dbo.Contacts
	WHERE ContactId = @Id;
END
