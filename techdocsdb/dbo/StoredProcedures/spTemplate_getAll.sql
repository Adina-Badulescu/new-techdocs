CREATE PROCEDURE [dbo].[spTemplate_getAll]
@numberOfResults INT,
@searchString NVARCHAR(100)
AS

BEGIN
IF(LEN(@searchString) > 0) 
	BEGIN
		SELECT TemplateId, Title, [Description], MainColors, ImgPath, ResponsiveColumns, EntryDirectory, (SELECT COUNT(TemplateId) FROM dbo.Templates WHERE CHARINDEX(@searchString COLLATE Latin1_General_BIN, Title COLLATE Latin1_General_BIN)>0 ) AS NumberOfTemplates
		FROM dbo.Templates
		WHERE CHARINDEX(@searchString COLLATE Latin1_General_BIN, Title COLLATE Latin1_General_BIN)>0 
		ORDER BY NumberOfTemplates DESC
	END
ELSE IF(@searchString = '')	
SET @searchString = NULL
	BEGIN	
		SELECT TOP (@numberOfResults) TemplateId, Title, [Description], MainColors, ResponsiveColumns, ImgPath, EntryDirectory, (SELECT COUNT(TemplateId) FROM dbo.Templates) AS NumberOfTemplates	
		FROM dbo.Templates 	
		ORDER BY NumberOfTemplates
	END
END
