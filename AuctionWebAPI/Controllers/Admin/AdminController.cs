
using AuctionWebAPI.Models;
using AuctionWebAPI.Models.Admin;
using AuctionWebAPI.Models.Users;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly MyDbContext _context;

        public AdminController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/admin/dashboard
        [HttpGet("dashboard")]
        public async Task<ActionResult<object>> GetDashboard()
        {
            var userCount = await _context.Users.CountAsync();
            var jewelryCount = await _context.Jewelries.CountAsync();
            return new { UserCount = userCount, JewelryCount = jewelryCount };
        }

        // GET: api/admin/users
        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/admin/users/5
        [HttpGet("users/{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST: api/admin/users
        [HttpPost("users")]
        public async Task<ActionResult<User>> PostUser(UserA user)
        {
            _context.UserAs.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // PUT: api/admin/users/5
        [HttpPut("users/{id}")]
        public async Task<IActionResult> PutUser(int id, UserA user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/admin/users/5
        [HttpDelete("users/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.UserAs.Any(e => e.Id == id);
        }
    }
}
