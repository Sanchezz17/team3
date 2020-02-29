using System;

namespace thegame
{
    public class User
    {
        public Guid UserId { get; }
        public string Name { get; }
        public int HighScore { get; set; }

        public User(Guid userId, string name, int highScore)
        {
            UserId = userId;
            Name = name;
            HighScore = highScore;
        }

        public User(Guid userId)
        {
            UserId = userId;
            Name = null;
            HighScore = 0;
        }
    }
}