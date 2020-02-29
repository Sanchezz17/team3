using System;
using System.Collections.Generic;

namespace thegame.Repositories
{
    public class InMemoryGameRepository : IGameRepository
    {
        private readonly Dictionary<Guid, Game.Game> _games;
        private readonly Dictionary<Guid, Game.Game> _userGames;

        public InMemoryGameRepository()
        {
            _games = new Dictionary<Guid, Game.Game>();
            _userGames = new Dictionary<Guid, Game.Game>();
        }

        public Game.Game FindById(Guid gameId) => _games[gameId];

        public Game.Game FindByUserId(Guid userId) => _userGames[userId];

        public Game.Game Insert(Game.Game game)
        {
            var gameId = new Guid();
            var newGame = new Game.Game(gameId, game.UserId, game.Field, game.Score);
            _games[gameId] = newGame;
            _userGames[game.UserId] = newGame;
            return newGame;
        }

        public void Update(Game.Game game)
        {
            _games[game.GameId] = game;
            _userGames[game.UserId] = game;
        }

        public void Delete(Guid gameId)
        {
            var userId = _games[gameId].UserId;
            _games.Remove(gameId);
            _userGames.Remove(userId);
        }
    }
}