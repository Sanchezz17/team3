using System;

namespace thegame.Repositories
{
    public interface IGameRepository
    {
        Game.Game FindById(Guid gameId);
        Game.Game FindByUserId(Guid userId);
        Game.Game Insert(Game.Game game);
        void Update(Game.Game game);
        void Delete(Guid gameId);
    }
}