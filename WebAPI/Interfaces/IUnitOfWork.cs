using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Interfaces
{
    public interface IUnitOfWork
    {
        ICityrepository cityrepository { get; }
        IUserRepository userRepository { get; }
        IPropertyRepository propertyRepository { get; }
        Task<bool> SaveAsync();
    }
}