using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using JobTest.Core.Context;
using Microsoft.EntityFrameworkCore;

namespace JobTest.Core.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly DbContext Context;
        protected DbSet<T> DbSet;
        
        public Repository(SqlContext context)
        {
            Context = context;
            DbSet = context.Set<T>();
        }

        public void Add(T entity)
        {
            Context.Set<T>().Add(entity);
            Save();
        }

        public T GetById(Expression<Func<T, bool>> predicate)
        {
            return DbSet.FirstOrDefault(predicate);
        }

        public async Task<List<T>> GetAll()
        {
            return await DbSet.ToListAsync();
        }

        public void Update(T entity)
        {
            Context.Set<T>().Update(entity);
            Save();
        }

        public void Delete(T entity)
        {
            DbSet.Remove(entity);
            Save();
        }

        public void Save()
        {
            Context.SaveChanges();
        }
    }
}
