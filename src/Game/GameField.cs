namespace thegame.Game
{
    public class GameField
    {
        public int Width { get; }
        public int Height { get; }
        public int[] Field { get; }

        public GameField(int[] field, int width, int height)
        {
            Field = field;
            Width = width;
            Height = height;
        }

        public int this[int i, int j]
        {
            get => Field[i + Height * j];
            set => Field[i + Height * j] = value;
        }
    }
}