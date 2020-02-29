using System;
using System.Collections.Generic;
using System.Linq;

namespace thegame.Game
{
    public class Game
    {
        public static readonly Dictionary<int, GameParameters> Difficulties = new Dictionary<int, GameParameters>
        {
            [0] = new GameParameters(5, 5, 5)
        };

        private Guid GameId { get; }
        private GameField Field { get; }
        private int Score { get; set; }

        public Game(Guid gameId, GameField field, int score)
        {
            GameId = gameId;
            Field = field;
            Score = score;
        }

        public Game(GameField field)
        {
            Field = field;
            GameId = new Guid();
            Score = 0;
        }

        public void MakeTurn(int color)
        {
            var originalColor = Field[0, 0];
            var queue = new Queue<(int, int)>();
            queue.Enqueue((0, 0));
            var visited = new HashSet<(int, int)>();
            while (queue.Count != 0)
            {
                var (x, y) = queue.Dequeue();
                Field[x, y] = color;
                Score++;
                visited.Add((x, y));
                foreach (var (i, j) in GetNeighbours(x, y))
                {
                    if (Field[i, j] == originalColor && !visited.Contains((i, j)))
                    {
                        queue.Enqueue((i, j));
                    }
                }
            }
        }

        public bool IsGameFinished => Field.Field.All(color => color == Field[0, 0]);

        private IEnumerable<(int, int)> GetNeighbours(int x, int y)
        {
            if (x > 0)
                yield return (x - 1, y);
            if (x < Field.Width - 1)
                yield return (x + 1, y);
            if (y > 0)
                yield return (x, y - 1);
            if (y < Field.Height - 1)
                yield return (x, y + 1);
        }
    }
}