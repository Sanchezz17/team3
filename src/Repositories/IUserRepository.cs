using System;
using System.Collections.Generic;

namespace thegame.Repositories
{
    public interface IUserRepository
    {
        User FindById(Guid userId);
        IEnumerable<User> GetLeaderBoard();
        void Insert(User user);
        void Update(User user);
    }
}