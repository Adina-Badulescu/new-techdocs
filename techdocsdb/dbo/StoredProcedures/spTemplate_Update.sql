CREATE PROCEDURE [dbo].[spTemplate_Update]
	@Id UNIQUEIDENTIFIER,
	@Title varchar(40),
	@Description varchar(100),
	@MainColors varchar(30),
	@ResponsiveColumns int
AS
BEGIN
	UPDATE dbo.Templates
	SET Title = @Title, Description = @Description, MainColors = @MainColors, ResponsiveColumns = @ResponsiveColumns
	WHERE Id = @Id;
END
