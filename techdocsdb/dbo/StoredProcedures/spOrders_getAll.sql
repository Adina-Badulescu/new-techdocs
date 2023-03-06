CREATE PROCEDURE [dbo].[spOrders_getAll]


AS
BEGIN
	SELECT OrderId, ContactId, TemplateId, AcceptedTC, HostingPremium, HostingRegular, HostingBasic, Maintenance12M, Maintenance6M, Maintenance3M, OTimeStampCreation, OTimeStampLastUpdate
	FROM dbo.Orders;
END
