CREATE PROCEDURE [dbo].[spUser_Get]
	@Email NVARCHAR(30)	
AS
BEGIN
	SELECT UserId, Email, PasswordHash, PasswordSalt, TokenCreated, RefreshToken, TokenExpires, IsAdmin
	FROM dbo.Users
	WHERE Email = @Email;
END
