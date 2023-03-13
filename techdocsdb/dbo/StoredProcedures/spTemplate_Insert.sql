
CREATE PROCEDURE [dbo].[spTemplate_Insert]
	@Title nvarchar(40) ,
	@Description nvarchar(100),
	@MainColors nvarchar(30),
	@ResponsiveColumns int,
	@ImgPath nvarchar(50)
AS
BEGIN
	INSERT INTO dbo.Templates (Title, [Description], MainColors, ResponsiveColumns, ImgPath)
	VALUES (@Title, @Description, @MainColors, @ResponsiveColumns, @ImgPath);
END