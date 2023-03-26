CREATE PROCEDURE [dbo].[spUser_Create]
	@Email NVARCHAR(60),
	@PasswordHash NVARCHAR(MAX)
AS
BEGIN
	INSERT INTO dbo.Users(Email, PasswordHash)
	VALUES (@Email, @PasswordHash);
END
