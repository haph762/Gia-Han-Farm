#nullable disable
using System.Net.Http.Headers;
using API._Servieces.Interfaces;

namespace API._Servieces.Services
{
    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        public FileService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        public string CheckTrueFalse(bool param)
        {
            string file = param == true ? _webHostEnvironment.WebRootPath + "\\icons\\ok-512.png"
                                        : _webHostEnvironment.WebRootPath + "\\icons\\circle-outline-512.png";
            return file;
        }

        public void DeleteFileUpload(string files, string fileFolder)
        {
            string[] listResult = files.Split(";");
            string folder = _webHostEnvironment.WebRootPath + fileFolder;
            foreach (var item in listResult)
            {
                if (item != "")
                {
                    string filePath = Path.Combine(folder, item);
                    // if file exists, then delete it
                    if (System.IO.File.Exists(filePath))
                        System.IO.File.Delete(filePath);
                }
            }
        }

        public async Task<string> UploadFile(IFormFile file, string name, string filefolder)
        {
            string fileUpload ="";
            string folder = _webHostEnvironment.WebRootPath +filefolder;
            var filename = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            var randomGuid = Guid.NewGuid().ToString();

            var check =Path.GetExtension(filename);
            var upload = name +randomGuid +check;
            if(!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            string filePatch = Path.Combine(folder, upload);
            using(FileStream fs = System.IO.File.Create(filePatch))
            {
                file.CopyTo(fs);
                fs.Flush();
            }
            fileUpload = upload;
            return await Task.FromResult(fileUpload);
        }

        public async Task<string> UploadFiles(List<IFormFile> files, string name, string filefolder)
        {
            string fileUploads ="";
            if(files != null)
            {
                foreach (var item in files)
                {
                    fileUploads += await UploadFile(item, name, filefolder) +';';
                }
            }
            return await Task.FromResult(fileUploads);
        }
    }
}