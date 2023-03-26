CREATE PROCEDURE [dbo].[spUser_GetAll]
		
AS
BEGIN
	SELECT UserId, Email, PasswordHash
	FROM dbo.Users	
END