CREATE PROCEDURE [dbo].[spTemplate_Update]
	@Id UNIQUEIDENTIFIER,
	@Title nvarchar(40),
	@Description nvarchar(100),
	@MainColors nvarchar(30),
	@ResponsiveColumns int
AS
BEGIN
	UPDATE dbo.Templates
	SET Title = @Title, Description = @Description, MainColors = @MainColors, ResponsiveColumns = @ResponsiveColumns
	WHERE TemplateId = @Id;
END
