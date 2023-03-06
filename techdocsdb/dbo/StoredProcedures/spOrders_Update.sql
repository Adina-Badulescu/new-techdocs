CREATE PROCEDURE [dbo].[spOrders_Update]
	@Id UNIQUEIDENTIFIER,
	@TemplateId UNIQUEIDENTIFIER,
	@HostingPremium bit,
	@HostingRegular bit,
	@HostingBasic bit,
	@Maintenance12M bit,
	@Maintenance6M bit,
	@Maintenance3M bit,
	@OTimestampLastUpdate datetime
AS
SET @OTimestampLastUpdate = GETDATE();
BEGIN
	UPDATE dbo.Orders
	SET TemplateId = @TemplateId, HostingPremium  = @HostingPremium, HostingRegular = @HostingRegular,
	HostingBasic = @HostingBasic, Maintenance12M = @Maintenance12M, Maintenance6M = @Maintenance6M,
	Maintenance3M = @Maintenance3M, OTimeStampLastUpdate = @OTimestampLastUpdate
	WHERE OrderId = @Id;
END
