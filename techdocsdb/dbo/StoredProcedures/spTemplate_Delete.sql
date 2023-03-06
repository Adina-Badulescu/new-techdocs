CREATE PROCEDURE [dbo].[spTemplates_Delete]
	@Id uniqueidentifier
AS
BEGIN
	DELETE  
	FROM dbo.Templates
	WHERE TemplateId = @Id;
END
