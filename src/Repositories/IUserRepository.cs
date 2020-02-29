using System;

namespace thegame.Repositories
{
    public interface IUserRepository
    {
        User FindById(Guid userId);
        void Insert(User user);
        void Update(User user);
    }
}