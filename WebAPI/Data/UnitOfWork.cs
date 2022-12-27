using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Data.Repo;
using WebAPI.Interfaces;

namespace WebAPI.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        public readonly DataContext dc;
        public UnitOfWork(DataContext dc)
        {
            this.dc = dc;

        }
        public ICityrepository cityrepository => new Cityrepository(dc);

        public IUserRepository userRepository => new UserRepository(dc);

        public IPropertyRepository propertyRepository => new PropertyRepository(dc);

        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync() > 0;
        }
    }
}