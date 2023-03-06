CREATE PROCEDURE [dbo].[spOrders_Insert]
	@ContactId uniqueidentifier ,
	@TemplateId uniqueidentifier,
	@AcceptedTC bit,
	@HostingPremium bit,
	@HostingRegular bit,
	@HostingBasic bit,
	@Maintenance12M bit,
	@Maintenance6M bit,
	@Maintenance3M bit
AS
BEGIN
	INSERT INTO dbo.Orders(ContactId, TemplateId, AcceptedTC, HostingPremium, HostingRegular, HostingBasic, Maintenance12M, Maintenance6M, Maintenance3M)
	VALUES (@ContactId, @TemplateId, @AcceptedTC, @HostingPremium, @HostingRegular, @HostingBasic, @Maintenance12M, @Maintenance6M, @Maintenance3M);
END
