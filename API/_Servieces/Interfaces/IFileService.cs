using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace API._Servieces.Interfaces
{
    public interface IFileService
    {
        Task<string> UploadFiles (List<IFormFile> files, string name, string filefolder);
        Task<string> UploadFile (IFormFile file, string name, string filefolder);
        void DeleteFileUpload (string files, string fileFolder);
        string CheckTrueFalse(bool param);
    }
}