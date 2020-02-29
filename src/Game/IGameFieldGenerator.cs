namespace thegame.Game
{
    public interface IGameFieldGenerator
    {
        GameField GenerateField(int difficulty);
    }
}