using AuctionWebAPI.Models;
using AuctionWebAPI.Models.Jewelry;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionWebAPI.Controllers.Jewelry
{
    [Route("api/[controller]")]
    [ApiController]
    public class JewelryController : ControllerBase
    {
        private readonly MyDbContext dbContext;
        private readonly IConfiguration configuration;
        public JewelryController(MyDbContext context)
        {
            dbContext = context;
        }
        //CRUD method for Jewel
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JewelryDTO>>> GetJewels()
        {
            if (dbContext.Jewelries == null)
            {
                return NotFound();
            }

            var jewels = await dbContext.Jewelries
                .Select(j => new JewelryDTO
                {
                    JewelryId = j.JewelryId,
                    OwnerId = j.OwnerId,
                    JewelryTypeId = j.JewelryTypeId,
                    JewelryName = j.JewelryName,
                    JewelryDescription = j.JewelryDescription,
                    JewelryImage = j.JewelryImage,
                    JewelryStatus = j.JewelryStatus
                })
                .ToListAsync();

            return Ok(jewels);
        }

        // GET: api/Jewelry/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JewelryDTO>> GetJewel(int id)
        {
            if (dbContext.Jewelries == null)
            {
                return NotFound();
            }

            var jewel = await dbContext.Jewelries
                .Select(j => new JewelryDTO
                {
                    JewelryId = j.JewelryId,
                    OwnerId = j.OwnerId,
                    JewelryTypeId = j.JewelryTypeId,
                    JewelryName = j.JewelryName,
                    JewelryDescription = j.JewelryDescription,
                    JewelryImage = j.JewelryImage,
                    JewelryStatus = j.JewelryStatus
                })
                .FirstOrDefaultAsync(j => j.JewelryId == id);

            if (jewel == null)
            {
                return NotFound();
            }

            return Ok(jewel);
        }

        // POST: api/Jewelry
        [HttpPost]
        public async Task<ActionResult<JewelryDTO>> PostJewel(JewelryDTO jewelDto)
        {
            var jewel = new Jewel
            {
                OwnerId = jewelDto.OwnerId,
                JewelryTypeId = jewelDto.JewelryTypeId,
                JewelryName = jewelDto.JewelryName,
                JewelryDescription = jewelDto.JewelryDescription,
                JewelryImage = jewelDto.JewelryImage,
                JewelryStatus = jewelDto.JewelryStatus
            };

            dbContext.Jewelries.Add(jewel);
            await dbContext.SaveChangesAsync();

            jewelDto.JewelryId = jewel.JewelryId;

            return Ok("Jewelry Successfully Created");
        }

        // PUT: api/Jewelry/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJewel(int id, JewelryDTO jewelDto)
        {
            if (id != jewelDto.JewelryId)
            {
                return BadRequest();
            }

            var jewel = await dbContext.Jewelries.FindAsync(id);
            if (jewel == null)
            {
                return NotFound();
            }

            jewel.OwnerId = jewelDto.OwnerId;
            jewel.JewelryTypeId = jewelDto.JewelryTypeId;
            jewel.JewelryName = jewelDto.JewelryName;
            jewel.JewelryDescription = jewelDto.JewelryDescription;
            jewel.JewelryImage = jewelDto.JewelryImage;
            jewel.JewelryStatus = jewelDto.JewelryStatus;

            dbContext.Entry(jewel).State = EntityState.Modified;

            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JewelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("Jewelry Successfully Updated");
        }

        // DELETE: api/Jewelry/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJewel(int id)
        {
            if (dbContext.Jewelries == null)
            {
                return NotFound();
            }

            var jewel = await dbContext.Jewelries.FindAsync(id);
            if (jewel == null)
            {
                return NotFound();
            }

            dbContext.Jewelries.Remove(jewel);
            await dbContext.SaveChangesAsync();

            var JewelryName = jewel.JewelryName;
              
           

            return Ok(new
            {
                Message = $"{JewelryName} successfully deleted"
            });
        }

        private bool JewelExists(int id)
        {
            return dbContext.Jewelries.Any(e => e.JewelryId == id);
        }
    }
}
