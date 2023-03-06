CREATE PROCEDURE [dbo].[spTemplate_getAll]

AS
BEGIN
	SELECT TemplateId, Title, [Description], MainColors, ResponsiveColumns, ImgPath
	from dbo.Templates;
END
