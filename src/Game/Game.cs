using System;
using System.Collections.Generic;
using System.Linq;

namespace thegame.Game
{
    public class Game
    {
        public static readonly Dictionary<int, GameParameters> Difficulties = new Dictionary<int, GameParameters>
        {
            [0] = new GameParameters(5, 5, 5),
            [1] = new GameParameters(8, 8, 8),
            [2] = new GameParameters(12, 12, 12)
        };

        public Guid GameId { get; }
        public Guid UserId { get; }
        public GameField Field { get; }
        public int Score { get; private set; }
        private int numberOfStroke;

        public Game(Guid gameId, Guid userId, GameField field, int score)
        {
            GameId = gameId;
            UserId = userId;
            Field = field;
            Score = score;
            numberOfStroke = 0;
        }

        public Game(Guid userId, GameField field)
        {
            UserId = userId;
            Field = field;
            GameId = Guid.Empty;
            Score = 0;
            numberOfStroke = 0;
        }

        public void MakeTurn(int color)
        {
            numberOfStroke++;
            var numberOfChangedCells = 0;
            
            var originalColor = Field[0, 0];
            var queue = new Queue<(int, int)>();
            queue.Enqueue((0, 0));
            var visited = new HashSet<(int, int)>();
            while (queue.Count != 0)
            {
                var (x, y) = queue.Dequeue();
                Field[x, y] = color;
                numberOfChangedCells++;
                visited.Add((x, y));
                foreach (var (i, j) in GetNeighbours(x, y))
                {
                    if (Field[i, j] == originalColor && !visited.Contains((i, j)))
                    {
                        queue.Enqueue((i, j));
                    }
                }
            }

            Score += numberOfStroke * numberOfChangedCells;
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