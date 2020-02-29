using System;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using thegame.DTO;
using thegame.Game;
using thegame.Repositories;

namespace thegame.Controllers
{
    [Route("api/")]
    public class GameController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IGameRepository _gameRepository;
        private readonly IGameFieldGenerator _gameFieldGenerator;

        public GameController(IMapper mapper, IGameRepository repository, IGameFieldGenerator gameFieldGenerator)
        {
            _mapper = mapper;
            _gameRepository = repository;
            _gameFieldGenerator = gameFieldGenerator;
        }

        [HttpGet("current-game")]
        public IActionResult getCurrentGame()
        {
            if (Guid.TryParse(Request.Cookies["userId"], out var userId))
            {
                var game = _gameRepository.FindByUserId(userId);
                if (game == null)
                    return NotFound();
                var gameDto = _mapper.Map<GameDto>(game);
                return Ok(gameDto);
            }

            return NotFound();
        }

        [HttpGet("games/{gameId}")]
        public IActionResult GetGame([FromRoute] Guid gameId)
        {
            if (gameId == Guid.Empty)
                return BadRequest();
            var game = _gameRepository.FindById(gameId);
            if (game == null)
                return NotFound();
            var gameDto = _mapper.Map<GameDto>(game);
            return Ok(gameDto);
        }

        [HttpPost("games")]
        [Consumes("application/json")]
        public IActionResult CreateGame([FromBody] CreateGameParametersDTO createGameParametersDto)
        {
            if (createGameParametersDto == null)
                return BadRequest();
            if (Guid.TryParse(Request.Cookies["userId"], out var userId))
            {
                var oldGame = _gameRepository.FindByUserId(userId);
                if (oldGame != null)
                    _gameRepository.Delete(oldGame.GameId);
            }
            else
            {
                userId = Guid.NewGuid();
                Response.Cookies.Append("userId", userId.ToString());
            }

            var gameField = _gameFieldGenerator.GenerateField(createGameParametersDto.Difficulty);
            var game = new Game.Game(userId, gameField);
            game = _gameRepository.Insert(game);
            var gameDto = _mapper.Map<GameDto>(game);
            return Ok(gameDto);
        }

        [HttpPost("games/{gameId}")]
        [Consumes("application/json")]
        public IActionResult MakeMove([FromRoute] Guid gameId, [FromBody] GameMoveDto gameMoveDto)
        {
            if (gameMoveDto == null || gameId == Guid.Empty)
                return BadRequest();
            var game = _gameRepository.FindById(gameId);
            if (game == null)
                return NotFound();
            if (Guid.TryParse(Request.Cookies["userId"], out var userId))
            {
                if (userId == game.UserId)
                {
                    game.MakeTurn(gameMoveDto.Color);
                    _gameRepository.Update(game);
                }
            }

            var gameDto = _mapper.Map<GameDto>(game);
            return Ok(gameDto);
        }
    }
}