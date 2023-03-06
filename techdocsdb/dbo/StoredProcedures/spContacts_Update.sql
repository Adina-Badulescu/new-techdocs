CREATE PROCEDURE [dbo].[spContacts_Update]
	@Id UNIQUEIDENTIFIER,
	@TemplateId UNIQUEIDENTIFIER,
	@SelectedWebDomain nvarchar(60),
	@Name nvarchar(40),
	@Email nvarchar(50),
	@Tel nvarchar(18),
	@OtherDetails nvarchar(150),
	@CTimeStampLastUpdate DATETIME
AS
SET @CTimeStampLastUpdate = GETDATE();
BEGIN
	UPDATE dbo.Contacts
	SET TemplateId = @TemplateId,
	SelectedWebDomain = @SelectedWebDomain,
	[Name] = @Name,
	Email = @Email,
	Tel = @Tel,
	OtherDetails = @OtherDetails,
	CTimeStampLastUpdate = @CTimeStampLastUpdate
	WHERE ContactId = @Id;
END

