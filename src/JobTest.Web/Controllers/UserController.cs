using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobTest.Core.Model;
using JobTest.Core.Repository;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace JobTest.Web.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IRepository<User> _repository;

        public UserController(IRepository<User> repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        public async Task<List<User>> Get()
        {
            return await _repository.GetAll();
        }

        [HttpGet("{id}")]
        [Route("{id}")]
        public IActionResult Get(string id)
        {
            try
            {
                var userId = int.Parse(id);
                var user = _repository.GetById(c => c.Id == userId);
                if (user == null)
                {
                    return NotFound();
                }
                return new ObjectResult(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]User item)
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
        public IActionResult Put(string id, [FromBody]User item)
        {
            try
            {
                var userId = int.Parse(id);
                var user = _repository.GetById(c => c.Id == userId);
                if (user == null)
                {
                    return NotFound();
                }
                user.LoginName = item.LoginName;
                user.FirstName = item.FirstName;
                user.LastName = item.LastName;

                _repository.Update(item);
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
                var userId = int.Parse(id);
                var user = _repository.GetById(c => c.Id == userId);
                if (user == null)
                {
                    return NotFound();
                }
                _repository.Delete(user);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
