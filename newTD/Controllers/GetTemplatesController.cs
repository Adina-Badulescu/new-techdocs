using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Whois;

namespace newTD.Controllers
{
    [ApiController]
    [Route("[controller]")]    
    public class GetTemplatesController : ControllerBase
    {
        private readonly ILogger<GetTemplatesController> _logger;
        public GetTemplatesController(ILogger<GetTemplatesController> logger)
        {
            _logger = logger;
        }

        [HttpGet("list")]
        public async Task<IActionResult> ListTemplates([FromRoute] string list)
        {
            try
            {
                
                return Ok(list);
            }
            catch (Exception ex)
            {
                _logger.LogError("error into Query() " + ex.Message);
                throw;
            }

        }


    }
}
