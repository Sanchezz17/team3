using System;
using System.Collections.Generic;

namespace thegame.Game
{
    public class RandomGameFieldGenerator : IGameFieldGenerator
    {
        private readonly IReadOnlyDictionary<int, GameParameters> _difficulties;

        public RandomGameFieldGenerator(IReadOnlyDictionary<int, GameParameters> difficulties)
        {
            _difficulties = difficulties;
        }

        public GameField GenerateField(int difficulty)
        {
            var parameters = _difficulties.GetValueOrDefault(difficulty, _difficulties[0]);
            var field = new int[parameters.Width * parameters.Height];
            var random = new Random();
            for (var i = 0; i < field.Length; i++)
                field[i] = random.Next(0, parameters.NumberOfColors);
            return new GameField(field, parameters.Width, parameters.Height);
        }
    }
}