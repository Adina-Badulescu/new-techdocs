CREATE PROCEDURE [dbo].[spTemplate_getAll]

AS
BEGIN
	SELECT Id, Title, [Description], MainColors, ResponsiveColumns 
	from dbo.Templates;
END
