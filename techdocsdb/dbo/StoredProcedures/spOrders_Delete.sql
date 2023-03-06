CREATE PROCEDURE [dbo].[spOrders_Delete]
	@Id uniqueidentifier
AS
BEGIN
	DELETE  
	FROM dbo.Orders
	WHERE OrderId = @Id;
END

