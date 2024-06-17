using AuctionWebAPI.Models.Users;
using AuctionWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionWebAPI.Controllers.Users
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly MyDbContext dbContext;

        public RoleController(MyDbContext context)
        {
            dbContext = context;
        }

       
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleDTO>>> GetRoles()
        {
            if (dbContext.Roles == null)
            {
                return NotFound();
            }

            var roles = await dbContext.Roles
                .Select(role => new RoleDTO
                {
                    RoleId = role.RoleId,
                    RoleName = role.RoleName
                })
                .ToListAsync();

            return Ok(roles);
        }

      
        [HttpGet("{id}")]
        public async Task<ActionResult<RoleDTO>> GetRole(int id)
        {
            if (dbContext.Roles == null)
            {
                return NotFound();
            }

            var role = await dbContext.Roles
                .Select(role => new RoleDTO
                {
                    RoleId = role.RoleId,
                    RoleName = role.RoleName
                })
                .FirstOrDefaultAsync(role => role.RoleId == id);

            if (role == null)
            {
                return NotFound();
            }

            return Ok(role);
        }

     
        [HttpPost]
        public async Task<ActionResult<RoleDTO>> PostRole(RoleDTO roleDto)
        {
            var role = new Role
            {
                RoleName = roleDto.RoleName
            };

            dbContext.Roles.Add(role);
            await dbContext.SaveChangesAsync();

            roleDto.RoleId = role.RoleId;

            return Ok("Role Successfully Created");
        }

     
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRole(int id, RoleDTO roleDto)
        {
            if (id != roleDto.RoleId)
            {
                return BadRequest();
            }

            var role = await dbContext.Roles.FindAsync(id);
            if (role == null)
            {
                return NotFound();
            }

            role.RoleName = roleDto.RoleName;

            dbContext.Entry(role).State = EntityState.Modified;

            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("Role Successfully Updated");
        }

       
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            if (dbContext.Roles == null)
            {
                return NotFound();
            }

            var role = await dbContext.Roles.FindAsync(id);
            if (role == null)
            {
                return NotFound();
            }

            dbContext.Roles.Remove(role);
            await dbContext.SaveChangesAsync();

            var Role_Name = role.RoleName;

            return Ok(new
            {
                Message = $"{Role_Name} successfully deleted"
            });
        }

        private bool RoleExists(int id)
        {
            return dbContext.Roles.Any(e => e.RoleId == id);
        }
    }
}
