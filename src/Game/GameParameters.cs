namespace thegame.Game
{
    public class GameParameters
    {
        public int Width { get; }
        public int Height { get; }
        public int NumberOfColors { get; }

        public GameParameters(int width, int height, int numberOfColors)
        {
            Width = width;
            Height = height;
            NumberOfColors = numberOfColors;
        }
    }
}