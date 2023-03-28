CREATE PROCEDURE [dbo].[spUser_Get]
	@Username NVARCHAR(30)	
AS
BEGIN
	SELECT UserId, Username, PasswordHash, PasswordSalt, TokenCreated, RefreshToken, TokenExpires
	FROM dbo.Users
	WHERE Username = @Username;
END
