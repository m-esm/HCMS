using HCMS.Data;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using HCMS.Business.Logger;


namespace HCMS.Business
{

    public class GenericRepository<TObject> where TObject : class
    {
        protected DB _context;

        public GenericRepository(bool disableLazyLoading = false, bool ProxyCreation = true)
        {
            _context = new DB();
            if (disableLazyLoading)
                _context.Configuration.LazyLoadingEnabled = false;

            _context.Configuration.ProxyCreationEnabled = ProxyCreation;

        }

        public IQueryable<TObject> GetAll(string[] includes = null)
        {
            if (includes != null && includes.Count() > 0)
            {
                var query = _context.Set<TObject>().Include(includes.First());
                foreach (var include in includes.Skip(1))
                    query = query.Include(include);
                return query.AsQueryable();
            }

            return _context.Set<TObject>().AsQueryable();
        }


        public TObject Find(int id)
        {
            return _context.Set<TObject>().Find(id);
        }

        public async Task<TObject> FindAsync(int id)
        {
           return await _context.Set<TObject>().FindAsync(id);
        }

        public bool Any(Expression<Func<TObject, bool>> match)
        {
            return _context.Set<TObject>().Any(match);
        }

        public TObject Get(Expression<Func<TObject, bool>> match)
        {
            return _context.Set<TObject>().FirstOrDefault(match);
        }



        public IQueryable<TObject> Where(Expression<Func<TObject, bool>> match, string[] includes = null)
        {
            if (includes != null && includes.Count() > 0)
            {
                var query = _context.Set<TObject>().Include(includes.First());
                foreach (var include in includes.Skip(1))
                    query = query.Include(include);

                return query.Where(match).AsQueryable();
            }

            return _context.Set<TObject>().Where(match).AsQueryable();

            //return _context.Set<TObject>().Where(match).ToList();
        }


        public TObject Add(TObject t)
        {
            try
            {
                _context.Set<TObject>().Add(t);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }

            return t;
        }


        public TObject Update(TObject updated, int key)
        {
            if (updated == null)
                return null;

            TObject existing = _context.Set<TObject>().Find(key);
            if (existing != null)
            {
                _context.Entry(existing).CurrentValues.SetValues(updated);
                _context.SaveChanges();
            }

            return existing;
        }

        public async Task<int> UpdateAsync(TObject updated, int key)
        {
            int count = 0;
            if (updated == null)
                return count;

            TObject existing = _context.Set<TObject>().Find(key);
            if (existing != null)
            {
                _context.Entry(existing).CurrentValues.SetValues(updated);
               count = await _context.SaveChangesAsync();
            }

            return count;
        }

        public TObject Update<T>(TObject updated, T key)
        {
            if (updated == null)
                return null;

            TObject existing = _context.Set<TObject>().Find(key);
            if (existing != null)
            {
                _context.Entry(existing).CurrentValues.SetValues(updated);
                _context.SaveChanges();
            }

            return existing;
        }

        public void Remove(TObject t)
        {
    
            _context.Set<TObject>().Remove(t);
            _context.SaveChanges();
        }


        public void BulkRemove(Expression<Func<TObject, bool>> match)
        {
            var EntitesToRemove = _context.Set<TObject>().Where(match);
            _context.Set<TObject>().RemoveRange(EntitesToRemove);
            _context.SaveChanges();
        }


        public int Count()
        {
            return _context.Set<TObject>().Count();
        }

        /// <summary>
        /// hadi jahangiri => for execute sql query
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IQueryable<TObject> SqlQuery(string query)
        {
            return _context.Set<TObject>().SqlQuery(query).AsQueryable();
        }

        /// <summary>
        /// hadi jahangiri => for execute sql query
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public DbRawSqlQuery<T> SqlQuery<T>(string query)
        {
            //return _context.Set<TObject>().SqlQuery(query).AsQueryable();
            return _context.Database.SqlQuery<T>(query);
        }

        public void Dispose()
        {
            _context.Dispose();
        }


    }
}
