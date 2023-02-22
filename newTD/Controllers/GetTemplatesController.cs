using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using newTD.Entities;
using Whois;

namespace newTD.Controllers
{
    [ApiController]
    [Route("[controller]")]    
    public class TemplatesController : ControllerBase
    {
        private readonly ILogger<TemplatesController> _logger;
        public TemplatesController(ILogger<TemplatesController> logger)
        {
            _logger = logger;
        }

        [HttpGet("List")]
        public  IActionResult ListTemplates()
        {
            try
            {                             
                return Ok("hello");
            }
            catch (Exception ex)
            {
                _logger.LogError("error into Query() " + ex.Message);
                throw;
            }

        }

        [HttpGet("GetId")]
        public IActionResult GetTemplate([FromQuery] string Id)
        {
            try
            {
                return Ok(Id);
            }
            catch (Exception ex)
            {
                _logger.LogError("error into Query() " + ex.Message);
                throw;
            }

        }


    }
}
