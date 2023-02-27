using DataAccess.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

using Whois;

namespace newTD.Controllers
{
    [ApiController]
    [Route("[controller]")]    
    public class TemplatesController : ControllerBase
    {
        private readonly ILogger<TemplatesController> _logger;
        private readonly ITemplateData _templateData;
        
        public TemplatesController(ILogger<TemplatesController> logger, ITemplateData templateData)
        {
            _logger = logger;
            _templateData = templateData;


        }

        [HttpGet("List")]
        public async Task<IActionResult> ListTemplates()
        {
            try
            {
                var templates = await _templateData.GetTemplates();
                _logger.LogInformation(templates.ToString());
                var jsonTemplates = JsonSerializer.Serialize(templates);
                return Ok(jsonTemplates);
            }
            catch (Exception ex)
            {
                _logger.LogError("error into Query() " + ex.Message);
                throw;
            }

        }

        [HttpGet("GetId")]
        public async Task<IActionResult> GetTemplate([FromQuery] Guid Id)
        {
            try
            {
                var template = await _templateData.GetTemplate(Id);
                var jsonTemplate = JsonSerializer.Serialize(template);
                return Ok(jsonTemplate);
            }
            catch (Exception ex)
            {
                _logger.LogError("error into Query() " + ex.Message);
                throw;
            }

        }

        [HttpPost("CreateTemplate")]
        public async Task<IActionResult> CreateTemplate([FromBody] TemplateModel template)
        {
            try
            {
                await _templateData.InsertTemplate(template);
                return Ok($"New Template Inserted with: {template}");
            }
            catch (Exception ex)
            {
                _logger.LogError("error into CreateTemplate() " + ex.Message);
                throw;
            }

        }


    }
}
