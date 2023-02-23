CREATE PROCEDURE [dbo].[spTemplates_Get]
	@Id uniqueidentifier
AS
BEGIN
	SELECT Id, Title, [Description], MainColors, ResponsiveColumns 
	FROM dbo.Templates
	WHERE Id = @Id;
END
