using newTD.Entities;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using System.Data;

namespace newTD.Context
{
    public class DbContext
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;
        public DbContext(IConfiguration configuration, string connectionString)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString(connectionString);
        }

        public IDbConnection CreateaConection()
            => new SqlConnection(_connectionString);
    }
}
