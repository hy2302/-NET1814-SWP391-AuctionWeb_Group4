using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoAPI.Data;
using TodoAPI.Models;

namespace TodoAPI.Controllers
{
    

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;

        public UserController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAllUser()
        {
            var user = await _context.Users.ToListAsync();
            return Ok(user);
        }

        [HttpGet("{get_user}")]
        public async Task<ActionResult<List<User>>> GetUser(int get_user)
        {
            var user = await _context.Users.FindAsync(get_user);
            if (user is null)
                return NotFound("No User Found");

            return Ok(user);
        }

        [HttpPost("{add_user}")]
        public async Task<ActionResult<List<User>>> AddUser(User add_user)
        {
            _context.Users.Add(add_user);
            await _context.SaveChangesAsync();

            return Ok(await _context.Users.ToListAsync());
        }

        [HttpPut("{update_user}")]
        public async Task<ActionResult<List<User>>> UpdateUser(User update_user)
        {
            var dbUser = await _context.Users.FindAsync(update_user.user_id);
            if (dbUser is null)
                return NotFound("User not found.");
            dbUser.user_id = update_user.user_id;
            dbUser.role_id = update_user.role_id;
            dbUser.user_name = update_user.user_name;
            dbUser.password = update_user.password;
            dbUser.user_email = update_user.user_email;
            dbUser.contact_number = update_user.contact_number;
            dbUser.user_address = update_user.user_address;

            await _context.SaveChangesAsync();
            return Ok(await _context.Users.ToListAsync());
        }

        [HttpDelete("{delete_user}")]
        public async Task<ActionResult<List<User>>> DeleteUser(int delete_user)
        {
            var dbUser = await _context.Users.FindAsync(delete_user);
            if (dbUser is null)
                return NotFound("User not found.");
            _context.Users.Remove(dbUser);
            await _context.SaveChangesAsync();
            return Ok(await _context.Users.ToListAsync());
        }
    }
}
