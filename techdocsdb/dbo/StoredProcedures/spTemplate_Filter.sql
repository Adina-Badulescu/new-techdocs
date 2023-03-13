CREATE PROCEDURE [dbo].[spTemplate_Filter]
	@searchString nvarchar(100)
	
AS
BEGIN	  
	select TemplateId, Title, [Description], MainColors, ImgPath, ResponsiveColumns, (select count(TemplateId) from dbo.Templates where charindex(@searchString collate Latin1_General_BIN, Title collate Latin1_General_BIN)>0 ) as NumberOfTemplates
	from dbo.Templates
	where charindex(@searchString collate Latin1_General_BIN, Title collate Latin1_General_BIN)>0 
	order by NumberOfTemplates desc
END
	

