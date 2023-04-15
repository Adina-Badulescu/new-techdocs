
CREATE PROCEDURE [dbo].[spTemplate_Insert]
	@TemplateId UNIQUEIDENTIFIER,
	@Title NVARCHAR(40) ,
	@Description NVARCHAR(100),
	@MainColors NVARCHAR(30),
	@ResponsiveColumns INT,
	@ImgPath NVARCHAR(50),
	@EntryDirectory NVARCHAR(50)
AS
BEGIN
	INSERT INTO dbo.Templates (TemplateId, Title, [Description], MainColors, ResponsiveColumns, ImgPath, EntryDirectory)
	VALUES (@TemplateId, @Title, @Description, @MainColors, @ResponsiveColumns, @ImgPath, @EntryDirectory);
END