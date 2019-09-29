using AutoMapper;
using BusinessLayer.Services.Contracts.Files;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Spectromart.Controllers.Files.Contracts;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using FileResult = Spectromart.Controllers.Files.Contracts.FileResult;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Spectromart.Controllers.Files
{
    [Authorize]
    [Route("api/[controller]")]
    public class FilesController : Controller
    {
        public readonly IFilesService _filesService;

        public FilesController(IFilesService filesService)
        {
            _filesService = filesService;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [Route("addFile")]
        public async Task<object> AddFile(AddFileContract contract)
        {
            var file = contract.File;

            if (file.Length > 0)
            {
                var newFileContract = new AddFileServiceContract { EntityId = contract.EntityId, MimeType = file.ContentType, Type = "image", FileId = contract.FileId };

                using (newFileContract.Data = new MemoryStream())
                {
                    await file.CopyToAsync(newFileContract.Data);

                    newFileContract.Data.Seek(0, SeekOrigin.Begin);
                    await _filesService.AddFile(newFileContract);
                }
            }
            return new { Success = "ok" };
        }

        [AllowAnonymous]
        [HttpGet("getFile/{id}")]
        [HttpGet("getFile/{id}/{fileName}")]
        public async Task<FileStreamResult> GetFile(Guid id, string fileName = null)
        {
            var file = await _filesService.GetFile(id);
            return new FileStreamResult(file.Data, new Microsoft.Net.Http.Headers.MediaTypeHeaderValue(file.MimeType))
            {
                FileDownloadName = string.IsNullOrEmpty(fileName) ? id.ToString() : fileName,
            };
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("getFiles")]
        public async Task<List<FileResult>> GetFiles([FromBody]GetFilesContract contract)
        {
            return (await _filesService.GetFiles(new GetFilesServiceContract { EntitiIds = contract.EntityIds, Ids = contract.Ids, Types = contract.Types }))
                .Select(x => new FileResult { EntityId = x.EntityId, Id = x.Id, MimeType = x.MimeType, Type = x.Type }).ToList();
        }

        [HttpPost]
        [Route("deleteFile")]
        public async Task<object> DeleteFile([FromBody]DeleteFileContract contract)
        {
            await _filesService.DeleteFile(new DeleteFileServiceContract { FileId = contract.FileId });

            return new { Success = "ok" };
        }


    }
}
