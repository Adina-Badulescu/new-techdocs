CREATE PROCEDURE [dbo].[spUser_Create]
	@Username NVARCHAR(60),
	@PasswordHash VARBINARY(MAX),
	@PasswordSalt VARBINARY(MAX),
	@RefreshToken NVARCHAR(256),
	@TokenCreated DATETIME,
	@TokenExpires DATETIME
AS
BEGIN
	SET @TokenCreated = GETDATE()
	SET @TokenExpires = DATEADD(DD, 1, GETDATE())
	INSERT INTO dbo.Users(Username, PasswordHash, PasswordSalt, RefreshToken, TokenCreated, TokenExpires)
	VALUES (@Username, @PasswordHash, @PasswordSalt, @RefreshToken, @TokenCreated, @TokenExpires);
END
