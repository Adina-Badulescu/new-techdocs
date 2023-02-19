using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Runtime.CompilerServices;
using Whois;
using System.Text.Json;


namespace newTD.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class GetDomainController : ControllerBase
    {


        private readonly ILogger<GetDomainController> _logger;
        private readonly WhoisLookup _whois;

        public GetDomainController(ILogger<GetDomainController> logger)
        {
            _logger = logger;
            _whois = new WhoisLookup();
            _whois.Options.TimeoutSeconds= 60;
        }

        [HttpGet("Query")]

        public async Task<IActionResult> Query([FromQuery] string id)   
        {
            try
            {
                var response = await _whois.LookupAsync(id);                
                return Ok(response.Status == WhoisStatus.Found ? false : true);                
            }
            catch (Exception ex)
            {
                _logger.LogError("error into Query() " + ex.Message);
                throw;
            }
            
        }

    }
}