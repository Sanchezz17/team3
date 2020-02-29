using System;
using Microsoft.AspNetCore.Mvc;
using thegame.DTO;
using thegame.Game;
using thegame.Repositories;

namespace thegame.Controllers
{
    [Route("api/")]
    public class GameController : Controller
    {
        private readonly IGameRepository gameRepository;
        private readonly IGameFieldGenerator _gameFieldGenerator;

        public GameController(IGameRepository repository, IGameFieldGenerator gameFieldGenerator)
        {
            gameRepository = repository;
            _gameFieldGenerator = gameFieldGenerator;
        }

        [HttpGet("current-game")]
        public IActionResult getCurrentGame()
        {
            if (Guid.TryParse(Request.Cookies["userId"], out var userId))
            {
                var game = gameRepository.FindByUserId(userId);
                if (game == null)
                    return NotFound();
                return Ok(game);
            }

            return NotFound();
        }

        [HttpGet("games/{gameId}")]
        public IActionResult GetGame([FromRoute] Guid gameId)
        {
            if (gameId == Guid.Empty)
                return BadRequest();
            var game = gameRepository.FindById(gameId);
            if (game == null)
                return NotFound();
            return Ok(game);
        }

        [HttpPost("games")]
        [Consumes("application/json")]
        public IActionResult CreateGame([FromBody] CreateGameParametersDTO createGameParametersDto)
        {
            if (createGameParametersDto == null)
                return BadRequest();
            if (!Guid.TryParse(Request.Cookies["userId"], out var userId))
            {
                userId = Guid.NewGuid();
                Response.Cookies.Append("userId", userId.ToString());
            }

            var gameField = _gameFieldGenerator.GenerateField(createGameParametersDto.Difficulty);
            var game = new Game.Game(userId, gameField);
            game = gameRepository.Insert(game);
            return Ok(game);
        }
    }
}