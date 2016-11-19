using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace JobTest.Core.Repository
{
    public interface IRepository<T> where T: class
    {
        T GetById(Expression<Func<T, bool>> predicate);
        Task<List<T>> GetAll();
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
        void Save();
    }
}
