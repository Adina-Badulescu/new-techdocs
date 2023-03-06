CREATE PROCEDURE [dbo].[spContacts_Insert]
	@TemplateId uniqueidentifier ,
	@SelectedWebDomain nvarchar(60),
	@Name nvarchar(40),
	@Email nvarchar(50),
	@Tel nvarchar(18),
	@OtherDetails nvarchar(150)
	
AS
BEGIN
	INSERT INTO dbo.Contacts(TemplateId, SelectedWebDomain, [Name], Email, Tel, OtherDetails)
	VALUES (@TemplateId, @SelectedWebDomain, @Name, @Email, @Tel, @OtherDetails);
END
