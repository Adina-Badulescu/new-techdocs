CREATE PROCEDURE [dbo].[spUser_GetAll]
		
AS
BEGIN
	SELECT UserId, Username, PasswordHash
	FROM dbo.Users	
END