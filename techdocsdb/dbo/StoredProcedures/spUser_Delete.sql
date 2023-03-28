CREATE PROCEDURE [dbo].[spUser_Delete]
	@Username NVARCHAR(60)
AS
BEGIN
	DELETE  
	FROM dbo.Users
	WHERE Username = @Username;
END
