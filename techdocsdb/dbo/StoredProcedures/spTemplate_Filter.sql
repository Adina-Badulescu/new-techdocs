CREATE PROCEDURE [dbo].[spTemplate_Filter]
	@searchString NVARCHAR(100)
	
AS
BEGIN	  
	SELECT TemplateId, Title, [Description], MainColors, ImgPath, ResponsiveColumns, (select COUNT(TemplateId) from dbo.Templates where CHARINDEX(@searchString COLLATE Latin1_General_BIN, Title COLLATE Latin1_General_BIN)>0 ) AS NumberOfTemplates
	FROM dbo.Templates
	WHERE CHARINDEX(@searchString COLLATE Latin1_General_BIN, Title COLLATE Latin1_General_BIN)>0 
	ORDER BY NumberOfTemplates DESC
END
	

