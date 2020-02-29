using System;
using System.Collections.Generic;

namespace thegame.Repositories
{
    public class InMemoryUserRepository : IUserRepository
    {
        private readonly Dictionary<Guid, User> _users;

        public InMemoryUserRepository()
        {
            _users = new Dictionary<Guid, User>();
        }

        public User FindById(Guid userId) => _users.GetValueOrDefault(userId);

        public void Insert(User user) => _users[user.UserId] = user;

        public void Update(User user) => _users[user.UserId] = user;
    }
}