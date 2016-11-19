using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobTest.Core.Context;
using JobTest.Core.Model;
using JobTest.Core.Repository;

namespace JobTest.Core.Services
{
    public class CompanyService : Repository<Company>
    {
        public CompanyService(SqlContext context) : base(context)
        {
        }
    }
}
