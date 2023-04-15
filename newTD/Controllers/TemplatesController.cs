using DataAccess.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using Tokens;
using Whois;

namespace newTD.Controllers
{
    [ApiController]
    [Route("[controller]")]    
    public class TemplatesController : ControllerBase
    {
        private readonly ILogger<TemplatesController> _logger;
        private readonly ITemplateData _templateData;
        private string _indexPath;
        
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
        [RequestFormLimits(MultipartBodyLengthLimit = 209715200)]
        [RequestSizeLimit(209715200)]
        [Authorize(Policy = "FullAccess")]
        public async Task<IActionResult> CreateTemplate([FromForm] TemplateModel template)
        {

            template.TemplateId = Guid.NewGuid();
            //Console.WriteLine("ff " + files.Count.ToString());
            try
            {                
                var templateDirectoryPath = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\Templates", template.TemplateId.ToString());

                if (!Directory.Exists(templateDirectoryPath))
                {
                    Directory.CreateDirectory(templateDirectoryPath);
                }

                for (int i = 0; i < template.Files?.Count; i++)
                {
                    if (i > 0)
                    {
                        break; 
                    }
                    // get the entry directory and set the value
                    var entryDirectory = template.Files[0].FileName;
                    entryDirectory = entryDirectory.Substring(0, entryDirectory.IndexOf("/"));
                    var indexHtml = "index.html";
                    var indexPath = Path.Combine(templateDirectoryPath, entryDirectory, indexHtml);
                    _logger.LogInformation("indexPath " + indexPath);
                    template.EntryDirectory = entryDirectory;
                }

                foreach (IFormFile file in template.Files)
                {
                    if (file.Length <= 0) continue;
                    //fileName is the the fileName including the relative path
                    string path = Path.Combine(templateDirectoryPath, file.FileName);
                    //check if folder exists, create if not
                    var fi = new FileInfo(path);
                    fi.Directory?.Create();

                    //copy to target
                    using var fileStream = new FileStream(path, FileMode.Create);
                    await file.CopyToAsync(fileStream);
                }
                await _templateData.InsertTemplate(template);
                //return Ok($"New Template Inserted with: {template}");
                return Ok($"New Template Inserted with: {template.TemplateId}");
            }
            catch (Exception ex)
            {
                _logger.LogError("error into Template Controller on CreateTemplate() " + ex.Message);
                throw;
            }

        }

        [HttpPost("UpdateTemplate")]
        [Authorize(Policy = "FullAccess")]
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
        [Authorize(Policy = "FullAccess")]
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
