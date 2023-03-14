CREATE PROCEDURE [dbo].[spTemplate_getAll]

AS
BEGIN
	SELECT TemplateId, Title, [Description], MainColors, ResponsiveColumns, ImgPath,  (SELECT COUNT(TemplateId) FROM dbo.Templates) as NumberOfTemplates 
	from dbo.Templates
	order BY NumberOfTemplates
END
