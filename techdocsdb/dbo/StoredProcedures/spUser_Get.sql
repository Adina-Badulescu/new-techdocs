CREATE PROCEDURE [dbo].[spUser_Get]
	@Email NVARCHAR(60)	
AS
BEGIN
	SELECT UserId, Email, PasswordHash
	FROM dbo.Users
	WHERE Email = @Email;
END
