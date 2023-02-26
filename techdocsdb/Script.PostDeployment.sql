IF NOT EXISTS (SELECT 1 FROM dbo.Templates)

BEGIN	
	INSERT INTO dbo.Templates ([Title], [Description],[MainColors],[ResponsiveColumns])
	VALUES
	('Magazim Imbracaminte', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 'red, yellow, gray', 3)
	,('Spalatorie Auto', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 'blue, white, green', 3)
	,('Restaurant Asiatic', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 'red, yellow, gray', 2)
	,('Clinica Veterinara', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 'red, yellow, gray', 2)
END
