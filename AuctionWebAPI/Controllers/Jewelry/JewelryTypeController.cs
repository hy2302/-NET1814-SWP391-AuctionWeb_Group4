using AuctionWebAPI.Models;
using AuctionWebAPI.Models.Jewelry;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionWebAPI.Controllers.Jewelry
{
    [Route("api/[controller]")]
    [ApiController]
    public class JewelryTypeController : ControllerBase
    {
        private readonly MyDbContext dbContext;
        
        //add context
        public JewelryTypeController(MyDbContext context)
        {
            dbContext = context;
        }
        //CRUD method for jewelry type
        //get all jewelry type
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JewelryTypeDTO>>> GetJewelryTypes()
        {
            if (dbContext.JewelryTypes == null)
            {
                return NotFound();
            }

            var jewelryTypes = await dbContext.JewelryTypes
                .Select(jt => new JewelryTypeDTO
                {
                    JewelryTypeId = jt.JewelryTypeId,
                    JewelryTypeName = jt.JewelryTypeName
                })
                .ToListAsync();

            if (jewelryTypes == null || !jewelryTypes.Any())
            {
                return NotFound();
            }

            return Ok(jewelryTypes);
        }
        //get id one type of jewelrytype
        [HttpGet("{id}")]
        public async Task<ActionResult<JewelryTypeDTO>> GetJewelryType(int id)
        {
            if (dbContext.JewelryTypes == null)
            {
                return NotFound();
            }

            var jewelryType = await dbContext.JewelryTypes
                .Select(jt => new JewelryTypeDTO
                {
                    JewelryTypeId = jt.JewelryTypeId,
                    JewelryTypeName = jt.JewelryTypeName
                })
                .FirstOrDefaultAsync(jt => jt.JewelryTypeId == id);

            if (jewelryType == null)
            {
                return NotFound();
            }

            return Ok(jewelryType);
        }
        [HttpPost]
        public async Task<ActionResult<JewelryTypeDTO>> PostJewelryType(JewelryTypeDTO jtDto)
        {
            var jt = new JewelryType
            {
                JewelryTypeName = jtDto.JewelryTypeName
            };

            dbContext.JewelryTypes.Add(jt);
            await dbContext.SaveChangesAsync();

            jtDto.JewelryTypeId = jt.JewelryTypeId;

            return Ok("Jewelry Type Successfully Created");
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJewelryType(int id, JewelryTypeDTO jtDto)
        {
            if (id != jtDto.JewelryTypeId)
            {
                return BadRequest();
            }

            var jewelryType = await dbContext.JewelryTypes.FindAsync(id);
            if (jewelryType == null)
            {
                return NotFound();
            }

            jewelryType.JewelryTypeName = jtDto.JewelryTypeName;

            dbContext.Entry(jewelryType).State = EntityState.Modified;

            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JewelryTypeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("Jewelry Type Successfully Updated");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJewelryType(int id)
        {
            var jewelryType = await dbContext.JewelryTypes.FindAsync(id);
            if (jewelryType == null)
            {
                return NotFound();
            }

            var jewelryTypeName = jewelryType.JewelryTypeName;

            dbContext.JewelryTypes.Remove(jewelryType);
            await dbContext.SaveChangesAsync();

            return Ok(new
            {
                Message = $"{jewelryTypeName} successfully deleted"
            });
        }

        private bool JewelryTypeExists(int id)
        {
            return dbContext.JewelryTypes.Any(e => e.JewelryTypeId == id);
        }
       
    }

}
