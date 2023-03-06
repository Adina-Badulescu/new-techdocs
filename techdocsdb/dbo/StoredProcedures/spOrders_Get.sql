CREATE PROCEDURE [dbo].[spOrders_Get]
	@Id uniqueidentifier
AS
BEGIN
	SELECT OrderId, ContactId, TemplateId, AcceptedTC, HostingPremium, HostingRegular, HostingBasic, Maintenance12M, Maintenance6M, Maintenance3M, OTimeStampCreation, OTimeStampLastUpdate
	FROM dbo.Orders
	WHERE OrderId = @Id;
END
