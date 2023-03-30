CREATE PROCEDURE [dbo].[spUser_Create]
	@Email NVARCHAR(30),
	@PasswordHash VARBINARY(MAX),
	@PasswordSalt VARBINARY(MAX),
	@RefreshToken NVARCHAR(256),
	@TokenCreated DATETIME,
	@TokenExpires DATETIME
AS
BEGIN
	SET @TokenCreated = GETDATE()
	SET @TokenExpires = DATEADD(DD, 1, GETDATE())
	INSERT INTO dbo.Users(Email, PasswordHash, PasswordSalt, RefreshToken, TokenCreated, TokenExpires)
	VALUES (@Email, @PasswordHash, @PasswordSalt, @RefreshToken, @TokenCreated, @TokenExpires);
END
