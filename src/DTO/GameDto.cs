using System;
using thegame.Game;

namespace thegame.DTO
{
    public class GameDto
    {
        public Guid GameId { get; set; }
        public Guid UserId { get; set; }
        public int[] Field { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public int Score { get; set; }
        public bool IsFinished { get; set; }
    }
}