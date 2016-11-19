using JobTest.Core.Context;
using JobTest.Core.Model;
using JobTest.Core.Repository;

namespace JobTest.Core.Services
{
    public class UserService : Repository<User>
    {
        public UserService(SqlContext context) : base(context)
        {
        }
    }
}
