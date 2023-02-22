using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using newTD.Entities;
using newTD.Repository;
using Whois;

namespace newTD.Controllers
{
    [ApiController]
    [Route("[controller]")]    
    public class TemplatesController : ControllerBase
    {
        private readonly ILogger<TemplatesController> _logger;
        private readonly ITemplateRepository _templateRepository;
        public TemplatesController(ILogger<TemplatesController> logger, ITemplateRepository templateRepository)
        {
            _logger = logger;
            _templateRepository = templateRepository;
        }

        [HttpGet("List")]
        public async Task<IActionResult> ListTemplates()
        {
            try
            {
                var templates = await _templateRepository.ListTemplates();
                _logger.LogInformation(templates.ToString());
                return Ok(templates);
            }
            catch (Exception ex)
            {
                _logger.LogError("error into Query() " + ex.Message);
                throw;
            }

        }

        [HttpGet("GetId")]
        public async Task<IActionResult> GetTemplate([FromQuery] string Id)
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
