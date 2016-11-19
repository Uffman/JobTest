using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace JobTest.Web.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values
        [HttpGet]
        [Route("GetVersion")]
        public IEnumerable<string> GetVersion()
        {
            return new string[] { "1.0.0"};
        }

        [Route("Download")]
        [HttpGet]
        public async Task<byte[]> Download(string filePath)
        {
            if (string.IsNullOrEmpty(filePath))
            {
                filePath = "http://photos.motogp.com/2016/04/23/46-valentino-rossi-ita_gp_2506_0.middle.jpg";
            }
            var httpClient = new HttpClient();
            byte[] imageBytes = await httpClient.GetByteArrayAsync(filePath);
            return imageBytes;
        }
    }
}
