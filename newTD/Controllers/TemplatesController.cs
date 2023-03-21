using DataAccess.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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

        [HttpGet("ListTemplates")]
        public async Task<IActionResult> ListTemplates([FromQuery]int numberOfResults, string? searchString)
        {
            try
            {
                IEnumerable<TemplateModel> templates;
                var jsonTemplates = string.Empty;             
            

                templates = await _templateData.GetTemplates(numberOfResults, searchString);
                jsonTemplates = JsonSerializer.Serialize(templates);
                return Ok(jsonTemplates);   
            }
            catch (Exception ex)
            {
                _logger.LogError("error into Template Controller on Query() " + ex.Message);
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
                _logger.LogError("error into Template Controller on Query() " + ex.Message);
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
                _logger.LogError("error into Template Controller on CreateTemplate() " + ex.Message);
                throw;
            }

        }

        [HttpPost("UpdateTemplate")]
        public async Task<IActionResult> UpdateTemplate([FromBody] TemplateModel template)
        {
            try
            {
                await _templateData.UpdateTemplate(template);
                return Ok($"Template Updated with: {template}");
            }
            catch (Exception ex)
            {
                _logger.LogError("error into Template Controller on UpdateTemplate() " + ex.Message);
                throw;
            }

        }

        [HttpDelete("DeleteTemplate")]
        public async Task<IActionResult> DeleteTemplate([FromQuery] Guid Id)
        {
            try
            {
                await _templateData.DeleteTemplate(Id);
                return Ok($"Template with Id={Id}, Deleted");
            }
            catch (Exception ex)
            {
                _logger.LogError("error into Template Controller on DeleteTemplate() " + ex.Message);
                throw;
            }

        }

    }
}
