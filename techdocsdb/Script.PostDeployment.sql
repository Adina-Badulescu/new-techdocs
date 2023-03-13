IF NOT EXISTS (SELECT 1 FROM dbo.Templates)

BEGIN	
	

	INSERT INTO dbo.Templates ([Title], [Description],[MainColors],[ResponsiveColumns], [ImgPath])
	VALUES
	('Magazim Imbracaminte', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 'red, yellow, gray', 3, './qwerty')
	,('Spalatorie Auto', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 'blue, white, green', 3, './qwerty')
	,('Restaurant Asiatic', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 'red, yellow, gray', 2, './qwerty')
	,('Clinica Veterinara', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 'red, yellow, gray', 2, './qwerty')

	--CREATE FULLTEXT CATALOG TemplateFullText;  

	--CREATE FULLTEXT INDEX ON dbo.Templates  
 --(   
 -- Title  
 --    Language 1033,  
 -- [Description]  
 --    Language 1033      
 --)   
 -- KEY INDEX PK_Title_DESCRIPTION  
 --     ON TemplateFullText;   
	--ALTER FULLTEXT INDEX ON dbo.Templates SET CHANGE_TRACKING AUTO;
END