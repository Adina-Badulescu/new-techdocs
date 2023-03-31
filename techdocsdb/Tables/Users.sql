CREATE TABLE [dbo].[Users]
(
	[UserId] UNIQUEIDENTIFIER NOT NULL  PRIMARY KEY DEFAULT NEWID(),
	[PasswordHash] VARBINARY(MAX) NOT NULL,
	[Email] NVARCHAR(30) NOT NULL UNIQUE, 
    [PasswordSalt] VARBINARY(MAX) NOT NULL, 
    [TokenCreated] DATETIME NULL , 
    [RefreshToken] NVARCHAR(256) NULL, 
    [TokenExpires] DATETIME NULL, 
    [IsAdmin] BIT NULL 
)
