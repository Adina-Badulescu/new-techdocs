namespace newTD
{
    public class ConnectionStringOptions
    {
        public string ConnectionString { get; set; }
        public SqlConnectionOptions SqlConnectionOptions { get; set; }
    }

    public class SqlConnectionOptions
    {
        public string SqlConnectionString { get; set; }
        public DefaultSqlConnectionOptions DefaultSqlConnectionOptions { get; set; }
    }

    public class DefaultSqlConnectionOptions
    {
        public string DefaultSqlConnectionString { get; set; }
    }
}
