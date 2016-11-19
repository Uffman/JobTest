using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobTest.Core.Model;
using JobTest.Core.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace JobTest.Web.Controllers
{
    [Route("api/[controller]")]
    public class CompanyController : Controller
    {
        private readonly IRepository<Company> _repository;

        public CompanyController(IRepository<Company> repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        public async Task<List<Company>> Get()
        {
            return await _repository.GetAll();
        }

        [HttpGet("{id}")]
        [Route("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var company = _repository.GetById(c => c.Id == id);
                if (company == null)
                {
                    return NotFound();
                }
                return new ObjectResult(company);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]Company item)
        {
            try
            {
                if (item == null || !ModelState.IsValid)
                {
                    return BadRequest("Missing data");
                }
                _repository.Add(item);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(item);
        }
        
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody]Company item)
        {
            try
            {
                var companyId = int.Parse(id);
                var company = _repository.GetById(c => c.Id == companyId);
                if (company == null)
                {
                    return NotFound();
                }
                company.Address = item.Address;
                company.Name = item.Name;
                _repository.Update(company);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            try
            {
                var companyId = int.Parse(id);
                var company = _repository.GetById(c => c.Id == companyId);
                if (company == null)
                {
                    return NotFound();
                }
                _repository.Delete(company);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
