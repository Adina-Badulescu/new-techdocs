CREATE PROCEDURE [dbo].[spTemplate_Delete]
	@Id uniqueidentifier
AS
BEGIN
	DELETE  
	FROM dbo.Templates
	WHERE Id = @Id;
END
