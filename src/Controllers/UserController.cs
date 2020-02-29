using System;
using Microsoft.AspNetCore.Mvc;
using thegame.DTO;
using thegame.Repositories;

namespace thegame.Controllers
{
    [Route("api/")]
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        
        [HttpGet("leaderborad")]
        public IActionResult GetLeaderBoard()
        {
            var leaderBoard = _userRepository.GetLeaderBoard();
            return Ok(leaderBoard);
        }

        [HttpPost("/users")]
        public IActionResult SaveUser([FromBody] UserDto userDto)
        {
            if (userDto?.Name == null)
                return BadRequest();
            if (Guid.TryParse(Request.Cookies["userId"], out var userId))
            {
                var user = _userRepository.FindById(userId);
                if (user == null)
                {
                    user = new User(userId, userDto.Name, 0);
                    _userRepository.Insert(user);
                }
                else
                {
                    user = new User(userId, userDto.Name, user.HighScore);
                    _userRepository.Update(user);
                }
                return Ok(user);
            }

            return BadRequest();
        }
    }
}