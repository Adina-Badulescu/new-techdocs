CREATE PROCEDURE [dbo].[spTemplate_Insert]
	@Title varchar(40) ,
	@Description varchar(100),
	@MainColors varchar(30),
	@ResponsiveColumns int
AS
BEGIN
	INSERT INTO dbo.Templates (Title, [Description], MainColors, ResponsiveColumns)
	VALUES (@Title, @Description, @MainColors, @ResponsiveColumns);
END