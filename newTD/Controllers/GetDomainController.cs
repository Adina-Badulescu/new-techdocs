using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Runtime.CompilerServices;
using Whois;


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
        }

        [HttpGet("Query")]

        public async Task<IActionResult> Query([FromQuery] string id)   
        {
           

            // Query github.com
            var response = await _whois.LookupAsync("github.com");

            //Console.WriteLine("{0}", result.OrganizationName); // "Google Inc."
            //Console.WriteLine(string.Join(" > ", result.RespondedServers)); // "whois.iana.org > whois.verisign-grs.com > whois.markmonitor.com" 
            return Ok(response.Content);

        }

    }
}