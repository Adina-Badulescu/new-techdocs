CREATE PROCEDURE [dbo].[spTemplate_Get]
	@Id uniqueidentifier
AS
BEGIN
	SELECT TemplateId, Title, [Description], MainColors, ResponsiveColumns, ImgPath, EntryDirectory
	FROM dbo.Templates
	WHERE TemplateId = @Id;
END
